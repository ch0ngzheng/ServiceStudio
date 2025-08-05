import os
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv
import pandas as pd
import joblib

# --- Flask App Initialization ---
app = Flask(__name__)
CORS(app)
load_dotenv()

# --- MongoDB Configuration ---
mongo_uri = os.getenv("MONGO_URI")
if not mongo_uri:
    raise ValueError("MONGO_URI not found in environment variables.")
try:
    client = MongoClient(mongo_uri)
    client.admin.command('ismaster')
    db = client.banking
    print("MongoDB connection successful.")
except ConnectionFailure as e:
    print(f"Could not connect to MongoDB: {e}")
    db = None

# --- Load User Cluster Map at Startup ---
try:
    # This assumes 'user_cluster_map.csv' is in the 'models' directory
    user_map_path = os.path.join('models', 'user_cluster_map.csv')
    user_map = pd.read_csv(user_map_path).set_index('user_id')
    print("User cluster map loaded successfully.")
except FileNotFoundError:
    print("ERROR: 'user_cluster_map.csv' not found. The service will not be able to optimize budgets.")
    user_map = None

# --- Routes ---
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok"})

@app.route('/budget/optimize-budget', methods=['POST'])
def optimize_budget():
    data = request.json
    user_id = data.get('user_id')
    total_budget = data.get('total_budget')
    year = data.get('year')
    month = data.get('month')

    if not user_id or total_budget is None:
        return jsonify({"error": "user_id and total_budget are required"}), 400

    if db is None:
        return jsonify({"error": "Database connection is not available."}), 503

    if user_map is None:
        return jsonify({"error": "User-to-cluster mapping is not available. Check service logs."}), 503

    try:
        # 1. Find user's cluster
        cluster_id = user_map.loc[user_id, 'cluster']
        
        # 2. Load the corresponding model artifacts
        model_path = os.path.join('models', 'cluster_models', f'cluster_{cluster_id}_model.pkl')
        artifacts = joblib.load(model_path)
        model = artifacts['model']
        feature_names = artifacts['feature_names']
        CATEGORIES = artifacts['categories']

        # 3. Prepare features for prediction
        next_month = (datetime.now().month) % 12 + 1
        features_df = pd.DataFrame([[next_month]], columns=feature_names)

        # 4. Get the model's prediction
        predicted_proportions = model.predict(features_df)[0]

    except KeyError:
        return jsonify({"error": f"User '{user_id}' not found in cluster map."}), 404
    except FileNotFoundError:
        # This error is more specific. It means the user is in the map, but the model file is missing.
        return jsonify({"error": f"Model file not found for cluster {cluster_id}."}), 500
    except Exception as e:
        app.logger.error(f"Prediction error for user {user_id}: {e}")
        return jsonify({"error": f"An error occurred during model prediction."}), 500
    
    # Distribute the total budget according to the model's predicted proportions
    optimized_budget = {cat: round(total_budget * prop, 2) for cat, prop in zip(CATEGORIES, predicted_proportions)}
    
    # Save the optimized budget
    try:
        if year and month:
            target_year, target_month = year, month
        else:
            now = datetime.now()
            target_year = now.year if now.month < 12 else now.year + 1
            target_month = (now.month % 12) + 1
        
        month_key = f"{target_year}-{target_month:02d}"
        set_as_default = data.get('set_as_default', False)

        update_payload = {f'budgets.{month_key}': optimized_budget}
        if set_as_default:
            update_payload['default_budget'] = optimized_budget

        db.users.update_one({'name': user_id}, {'$set': update_payload}, upsert=True)

    except Exception as e:
        app.logger.error(f"Database update failed for user {user_id}: {e}")
        return jsonify({"error": "Failed to save the optimized budget."}), 500
    
    response_data = {
        "message": "Budget optimized and saved successfully!",
        "optimized_budget": optimized_budget
    }
    print(f"[DEBUG] Final JSON response: {response_data}")
    return jsonify(response_data)

if __name__ == '__main__':
    # Use Gunicorn's port configuration for consistency with Docker
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port, debug=True)