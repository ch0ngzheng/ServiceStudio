const express = require('express');
const router = express.Router();
const dbClient = require('../Models/db');

// fetches transactions data of user
router.get('/:user_id', async (req, res) => {
    try {
                const userId = decodeURIComponent(req.params.user_id);
        console.log("Fetching transactions for user:", userId);
        const db = dbClient.getDb();
        const transactions = await db.collection('transactions').find({ user_id: userId }).toArray();

        let banner_to_show = null;

        // BTO Banner Logic: Check for large housing-related payments
        const btoPayment = transactions.some(t => t.amount < -10000 && t.transaction_type === 'Debit Card'); // Assuming large debit is a BTO payment
        if (btoPayment) {   
            banner_to_show = 'InvestmentBannerBTO';
        }

        // Pay Banner Logic: Check for recent large income
        if (!banner_to_show) {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            const recentSalary = transactions.some(t => 
                new Date(t.date) > sevenDaysAgo && t.amount > 2000 && t.transaction_type === 'Transfer'
            );
            if (recentSalary) {
                banner_to_show = 'InvestmentBannerPay';
            }
        }

        // Savings Banner Logic: Check for high savings rate
        if (!banner_to_show) {
            const fiveMonthsAgo = new Date();
            fiveMonthsAgo.setDate(fiveMonthsAgo.getDate() - 150);

            const recentTransactions = transactions.filter(t => new Date(t.date) >= fiveMonthsAgo);
            
            const totalIncome = recentTransactions
                .filter(t => t.transaction_type === 'Transfer' && t.amount > 0)
                .reduce((sum, t) => sum + t.amount, 0);

            const totalExpenses = recentTransactions
                .filter(t => t.transaction_type === 'Debit Card' || t.transaction_type === 'Credit Card')
                .reduce((sum, t) => sum + Math.abs(t.amount), 0);

            if (totalIncome > 0) {
                const savingsRate = (totalIncome - totalExpenses) / totalIncome;
                if (savingsRate > 0.4) {
                    banner_to_show = 'InvestmentBannerSavings';
                }
            }
        }

        res.json({ transactions, banner_to_show });

    } catch (err) {
        console.error("Error fetching transactions:", err);
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
});

router.post('/calculate_spending', async (req, res) => {
    try {
        const { user_id, year, month } = req.body;
        const db = dbClient.getDb();

        // Use provided year/month or default to the current month
        const now = new Date();
        const targetYear = year !== undefined ? year : now.getFullYear();
        const targetMonth = month !== undefined ? month - 1 : now.getMonth(); // month is 1-based in request

        // Define the start and end dates for the query month
        const startDate = new Date(targetYear, targetMonth, 1);
        const endDate = new Date(targetYear, targetMonth + 1, 1);

        // For backward compatibility, we create string versions for the old 'date' field.
        const startMonthStr = String(targetMonth + 1).padStart(2, '0');
        const startDateStr = `${targetYear}-${startMonthStr}-01`;
        const nextMonthDateForStr = new Date(targetYear, targetMonth + 1, 1);
        const endYearStr = nextMonthDateForStr.getFullYear();
        const endMonthStr = String(nextMonthDateForStr.getMonth() + 1).padStart(2, '0');
        const endDateStr = `${endYearStr}-${endMonthStr}-01`;

        // Find transactions matching either the new timestamp (Date) or old date (string) format
        const transactions = await db.collection('transactions').find({
            user_id,
            $or: [
                { timestamp: { $gte: startDate, $lt: endDate } }, // New format
                { date: { $gte: startDateStr, $lt: endDateStr } }      // Old string format
            ]
        }).toArray();

        const spendingBreakdown = {};
        let totalSpent = 0;

        transactions.forEach(t => {
            // Spending transactions are negative, so we check for amount < 0
            if (t.amount < 0) {
                const amount = Math.abs(t.amount);
                const category = t.category || 'Uncategorized';

                if (!spendingBreakdown[category]) {
                    spendingBreakdown[category] = 0;
                }
                spendingBreakdown[category] += amount;
                totalSpent += amount;
            }
        });

        res.json({ success: true, totalSpent, spendingBreakdown });

    } catch (err) {
        console.error("Error calculating spending:", err);
        res.status(500).json({ success: false, error: "Failed to calculate spending" });
    }
});

// calculates the current balance of a user
router.get('/:user_id/balance', async (req, res) => {
    try {
                const userId = decodeURIComponent(req.params.user_id);
        console.log("Fetching balance for user:", userId);
        const db = dbClient.getDb();
        const transactions = await db.collection('transactions').find({ user_id: userId }).toArray();

        const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

        res.json({ balance });

    } catch (err) {
        console.error("Error fetching balance:", err);
        res.status(500).json({ error: "Failed to fetch balance" });
    }
});

// calculates total spending for a specific category for a user
router.get('/:user_id/spending/:category', async (req, res) => {
    try {
        const { user_id, category } = req.params;
        const db = dbClient.getDb();

        const decodedUserId = decodeURIComponent(user_id);
        const decodedCategory = decodeURIComponent(category);

        const result = await db.collection('transactions').aggregate([
            {
                $match: {
                    user_id: decodedUserId,
                    category: decodedCategory,
                    amount: { $lt: 0 } // Only consider spending
                }
            },
            {
                $group: {
                    _id: null, // Group all matched documents into one
                    totalSpending: { $sum: '$amount' }
                }
            }
        ]).toArray();

        // The result is an array, get the first element or 0 if no spending
        const totalSpending = result.length > 0 ? Math.abs(result[0].totalSpending) : 0;

        res.json({ totalSpending });

    } catch (err) {
        console.error("Error fetching category spending:", err);
        res.status(500).json({ error: "Failed to fetch category spending" });
    }
});

module.exports = router;