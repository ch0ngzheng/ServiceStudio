const express = require('express');
const router = express.Router();
const dbClient = require('../Models/db');

router.get('/', async (req, res) => {
    try {
        const db = dbClient.getDb();
        const trans = await db.collection('transaction').find({}).toArray();
        res.json(trans);
    } catch (err) {
        console.error("Error fetching transactions:", err);
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
});

module.exports = router;