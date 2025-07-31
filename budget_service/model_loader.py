import joblib
import pandas as pd
import os

def load_model(path='model.pkl'):
    """Loads the trained Random Forest model and feature names."""
    try:
        # In a real application, this would load a pre-trained model
        # For now, we'll return a placeholder
        # artifacts = joblib.load(path)
        # return artifacts['model'], artifacts['feature_names']
        print("Model loading is a placeholder. Returning mock model.")
        return None, None  # Placeholder
    except FileNotFoundError:
        print(f"Error: Model file not found at {path}")
        return None, None

class ModelManager:
    """Manages loading and accessing the cluster models and user map."""
    def __init__(self, map_path='./models/user_cluster_map.csv', model_dir='./models/cluster_models'):
        self.map_path = map_path
        self.model_dir = model_dir
        self.user_map = None
        self.cluster_models = {}
        self.kmeans_model = None
        self.scaler = None
        self._load_all()

    def _load_all(self):
        """Loads the user map, all cluster models, and the clustering tools from disk."""
        # Load the user-to-cluster map
        try:
            self.user_map = pd.read_csv(self.map_path).set_index('user_id')
            print(f"User-to-cluster map loaded successfully from {self.map_path}.")
        except FileNotFoundError:
            print(f"Warning: User map file not found at '{self.map_path}'. A new one will be created if users are assigned.")
            self.user_map = pd.DataFrame(columns=['cluster']).rename_axis('user_id')

        # Load the K-Means model and scaler for new user assignment
        try:
            self.kmeans_model = joblib.load('./models/kmeans_model.pkl')
            self.scaler = joblib.load('./models/scaler.pkl')
            print("K-Means model and scaler loaded successfully.")
        except FileNotFoundError:
            print(f"Warning: kmeans_model.pkl or scaler.pkl not found. Cannot assign new users to clusters.")

        # Load all cluster models from the specified directory
        if not os.path.isdir(self.model_dir):
            print(f"Warning: Model directory '{self.model_dir}' not found. No cluster models loaded.")
            return

        for filename in os.listdir(self.model_dir):
            if filename.startswith('cluster_') and filename.endswith('.pkl'):
                try:
                    # Correctly extract the number from 'cluster_0_model.pkl'
                    cluster_id_str = filename.split('_')[1]
                    cluster_id = int(cluster_id_str)
                    self.cluster_models[cluster_id] = joblib.load(os.path.join(self.model_dir, filename))
                    print(f"Cluster model {cluster_id} loaded successfully from {self.model_dir}.")
                except (IndexError, ValueError) as e:
                    print(f"Could not parse cluster ID from filename: {filename}. Error: {e}")
                except Exception as e:
                    print(f"Error loading cluster model from {filename}: {e}")

    def get_cluster_model(self, cluster_id):
        """Returns the model for the specified cluster."""
        return self.cluster_models.get(cluster_id)

    def assign_cluster_to_new_user(self, user_id, user_profile):
        """Assigns a new user to a cluster and updates the map."""
        if not self.kmeans_model or not self.scaler:
            print("Cannot assign new user: K-Means model or scaler not loaded.")
            return None

        try:
            # Ensure profile data is in the correct order and format
            profile_features = ['age', 'account_balance', 'average_monthly_spending', 'average_monthly_income']
            profile_df = pd.DataFrame([user_profile])[profile_features].fillna(0)
            
            # Scale the profile and predict the cluster
            scaled_profile = self.scaler.transform(profile_df)
            cluster_id = self.kmeans_model.predict(scaled_profile)[0]
            
            # Update the user map in memory
            self.user_map.loc[user_id] = {'cluster': cluster_id}
            
            # Save the updated map back to the CSV for persistence
            self.user_map.reset_index().to_csv(self.map_path, index=False)
            
            print(f"New user '{user_id}' assigned to cluster {cluster_id} and map has been updated.")
            return cluster_id
        except Exception as e:
            print(f"Error assigning cluster to user '{user_id}': {e}")
            return None

    def get_model_for_user(self, user_id):
        """Retrieves the correct model for a given user based on their cluster."""
        cluster_id = self.user_map.loc[user_id, 'cluster']
        return self.cluster_models.get(cluster_id)

# Instantiate the manager on startup. 
# This single instance will be imported by the Flask app.
model_manager = ModelManager()
