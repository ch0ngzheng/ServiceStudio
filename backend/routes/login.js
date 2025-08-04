const express = require('express');
const axios = require('axios');
const router = express.Router();
const { getDb } = require('../Models/db');

// POST /api/login - Authenticates a user
router.post('/', async (req, res) => {
    try {
        // Get user_id and password from the request body
        const { user_id, password } = req.body;

        // Check if both fields are provided
        if (!user_id || !password) {
            return res.status(400).json({ success: false, message: 'User ID and password are required' });
        }

        const db = getDb();
        const user = await db.collection('users').findOne({ user_id: user_id });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Compare the provided password with the one in the database
        if (user.password === password) {
            let recommendedProducts = []; // Default to an empty array
            try {
                const features = [user.age, user.account_balance, user.average_monthly_spending, user.average_monthly_income, user.average_monthly_flow];
                                                const predictionUrl = `${process.env.PREDICTION_URL}/predict/predict`;
                console.log(`[DEBUG] Calling prediction service at: ${predictionUrl}`)
                const predictionResponse = await axios.post(predictionUrl, { features });
                const predictions = predictionResponse.data;

                // Get user's existing products, defaulting to an empty array if not present
                const userProducts = user.products || [];

                // Find all products with a probability over 0.01 that the user doesn't already have
                for (const [product, probability] of Object.entries(predictions)) {
                    if (probability > 0.01 && !userProducts.includes(product)) {
                        recommendedProducts.push(product);
                    }
                }
                
                console.log(`Recommended products for user ${user_id}: ${recommendedProducts.join(', ')}`);

            } catch (predictionError) {
                console.error('Error calling prediction service or processing recommendations:', predictionError.message);
            }

            // Respond to the client with success and the recommended products
            res.json({ success: true, message: 'Login successful', recommendedProducts });
        } else {
            // Passwords do not match
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
});

module.exports = router;