# Authentication Server

A Node.js/Express server implementing JWT authentication with refresh tokens.

## Features

- User registration and login
- JWT access tokens (15 minutes)
- Refresh tokens (7 days)
- Token rotation on refresh
- Password hashing with bcrypt
- Protected routes
- CORS enabled for React app (supports both CRA and Vite ports)

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Start the server:
```bash
npm run dev  # Development with nodemon
# or
npm start    # Production
```

Server runs on http://localhost:3001

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user (protected)

### Example
- `GET /api/protected` - Protected route example
- `GET /health` - Health check

## Demo User

- Email: `demo@example.com`
- Password: `password`

## Token Flow

1. Login → Receive access token (15min) + refresh token (7d)
2. Use access token for API requests
3. When access token expires → Use refresh token to get new tokens
4. Refresh token is rotated (old one revoked, new one issued)
5. Logout → Refresh token is revoked

## Security Features

- Password hashing with bcrypt
- JWT with expiration
- Token rotation
- Token revocation
- CORS protection
- Input validation