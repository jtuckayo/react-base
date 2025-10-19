const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const authService = require('./auth');
const { 
  authenticateToken, 
  authenticateRefreshToken, 
  errorHandler, 
  requestLogger 
} = require('./middleware');

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(__dirname, 'db.json');

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'], // React app URLs (CRA and Vite)
  credentials: true
}));
app.use(express.json());
app.use(requestLogger);

// Database helpers
const readDB = async () => {
  try {
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { users: [], refreshTokens: [] };
  }
};

const writeDB = async (data) => {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing database:', error);
    throw error;
  }
};

// Auth Routes

// Register new user
app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({
        error: 'Email, password, and name are required',
        code: 'MISSING_FIELDS'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters',
        code: 'PASSWORD_TOO_SHORT'
      });
    }

    const db = await readDB();

    // Check if user already exists
    const existingUser = db.users.find(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists',
        code: 'USER_EXISTS'
      });
    }

    // Create new user
    const hashedPassword = await authService.hashPassword(password);
    const newUser = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      name,
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    await writeDB(db);

    // Generate tokens
    const userResponse = { id: newUser.id, email: newUser.email, name: newUser.name };
    const tokens = authService.generateTokenPair(userResponse);

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
      ...tokens
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      error: 'Registration failed',
      code: 'REGISTRATION_ERROR'
    });
  }
});

// Login user
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
        code: 'MISSING_CREDENTIALS'
      });
    }

    const db = await readDB();
    const user = db.users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS'
      });
    }

    const isValidPassword = await authService.comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // Generate tokens
    const userResponse = { id: user.id, email: user.email, name: user.name };
    const tokens = authService.generateTokenPair(userResponse);

    res.json({
      message: 'Login successful',
      user: userResponse,
      ...tokens
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login failed',
      code: 'LOGIN_ERROR'
    });
  }
});

// Refresh access token
app.post('/auth/refresh', authenticateRefreshToken, async (req, res) => {
  try {
    const { id } = req.refreshTokenData;
    const oldRefreshToken = req.refreshToken;

    const db = await readDB();
    const user = db.users.find(u => u.id === id);

    if (!user) {
      // Revoke the refresh token if user doesn't exist
      authService.revokeRefreshToken(oldRefreshToken);
      return res.status(401).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    // Revoke old refresh token
    authService.revokeRefreshToken(oldRefreshToken);

    // Generate new token pair
    const userResponse = { id: user.id, email: user.email, name: user.name };
    const tokens = authService.generateTokenPair(userResponse);

    res.json({
      message: 'Tokens refreshed successfully',
      ...tokens
    });

  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      error: 'Token refresh failed',
      code: 'REFRESH_ERROR'
    });
  }
});

// Logout user
app.post('/auth/logout', authenticateRefreshToken, (req, res) => {
  try {
    const refreshToken = req.refreshToken;
    
    // Revoke refresh token
    authService.revokeRefreshToken(refreshToken);

    res.json({
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: 'Logout failed',
      code: 'LOGOUT_ERROR'
    });
  }
});

// Get current user
app.get('/auth/me', authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;
    const db = await readDB();
    const user = db.users.find(u => u.id === id);

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    const userResponse = { id: user.id, email: user.email, name: user.name };
    res.json({ user: userResponse });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: 'Failed to get user',
      code: 'GET_USER_ERROR'
    });
  }
});

// Protected route example
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({
    message: 'This is protected data',
    user: req.user,
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    code: 'NOT_FOUND'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Auth server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Demo user: demo@example.com / password`);
});

module.exports = app;