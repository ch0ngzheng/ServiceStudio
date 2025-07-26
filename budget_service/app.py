from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from model_loader import model, feature_names
from utils import auto_categorize_transaction, CATEGORIES

app = Flask(__name__)
CORS(app)   # Enable CORS for all routes

# In memory storage for user budgets (we will need to extract from db later)
user_budgets = {
    "Ivan Rahman": {
        "Transport": 200,
        "Meals": 400,
        "Shopping": 300,
        "Groceries": 300,
        "Miscellaneous": 100
    }
}
TOTAL_BUDGET = 1300

@app.route('/health', methods=['GET'])
def health_check():
    # health check endpoint
    return jsonify({"status": "ok"})

@app.route('/transactions', methods=['POST'])
def handle_transactions():
    # handles new transaction, checks for overspending, updates budget accordingly
    transaction = request.json
    user_id = transaction['user_id']
    
    if not user_id or user_id not in user_budgets:
        return jsonify({"error": "User not found"}), 404

    # 1. Auto categorize transaction
    category = auto_categorize_transaction(transaction)
    transaction['category'] = category
    amount = transaction.get('amount', 0)

    # 2. Check for overspending
    budget = user_budgets[user_id]
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
        "updated_budget": user_budgets[user_id],
        "notification": notification
    })

@app.route('/optimize-budget', methods=['POST'])
def optimize_budget():
    # Uses ML model to to suggest optimal reallocation
    data = request.json
    user_id = data.get('user_id')
    if not user_id or user_id not in user_budgets:
        return jsonify({"error": "User not found"}), 404
    
    if model:
        # This block will run once a real model is loaded
        transactions = data.get('transactions')
        if not transactions:
            return jsonify({"error": "Transactions not found"}), 400
        
        budget = user_budgets[user_id]
        features = [budget[cat] for cat in CATEGORIES]
        prediction = model.predict([features])[0]
        
        for i, cat in enumerate(CATEGORIES):
            budget[cat] = prediction[i]
        
        return jsonify({
            "message": "Budget optimized",
            "optimized_budget": budget
        })
    else:
        # Placeholder response until the model is available
        return jsonify({
            "message": "Model not yet available. No changes made.",
            "optimized_budget": user_budgets[user_id]
        })

if __name__ == '__main__':
    app.run(port=5001, debug=True)