# LoginApp - JWT Authentication with Refresh Tokens

A complete authentication system demonstrating modern JWT-based authentication with refresh tokens, built with React and Node.js.

## 🚀 Features

### Authentication
- ✅ User registration and login
- ✅ JWT access tokens (15 minutes)
- ✅ Refresh tokens (7 days)
- ✅ Automatic token refresh
- ✅ Token rotation on refresh
- ✅ Secure logout with token revocation

### Security
- ✅ Password hashing with bcrypt
- ✅ Token-based authentication
- ✅ Protected routes
- ✅ CORS protection
- ✅ Input validation
- ✅ Error handling

### User Experience
- ✅ Persistent login sessions
- ✅ Loading states
- ✅ Form validation
- ✅ Error messages
- ✅ Responsive design

## 🏗️ Architecture

### Frontend Structure
```
LoginApp/
├── LoginApp.jsx          # Main component with AuthProvider
├── LoginForm.jsx         # Login form component
├── RegisterForm.jsx      # Registration form component
├── Dashboard.jsx         # Protected dashboard
├── AuthContext.jsx       # React context for auth state
├── api.js               # API service with auto-refresh
├── LoginApp.module.css  # Component styles
└── index.js            # Export file
```

### Backend Structure
```
server/
├── server.js           # Express server with auth routes
├── auth.js            # JWT utilities and token management
├── middleware.js      # Authentication middleware
├── db.json           # Simple JSON database
└── package.json      # Dependencies
```

## 🔧 Setup Instructions

### 1. Start the Backend Server
```bash
cd server
npm install
npm run dev
```
Server runs on `http://localhost:3001`

### 2. Start the React App
```bash
npm run dev
```
React app runs on `http://localhost:3000`

### 3. Test the System
- Use demo credentials: `demo@example.com` / `password`
- Or register a new account
- Test protected data fetching
- Try logging out and back in

## 🔐 Authentication Flow

### Registration/Login
1. User submits credentials
2. Server validates and hashes password (registration)
3. Server generates access token (15min) + refresh token (7d)
4. Tokens stored: access token in memory, refresh token in localStorage
5. User redirected to dashboard

### API Requests
1. Include access token in Authorization header
2. If token expired → Automatically use refresh token
3. Get new token pair (old refresh token revoked)
4. Retry original request with new access token

### Logout
1. Send refresh token to server
2. Server revokes refresh token
3. Clear all tokens from client
4. Redirect to login

## 🛡️ Security Features

### Token Management
- **Access tokens**: Short-lived (15 minutes), stored in memory
- **Refresh tokens**: Long-lived (7 days), stored in localStorage
- **Token rotation**: New refresh token issued on each refresh
- **Revocation**: Refresh tokens can be revoked on logout

### Password Security
- **Hashing**: bcrypt with salt rounds
- **Validation**: Minimum length requirements
- **No plaintext**: Passwords never stored in plain text

### API Security
- **CORS**: Configured for React app origin
- **Validation**: Input validation on all endpoints
- **Error handling**: Consistent error responses
- **Rate limiting**: Can be added for production

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user (protected)

### Example
- `GET /api/protected` - Protected route example
- `GET /health` - Health check

## 🧪 Testing the System

### Manual Testing
1. **Registration**: Create new account
2. **Login**: Sign in with credentials
3. **Protected Data**: Fetch data from protected endpoint
4. **Token Refresh**: Wait 15+ minutes, make request (auto-refresh)
5. **Logout**: Sign out and verify tokens cleared

### Demo User
- Email: `demo@example.com`
- Password: `password`

## 🎯 Learning Objectives

This implementation teaches:

### Frontend Concepts
- React Context for global state
- API service with interceptors
- Automatic token refresh logic
- Form validation and error handling
- Protected route patterns

### Backend Concepts
- JWT token generation and validation
- Refresh token rotation
- Password hashing with bcrypt
- Express middleware patterns
- RESTful API design

### Security Concepts
- Token-based authentication
- Refresh token security
- Password security best practices
- CORS and API protection
- Token storage considerations

## 🔄 Token Lifecycle

```
Login → Access Token (15m) + Refresh Token (7d)
  ↓
API Request with Access Token
  ↓
Token Expired? → Use Refresh Token → New Token Pair
  ↓
Continue with New Access Token
  ↓
Logout → Revoke Refresh Token
```

## 🚀 Production Considerations

For production use, consider:

- **Environment variables** for secrets
- **Redis** for token storage
- **Rate limiting** on auth endpoints
- **HTTPS** for all communications
- **Token blacklisting** for compromised tokens
- **Session management** for better UX
- **Multi-factor authentication**
- **Password reset functionality**

## 🐛 Common Issues

### Server Not Starting
- Check if port 3001 is available
- Install dependencies: `cd server && npm install`

### CORS Errors
- Ensure server is running on port 3001
- Check CORS configuration in server.js

### Token Issues
- Clear localStorage and try again
- Check browser console for errors
- Verify server is running

This authentication system provides a solid foundation for understanding modern web authentication patterns and can be extended for production use cases.