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

router.post('/calculate_spending', async (req, res) => {
    try {
        const { user_id, year, month } = req.body;
        const db = dbClient.getDb();

        // Use provided year/month or default to the current month
        const now = new Date();
        const targetYear = year !== undefined ? year : now.getFullYear();
        const targetMonth = month !== undefined ? month - 1 : now.getMonth(); // month is 1-based in request

        // Format the start date string as YYYY-MM-01
        const startMonthStr = String(targetMonth + 1).padStart(2, '0');
        const startDateStr = `${targetYear}-${startMonthStr}-01`;

        // Calculate the start of the next month for the end date
        const nextMonthDate = new Date(targetYear, targetMonth + 1, 1);
        const endYear = nextMonthDate.getFullYear();
        const endMonthStr = String(nextMonthDate.getMonth() + 1).padStart(2, '0');
        const endDateStr = `${endYear}-${endMonthStr}-01`;

        // Find transactions where the date string is within the desired range
        const transactions = await db.collection('transactions').find({
            user_id,
            date: {
                $gte: startDateStr,
                $lt: endDateStr
            }
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

module.exports = router;