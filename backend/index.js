// const { connect } = require('./Models/db');

// async function main() {
//     const db = await connect();
//     const bookings = db.collection('bookings');

//     const results = await bookings.find({}).toArray();

//     for (let doc of results) {
//         console.log("Name:", doc.name);
//     }

//     process.exit();
// }

// main().catch(err => {
//     console.error("Error:", err);
// });
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const { connect } = require('./Models/db'); 
const loginRouter = require('./routes/login');

app.use(cors());
app.use(express.json());

const predictionRouter = require('./routes/predict');
const transactionsRouter = require('./routes/transactions');

app.use('/api/transactions', transactionsRouter);
app.use('/api/predict', predictionRouter);
app.use('/api/login', loginRouter);

(async () => {
    try {
        await connect(); 
        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
})();