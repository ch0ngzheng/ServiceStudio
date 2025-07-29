from flask import Flask, request, jsonify
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

@app.route('/db-status', methods=['GET'])
def db_status():
    """Checks the status of the MongoDB connection."""
    try:
        # The ismaster command is cheap and does not require auth.
        db.command('ismaster')
        return jsonify({"status": "connected"})
    except Exception as e:
        return jsonify({"status": "disconnected", "error": str(e)}), 500

@app.route('/transactions', methods=['POST'])
def handle_transactions():
    # handles new transaction, checks for overspending, and updates the specific month's budget
    transaction = request.json
    user_id = transaction.get('user_id')
    timestamp_str = transaction.get('timestamp')

    if not user_id or not timestamp_str:
        return jsonify({"error": "user_id and timestamp are required"}), 400

    try:
        # Determine the month and year from the transaction
        trans_date = datetime.fromisoformat(timestamp_str)
        month_key = f"{trans_date.year}-{trans_date.month:02d}"

        # Fetch the user and their budgets
        user = db.users.find_one({'name': user_id})
        if not user:
            return jsonify({"error": "User not found"}), 404

        # Get the specific budget for the transaction's month
        monthly_budget = user.get('budgets', {}).get(month_key)
        if not monthly_budget:
            return jsonify({"error": f"No budget found for {month_key}. Please set a budget first."}), 404

        # 1. Auto-categorize transaction
        category = auto_categorize_transaction(transaction)
        transaction['category'] = category
        amount = transaction.get('amount', 0)

        notification = None
        # 2. Check for overspending only on spending transactions (negative amount)
        if amount < 0:
            monthly_budget[category] = monthly_budget.get(category, 0) - abs(amount)

            if monthly_budget[category] < 0:  # Overspending detected
                overspent_amount = abs(monthly_budget[category])
                notification = f"You've overspent ${overspent_amount:.2f} in {category}. "

                # 3. Redistribute budget
                monthly_budget[category] = 0  # Reset overspent category

                other_categories = [c for c in CATEGORIES if c != category and monthly_budget.get(c, 0) > 0]

                if not other_categories:
                    notification += "No other categories to pull funds from."
                else:
                    amount_to_redistribute = overspent_amount
                    pulled_from = {}
                    other_categories.sort(key=lambda c: monthly_budget[c], reverse=True)

                    for cat_from in other_categories:
                        if amount_to_redistribute <= 0: break
                        pull_amount = min(monthly_budget[cat_from], amount_to_redistribute)
                        monthly_budget[cat_from] -= pull_amount
                        pulled_from[cat_from] = pull_amount
                        amount_to_redistribute -= pull_amount

                    changes_str = ", ".join([f"-${v:.2f} from {k}" for k, v in pulled_from.items()])
                    notification += f"Budget adjusted: {changes_str}"
                    total_pulled = sum(pulled_from.values())
                    notification += f"We've pulled ${total_pulled:.2f} from other categories to cover it."

                # 4. Save the updated monthly budget back to the database
                db.users.update_one(
                    {'name': user_id},
                    {'$set': {f'budgets.{month_key}': monthly_budget}}
                )

        # 5. Insert the transaction into the database
        db.transactions.insert_one(transaction)

        return jsonify({"success": True, "message": "Transaction added.", "notification": notification})

    except Exception as e:
        app.logger.error(f"Error processing transaction for {user_id}: {e}")
        return jsonify({"error": "An internal server error occurred."}), 500

@app.route('/assign-cluster', methods=['POST'])
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

@app.route('/budget/<string:user_id>/<int:year>/<int:month>', methods=['GET'])
def get_budget(user_id, year, month):
    """Retrieves the budget for a specific user and month."""
    try:
        user = db.users.find_one({"name": user_id})
        if not user:
            return jsonify({"success": False, "error": "User not found"}), 404

        month_key = f"{year}-{month:02d}"
        budget = user.get('budgets', {}).get(month_key)

        # If no budget is found for the specific month, try to use the previous month's budget.
        if not budget:
            prev_month = month - 1
            prev_year = year
            if prev_month == 0:
                prev_month = 12
                prev_year = year - 1
            
            prev_month_key = f"{prev_year}-{prev_month:02d}"
            budget = user.get('budgets', {}).get(prev_month_key)

            # If still no budget, provide a default one as a last resort.
            if not budget:
                budget = {
                    "Transport": 200, "Meals": 400, "Shopping": 300,
                    "Miscellaneous": 300, "Groceries": 100
                }

        return jsonify({"success": True, "user_id": user_id, "budget": budget})

    except Exception as e:
        app.logger.error(f"Database error in get_budget for {user_id}: {e}")
        return jsonify({"success": False, "error": "An internal server error occurred."}), 500

@app.route('/optimize-budget', methods=['POST'])
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
        model_artifacts = model_manager.get_model_for_user(user_id)
        if not model_artifacts:
            # This can happen if the user is in the map but the model file is missing
            cluster_id = model_manager.user_map.loc[user_id, 'cluster']
            return jsonify({"error": f"Model for cluster {cluster_id} not found."}), 500
        
        # The actual model is inside the loaded dictionary
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
    
    # Save the optimized budget to the specific month's key
    try:
        if year and month:
            target_year, target_month = year, month
        else:
            now = datetime.now()
            # Default to next month if not provided
            target_year = now.year if now.month < 12 else now.year + 1
            target_month = (now.month % 12) + 1
        
        month_key = f"{target_year}-{target_month:02d}"

        db.users.update_one(
            {'name': user_id},
            {'$set': {f'budgets.{month_key}': optimized_budget}},
            upsert=True
        )
    except Exception as e:
        app.logger.error(f"Database update failed for user {user_id}: {e}")
        return jsonify({"error": "Failed to save the optimized budget."}), 500
    
    return jsonify({
        "message": "Budget optimized and saved successfully!",
        "optimized_budget": optimized_budget
    })

if __name__ == '__main__':
    app.run(port=5001, debug=True)