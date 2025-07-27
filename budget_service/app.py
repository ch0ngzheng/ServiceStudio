from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from model_loader import model_manager
from utils import auto_categorize_transaction, CATEGORIES
from datetime import datetime

app = Flask(__name__)
CORS(app)   # Enable CORS for all routes

@app.route('/health', methods=['GET'])
def health_check():
    # health check endpoint
    return jsonify({"status": "ok"})

@app.route('/transactions', methods=['POST'])
def handle_transactions():
    # handles new transaction, checks for overspending, updates budget accordingly
    transaction = request.json
    user_id = transaction['user_id']
    budget = transaction.get('budget')
    
    if not user_id or not budget:
        return jsonify({"error": "User not found or budget not provided"}), 404

    # 1. Auto categorize transaction
    category = auto_categorize_transaction(transaction)
    transaction['category'] = category
    amount = transaction.get('amount', 0)

    # 2. Check for overspending
    budget[category] -= amount
    
    notification = None
    if budget[category] < 0: # overspending detected
        overspent_amount = abs(budget[category])
        notification = f"You've overspent ${overspent_amount:.2f} in {category}. "

        # 3. Redistribute budget
        budget[category] = 0    # reset overspent category
        
        other_categories = [c for c in CATEGORIES if c != category and budget[c] > 0]

        if not other_categories:
            notification += "No other categories to pull funds from."
        else:
            # Pull from other categories to cover the overspending
            amount_to_redistribute = overspent_amount
            pulled_from = {}

            other_categories.sort(key=lambda c: budget[c], reverse=True)

            for cat_from in other_categories:
                if amount_to_redistribute <= 0:
                    break

                pull_amount = min(budget[cat_from], amount_to_redistribute)
                budget[cat_from] -= pull_amount
                pulled_from[cat_from] = pull_amount
                amount_to_redistribute -= pull_amount

            changes_str = ", ".join([f"-${amount:.2f} from {cat}" for cat, amount in pulled_from.items()])
            notification += f"Budget adjusted: {changes_str}"

    return jsonify({
        "message": "Transaction processed",
        "updated_budget": budget,
        "notification": notification
    })

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

@app.route('/budget/<string:user_id>', methods=['GET'])
def get_budget(user_id):
    """Retrieves the current budget breakdown for a specific user."""
    # This endpoint is now for demonstration only, as budgets are no longer stored here.
    if user_id == "Ivan Rahman":
        return jsonify({
            "user_id": user_id,
            "budget": {
                "Transport": 200,
                "Meals": 400,
                "Shopping": 300,
                "Groceries": 300,
                "Miscellaneous": 100
            }
        })
    else:
        return jsonify({"error": "User not found or budget not provided"}), 404

@app.route('/optimize-budget', methods=['POST'])
def optimize_budget():
    # Uses the user's assigned cluster model to suggest an optimized budget
    data = request.json
    user_id = data.get('user_id')
    current_budget = data.get('budget') # <-- receive budget in the request

    if not user_id or not current_budget:
        return jsonify({"error": "user_id and budget are required"}), 400

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
    
    # Calculate the total budget from the user's current budget
    total_budget = sum(current_budget.values())
    
    # Distribute the total budget according to the model's predicted proportions
    optimized_budget = {cat: round(total_budget * prop, 2) for cat, prop in zip(CATEGORIES, predicted_proportions)}
    
    return jsonify({
        "message": "Budget optimized",
        "optimized_budget": optimized_budget
    })

if __name__ == '__main__':
    app.run(port=5001, debug=True)