from flask import Flask, request, jsonify
from datetime import datetime, timedelta

def parse_iso_date(date_str):
    """Parses an ISO 8601 string, handling the 'Z' suffix for UTC."""
    if date_str and date_str.endswith('Z'):
        return datetime.fromisoformat(date_str[:-1] + '+00:00')
    return datetime.fromisoformat(date_str)

from flask_cors import CORS
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import pandas as pd
import numpy as np
from model_loader import model_manager
from utils import auto_categorize_transaction, CATEGORIES
from datetime import datetime
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)   # Enable CORS for all routes

# Load environment variables from .env file
load_dotenv()

# MongoDB Configuration
mongo_uri = os.getenv("MONGO_URI")
if not mongo_uri:
    raise ValueError("MONGO_URI not found in environment variables.")

try:
    client = MongoClient(mongo_uri)
    # The ismaster command is cheap and does not require auth.
    client.admin.command('ismaster')
    db = client.banking
except ConnectionFailure as e:
    # Use app.logger for consistency if you have logging configured
    print(f"Could not connect to MongoDB: {e}")
    db = None

@app.route('/health', methods=['GET'])
def health_check():
    # health check endpoint
    return jsonify({"status": "ok"})

@app.route('/budget/db-status', methods=['GET'])
def db_status():
    """Checks the status of the MongoDB connection."""
    try:
        # The ismaster command is cheap and does not require auth.
        db.command('ismaster')
        return jsonify({"status": "connected"})
    except Exception as e:
        return jsonify({"status": "disconnected", "error": str(e)}), 500

@app.route('/budget/transactions', methods=['POST'])
def handle_transactions():
    """Handles adding a new transaction."""
    try:
        transaction = request.json
        if not transaction:
            return jsonify({"error": "Invalid JSON"}), 400

        user_id = transaction.get('user_id')
        timestamp_str = transaction.get('timestamp')

        if not user_id or not timestamp_str:
            return jsonify({"error": "user_id and timestamp are required"}), 400

        try:
            trans_date = datetime.fromisoformat(timestamp_str.replace('Z', '+00:00'))
            month_key = f"{trans_date.year}-{trans_date.month:02d}"
        except ValueError:
            return jsonify({"error": "Invalid timestamp format"}), 400

        # Check for user and budget, but don't fail if budget is missing.
        # The get_budget endpoint will provide a default one.
        user = db.users.find_one({"name": user_id})
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Auto-categorize and save the new transaction
        category = auto_categorize_transaction(transaction)
        transaction['category'] = category
        transaction['timestamp'] = trans_date
        db.transactions.insert_one(transaction.copy())

        # The transaction is simply saved. The rebalancing is handled by get_budget.
        notification = f"Transaction of ${abs(transaction.get('amount',0)):.2f} in {category} recorded."

        return jsonify({"success": True, "message": "Transaction added.", "notification": notification})

    except Exception as e:
        app.logger.error(f"Error in handle_transactions: {e}")
        return jsonify({"success": False, "error": "An internal server error occurred."}), 500


@app.route('/budget/assign-cluster', methods=['POST'])
def assign_cluster():
    """
    Assigns a new user to a cluster based on their profile data.
    Expects a JSON payload with user_id and their profile.
    """
    data = request.json
    user_id = data.get('user_id')
    user_profile = data.get('profile')

    if not user_id or not user_profile:
        return jsonify({"error": "user_id and profile are required"}), 400

    # The profile should contain the features our model was trained on
    # e.g., {'age': 25, 'account_balance': 5000, ...}
    cluster_id = model_manager.assign_cluster_to_new_user(user_id, user_profile)

    if cluster_id is not None:
        return jsonify({
            "message": "User successfully assigned to a cluster.",
            "user_id": user_id,
            "assigned_cluster": cluster_id
        })
    else:
        return jsonify({"error": "Failed to assign user to a cluster."}), 500


# this is the endpoint for getting the budget and also does the rebalancing
@app.route('/budget/<string:user_id>/<int:year>/<int:month>', methods=['GET'])
def get_budget(user_id, year, month):
    """Retrieves budget, calculates spending, and returns rebalanced budget for the month."""
    try:
        user = db.users.find_one({"name": user_id})
        if not user:
            return jsonify({"success": False, "error": "User not found"}), 404

        # Calculate the correct month_key for the previous month
        first_day_of_current_month = datetime(year, month, 1)
        last_day_of_previous_month = first_day_of_current_month - timedelta(days=1)
        prev_year = last_day_of_previous_month.year
        prev_month = last_day_of_previous_month.month

        month_key = f"{prev_year}-{prev_month:02d}"
        # Fetch the budget directly from the user's document, where `optimize_budget` saves it.
        user_budgets = user.get('budgets', {})
        monthly_budget_data = user_budgets.get(month_key, {})
        original_budget = monthly_budget_data.get('budget', monthly_budget_data) if isinstance(monthly_budget_data, dict) else None

        # Correctly extract budget and adjustments from the stored data.
        adjustments_log = monthly_budget_data.get('adjustments', []) if isinstance(monthly_budget_data, dict) else []

        if not original_budget:
            # If no specific budget for the month, check for a user-defined default.
            original_budget = user.get('default_budget', {
                "Transport": 200, "Food": 400, "Shopping": 300,
                "Miscellaneous": 300,  "Entertainment": 500
            })

        # 1. Calculate spending from transactions
        start_date = datetime(year, month, 1)
        end_date = datetime(year, month + 1, 1) if month < 12 else datetime(year + 1, 1, 1)
        # Query for transactions using both the new `timestamp` (Date) and old `date` (string) fields
        # to ensure backward compatibility with older transaction records.
        month_str = f"{year}-{month:02d}"
        transactions = db.transactions.find({
            'user_id': user_id,
            '$or': [
                { 'timestamp': {'$gte': start_date, '$lt': end_date} },
                { 'date': {'$regex': f'^{month_str}'} }
            ]
        })

        spending_breakdown = {cat: 0 for cat in CATEGORIES}
        for t in transactions:
            if t['amount'] < 0:
                cat = t.get('category', 'Miscellaneous')
                if cat in spending_breakdown:
                    spending_breakdown[cat] += abs(t['amount'])

        # 2. Calculate remaining budget and perform rebalancing in memory
        rebalanced_budget = original_budget.copy() if isinstance(original_budget, dict) else {}
        spending_complete = False
        adjustments_log = [] # Reset adjustments for this run

        while not spending_complete:
            spending_complete = True
            # Check for overspending based on the *current* rebalanced budget
            for category, spent in spending_breakdown.items():
                if spent > rebalanced_budget.get(category, 0):
                    deficit = spent - rebalanced_budget.get(category, 0)
                    
                    # Find the best category to take funds from (largest available surplus)
                    surplus_funds = {
                        cat: rebalanced_budget.get(cat, 0) - spending_breakdown.get(cat, 0)
                        for cat in rebalanced_budget if cat != category
                    }
                    
                    # Filter for only those with actual surplus
                    candidates = {cat: fund for cat, fund in surplus_funds.items() if fund > 0}
                    
                    if not candidates:
                        # No funds to reallocate, stop trying
                        break

                    # Find the category with the most surplus to donate
                    donor_category = max(candidates, key=candidates.get)
                    
                    # Determine the amount to transfer (deficit rounded up to nearest $10)
                    transfer_amount = (int(deficit / 10) + 1) * 10
                    
                    # Ensure we don't take more than is available
                    transfer_amount = min(transfer_amount, candidates[donor_category])

                    if transfer_amount > 0:
                        log_entry = {
                            "from": donor_category,
                            "to": category,
                            "amount": transfer_amount
                        }
                        adjustments_log.append(log_entry)
                        print(f"Rebalancing: Moving ${transfer_amount} from '{donor_category}' to '{category}'")
                        rebalanced_budget[category] += transfer_amount
                        rebalanced_budget[donor_category] -= transfer_amount

                        # The rebalanced budget and adjustments are now stored in the user document.
                        # We will update it once at the end if changes were made.
                        pass # In-memory change is sufficient for the loop

                        spending_complete = False # Re-run the loop to check again
                        break # Exit inner loop and re-evaluate all categories
            
        # After the loop, if any adjustments were made, save the final state.
        if adjustments_log:
            db.users.update_one(
                {'name': user_id},
                {
                    '$set': {
                        f'budgets.{month_key}.budget': rebalanced_budget,
                        f'budgets.{month_key}.adjustments': adjustments_log
                    }
                },
                upsert=True
            )

        return jsonify({
            "success": True,
            "original_budget": original_budget, # This is now the potentially updated budget
            "spending_breakdown": spending_breakdown,
            "rebalanced_budget": rebalanced_budget, # In this new logic, this is the same as original_budget
            "adjustments": adjustments_log
        })

    except Exception as e:
        app.logger.error(f"Error in get_budget for {user_id}: {e}")
        return jsonify({"success": False, "error": "An internal server error occurred."}), 500

@app.route('/budget/optimize-budget', methods=['POST'])
def optimize_budget():
    # Uses the user's assigned cluster model to suggest an optimized budget
    data = request.json
    user_id = data.get('user_id')
    total_budget = data.get('total_budget')
    year = data.get('year')
    month = data.get('month')

    if not user_id or total_budget is None:
        return jsonify({"error": "user_id and total_budget are required"}), 400

    # Use the new helper method to get the model directly
    try:
        cluster_id = model_manager.user_map.loc[user_id, 'cluster']
        model_artifacts = model_manager.get_model_for_user(user_id)
        if not model_artifacts:
            return jsonify({"error": f"Model for cluster {cluster_id} not found."}), 500
        
        model = model_artifacts['model']

    except KeyError:
        return jsonify({"error": f"User '{user_id}' not found in cluster map. Please assign a cluster first."}), 404
    except TypeError:
        # This handles cases where the loaded artifact isn't a dictionary
        return jsonify({"error": f"Model file for user '{user_id}' appears to be corrupt or in the wrong format."}), 500

    # Prepare features for prediction (using the next month)
    next_month = (datetime.now().month) % 12 + 1
    features = [[next_month]] # model expects a 2D array

    # Get the model's prediction for spending distribution
    predicted_proportions = model.predict(features)[0]
    
    # The total budget is now received directly from the request
    
    # Distribute the total budget according to the model's predicted proportions
    optimized_budget = {cat: round(total_budget * prop, 2) for cat, prop in zip(CATEGORIES, predicted_proportions)}
    
    set_as_default = data.get('set_as_default', False)

    # Save the optimized budget
    try:
        if year and month:
            target_year, target_month = year, month
        else:
            now = datetime.now()
            target_year = now.year if now.month < 12 else now.year + 1
            target_month = (now.month % 12) + 1
        
        month_key = f"{target_year}-{target_month:02d}"

        # Prepare the update operations
        update_payload = {
            f'budgets.{month_key}': optimized_budget
        }
        if set_as_default:
            update_payload['default_budget'] = optimized_budget

        db.users.update_one(
            {'name': user_id},
            {'$set': update_payload},
            upsert=True
        )

    except Exception as e:
        app.logger.error(f"Database update failed for user {user_id}: {e}")
        return jsonify({"error": "Failed to save the optimized budget."}), 500
    
    return jsonify({
        "message": "Budget optimized and saved successfully!",
        "optimized_budget": optimized_budget,
        "cluster_id": int(cluster_id),
        "predicted_proportions": predicted_proportions.tolist()
    })

if __name__ == '__main__':
    app.run(port=5001, debug=True)