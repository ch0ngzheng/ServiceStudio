const express = require('express');
const router = express.Router();
const axios = require('axios');
const dbClient = require('../Models/db');

// The URL for the Python prediction service
const PREDICTION_SERVICE_URL = 'http://127.0.0.1:5000/predict';

router.post('/:user_id', async (req, res) => {
    try {
        // The client should send a user_id in the request body
        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).json({ error: 'Missing user_id in request body' });
        }

        // Get a reference to the database
        const db = dbClient.getDb();
        const user = await db.collection('users').findOne({ user_id: user_id });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Construct the features array in the correct order for the model
        const features = [
            user.age,
            user.account_balance,
            user.average_monthly_spending,
            user.average_monthly_income,
            user.average_monthly_flow
        ];

        // Forward the constructed features to the Python service
        const response = await axios.post(PREDICTION_SERVICE_URL, { features });

        // Return the prediction from the Python service to the client
        res.json(response.data);

    } catch (error) {
        console.error('Error during prediction:', error.message);
        if (error.response) {
            // Error from the Python service
            res.status(error.response.status).json({ error: error.response.data.error || 'Prediction service failed' });
        } else {
            // Other errors (e.g., network, database)
            res.status(500).json({ error: 'An internal server error occurred' });
        }
    }
});

module.exports = router;
