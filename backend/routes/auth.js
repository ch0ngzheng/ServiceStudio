const express = require('express');
const router = express.Router();
const dbClient = require('../Models/db');

router.post('/login', async (req, res) => {
    try {
        // Extract credentials from request body
        const { id, password } = req.body;
        console.log(id);
        console.log(password);
        
        // Basic validation - check if both fields are provided
        if (!id || !password) {
            return res.status(400).json({
                success: false,
                message: "ID and password are required"
            });
        }

        // Get database connection
        const db = dbClient.getDb();
        
        // Look for user in the database
        // This searches for a user where both user_id and password match exactly
        // Try different possible collection names that might exist in your database
        let user = null;
        
        // Try 'users' collection first
        try {
            user = await db.collection('users').findOne({
                user_id: id,
                password: password
            });
        } catch (error) {
            console.log("'users' collection not found, trying alternatives...");
        }
        

        // Check if user was found
        if (user) {
            // Success - user credentials match
            console.log(`Login successful for user: ${id}`);
            res.json({
                success: true,
                message: "Login successful",
                user: {
                    id: user.user_id || user.name,  // Use whichever field exists
                    name: user.name || user.user_id  // Include name if available
                    // Note: We don't return the password for security
                }
            });
        } else {
            // Failure - no matching user found
            console.log(`Login failed for user: ${id}`);
            res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

    } catch (error) {
        // Handle any database or server errors
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

/**
 * GET /api/auth/users
 * Development endpoint to view all users (remove in production)
 */
router.get('/users', async (req, res) => {
    try {
        const db = dbClient.getDb();
        // Get all users but exclude passwords from response
        const users = await db.collection('users').find({}, { 
            projection: { password: 0 } 
        }).toArray();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

module.exports = router;