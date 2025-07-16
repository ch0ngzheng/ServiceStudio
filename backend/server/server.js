const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // For password hashing (install: npm install bcryptjs)
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock user database - In production, this would be a real database
const users = [
  {
    id: 1,
    username: 'john_doe',
    email: 'john@dbs.com',
    // Password is 'password123' hashed
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    role: 'user'
  },
  {
    id: 2,
    username: 'jane_smith',
    email: 'jane@dbs.com',
    // Password is 'admin456' hashed
    password: '$2a$10$8K8mQZZJE4xXV5Yf3tI.J.K3QdT9rY6wP2hT4vM1dF5sX9mN8qP2a',
    role: 'admin'
  },
  {
    id: 3,
    username: 'demo_user',
    email: 'demo@dbs.com',
    // Password is 'demo123' hashed
    password: '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa',
    role: 'user'
  }
];

// Helper function to find user by username or email
const findUser = (identifier) => {
  return users.find(user => 
    user.username === identifier || user.email === identifier
  );
};

// Helper function to validate password
const validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date().toISOString() 
  });
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    console.log(`Login attempt for: ${username}`);

    // Find user in our mock database
    const user = findUser(username);

    if (!user) {
      console.log(`User not found: ${username}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Validate password
    const isPasswordValid = await validatePassword(password, user.password);

    if (!isPasswordValid) {
      console.log(`Invalid password for user: ${username}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    // Successful login
    console.log(`Successful login for user: ${username}`);
    
    // In a real app, you'd generate a JWT token here
    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    res.json({
      success: true,
      message: 'Login successful',
      user: userResponse,
      // In production, include a JWT token
      token: `mock-jwt-token-${user.id}-${Date.now()}`
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user profile endpoint (protected route simulation)
app.get('/api/profile', (req, res) => {
  // In a real app, you'd verify the JWT token here
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  // Mock token verification
  res.json({
    success: true,
    message: 'Profile data retrieved',
    profile: {
      name: 'John Doe',
      accountNumber: '****1234',
      balance: 'S$12,345.67'
    }
  });
});

// Test endpoint for checking valid usernames (for development)
app.get('/api/test-users', (req, res) => {
  const testUsers = users.map(user => ({
    username: user.username,
    email: user.email,
    // Don't send actual passwords in real apps!
    testPassword: user.username === 'john_doe' ? 'password123' : 
                 user.username === 'jane_smith' ? 'admin456' : 'demo123'
  }));
  
  res.json({
    message: 'Test users for development',
    users: testUsers
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👥 Test users: http://localhost:${PORT}/api/test-users`);
});