const express = require('express');
const router = express.Router();
const dbClient = require('../Models/db');

// fetches transactions data of user
router.get('/:user_id', async (req, res) => {
    try {
        console.log("Fetching transactions for user:", req.params.user_id);
        const db = dbClient.getDb();
        const transactions = await db.collection('transactions').find({ user_id: req.params.user_id }).toArray();

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

module.exports = router;