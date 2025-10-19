const authService = require("./auth");

// Middleware to verify access token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      error: "Access token required",
      code: "TOKEN_REQUIRED",
    });
  }

  try {
    const decoded = authService.verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      error: "Invalid or expired access token",
      code: "TOKEN_INVALID",
    });
  }
};

// Middleware to verify refresh token
const authenticateRefreshToken = (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      error: "Refresh token required",
      code: "REFRESH_TOKEN_REQUIRED",
    });
  }

  try {
    const decoded = authService.verifyRefreshToken(refreshToken);
    req.refreshTokenData = decoded;
    req.refreshToken = refreshToken;
    next();
  } catch (error) {
    return res.status(403).json({
      error: "Invalid or expired refresh token",
      code: "REFRESH_TOKEN_INVALID",
    });
  }
};

// Error handling middleware
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  res.status(500).json({
    error: "Internal server error",
    code: "INTERNAL_ERROR",
  });
};

// Request logging middleware
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
};

module.exports = {
  authenticateToken,
  authenticateRefreshToken,
  errorHandler,
  requestLogger,
};
