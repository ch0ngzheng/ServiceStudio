const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Import database connection
const { connect } = require('./Models/db.js'); 

// Import routes
const transRouter = require('./routes/transactions');

// Only import auth routes if the file exists
let authRouter;
try {
    authRouter = require('./routes/auth');
    console.log("✅ Auth routes loaded");
} catch (error) {
    console.log("⚠️  Auth routes not found - continuing without authentication");
    console.log("💡 Create ./routes/auth.js to enable authentication");
}

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Vite dev server
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/transactions', transRouter);

// Only mount auth routes if they exist
if (authRouter) {
    app.use('/api/auth', authRouter);
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        authEnabled: !!authRouter
    });
});

// Start server
(async () => {
    try {
        await connect(); 
        console.log("✅ Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
            console.log(`📊 Available endpoints:`);
            console.log(`   - GET  /api/health`);
            console.log(`   - GET  /api/transactions`);
            
            if (authRouter) {
                console.log(`   - POST /api/auth/login`);
                console.log(`   - GET  /api/auth/users (dev only)`);
            } else {
                console.log(`   ⚠️  Authentication endpoints not available`);
                console.log(`   💡 Create routes/auth.js to enable login functionality`);
            }
        });
    } catch (err) {
        console.error("❌ Failed to connect to MongoDB", err);
        console.error("🔍 Check your .env file and MongoDB connection string");
        process.exit(1);
    }
})();