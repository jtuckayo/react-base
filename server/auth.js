const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// In production, these should be environment variables
const ACCESS_TOKEN_SECRET = 'your-access-token-secret-key-change-in-production';
const REFRESH_TOKEN_SECRET = 'your-refresh-token-secret-key-change-in-production';
const ACCESS_TOKEN_EXPIRY = '15m'; // 15 minutes
const REFRESH_TOKEN_EXPIRY = '7d'; // 7 days

class AuthService {
  constructor() {
    this.refreshTokens = new Set(); // In production, use Redis or database
  }

  // Generate access token
  generateAccessToken(user) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      type: 'access'
    };
    
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { 
      expiresIn: ACCESS_TOKEN_EXPIRY,
      issuer: 'auth-server',
      audience: 'react-app'
    });
  }

  // Generate refresh token
  generateRefreshToken(userId) {
    const payload = {
      id: userId,
      type: 'refresh',
      tokenId: uuidv4() // Unique token ID for revocation
    };
    
    const token = jwt.sign(payload, REFRESH_TOKEN_SECRET, { 
      expiresIn: REFRESH_TOKEN_EXPIRY,
      issuer: 'auth-server',
      audience: 'react-app'
    });

    // Store token for validation (in production, use database)
    this.refreshTokens.add(token);
    
    return token;
  }

  // Verify access token
  verifyAccessToken(token) {
    try {
      const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET, {
        issuer: 'auth-server',
        audience: 'react-app'
      });
      
      if (decoded.type !== 'access') {
        throw new Error('Invalid token type');
      }
      
      return decoded;
    } catch (error) {
      throw new Error('Invalid access token');
    }
  }

  // Verify refresh token
  verifyRefreshToken(token) {
    try {
      // Check if token exists in our store
      if (!this.refreshTokens.has(token)) {
        throw new Error('Refresh token not found');
      }

      const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET, {
        issuer: 'auth-server',
        audience: 'react-app'
      });
      
      if (decoded.type !== 'refresh') {
        throw new Error('Invalid token type');
      }
      
      return decoded;
    } catch (error) {
      // Remove invalid token from store
      this.refreshTokens.delete(token);
      throw new Error('Invalid refresh token');
    }
  }

  // Revoke refresh token
  revokeRefreshToken(token) {
    this.refreshTokens.delete(token);
  }

  // Hash password
  async hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  // Compare password
  async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Generate token pair
  generateTokenPair(user) {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user.id);
    
    return {
      accessToken,
      refreshToken,
      expiresIn: 15 * 60 // 15 minutes in seconds
    };
  }
}

module.exports = new AuthService();