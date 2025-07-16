const express = require('express');
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
            // Passwords match
            res.json({ success: true, message: 'Login successful' });
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