from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Load the trained models and scalers from the artifacts file
# note: the probababilities that are output from the json file are in percentage. ie 0.8 = 0.8%
try:
    artifacts = joblib.load('model.pkl')
    models = artifacts['models']
    scalers = artifacts['scalers']
    print("Models and scalers loaded successfully.")
except FileNotFoundError:
    models, scalers = None, None
    print("Error: artifacts.pkl not found. Please place the file in this directory.")

# This is the prediction function from your notebook
def predict_product_subscriptions(user_features, models, scalers):
    """Predict subscription probabilities for a new user"""
    predictions = {}
    for product, model in models.items():
        # Use the same scaler that was fitted during training
        if product in scalers:
            scaler = scalers[product]
            user_scaled = scaler.transform([user_features])
            # Get probability of subscription (class 1)
            prob = model.predict_proba(user_scaled)[0, 1]
            predictions[product] = prob
    return predictions

@app.route('/predict/', methods=['GET'])
def health_check():
    """A simple health check endpoint to confirm the service is running."""
    # This endpoint can be accessed at http://127.0.0.1:5000/
    return jsonify({"status": "ok"})

@app.route('/predict/predict', methods=['POST'])
def predict():
    print('[DEBUG] Prediction Service: /predict/predict endpoint hit.')
    if models is None or scalers is None:
        print('[DEBUG] Prediction Service: Models or scalers not loaded.')
        return jsonify({'error': 'Models or scalers are not loaded'}), 500

    try:
        data = request.get_json()
        print(f'[DEBUG] Prediction Service: Received data: {data}')
        
        user_features = data['features']
        print(f'[DEBUG] Prediction Service: Extracted features: {user_features}')

        if not isinstance(user_features, list):
            print(f'[DEBUG] Prediction Service: Features are not a list.')
            return jsonify({'error': 'Features must be a list'}), 400

        predictions = predict_product_subscriptions(user_features, models, scalers)
        print(f'[DEBUG] Prediction Service: Generated predictions: {predictions}')
        
        return jsonify(predictions)

    except Exception as e:
        print(f'[DEBUG] Prediction Service: An error occurred: {e}')
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'An error occurred during prediction.'}), 400

if __name__ == '__main__':
    # Runs the Flask app on port 5000
    app.run(port=5000, debug=True)
