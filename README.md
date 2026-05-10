# Secure Auth API

A production-ready authentication and user management API built with Express.js that implements industry-standard security practices including JWT authentication, HTTP-only cookies, rate limiting, CORS protection, and comprehensive security headers.

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?style=flat-square)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-90c53f?style=flat-square)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v5%2B-13aa52?style=flat-square)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)](LICENSE)

## Table of Contents

- [Project Overview](#project-overview)
- [What You Built](#what-you-built)
- [Features](#features)
- [Technologies & Stack](#technologies--stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure & Architecture](#project-structure--architecture)
- [Implementation Details](#implementation-details)
- [API Documentation](#api-documentation)
- [Security Architecture](#security-architecture)
- [Running the Server](#running-the-server)
- [Testing](#testing)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Project Overview

This project is a **complete authentication system** with role-based access control (RBAC) and admin functionality. It demonstrates how to build a secure, scalable REST API from scratch with proper separation of concerns, middleware architecture, and production-grade security implementations.

## What You Built

### Core Functionality

1. **User Authentication System**
   - User registration with email and username validation
   - Secure login with password hashing (bcrypt)
   - JWT-based stateless authentication
   - HTTP-only cookie storage for tokens (XSS protection)

2. **Role-Based Access Control (RBAC)**
   - Two-tier user system: `user` and `admin` roles
   - Automatic admin assignment based on a super admin email
   - Route protection based on user roles
   - Admin middleware validation on protected endpoints

3. **Admin Dashboard/Functionality**
   - Retrieve all users with aggregated data
   - Lookup specific users by username
   - Admin-only endpoints protected by role verification

4. **Security-First Architecture**
   - Implemented multiple layers of security middleware
   - Request rate limiting to prevent brute-force attacks
   - CORS configuration for cross-origin protection
   - Security headers via Helmet middleware
   - CSP (Content Security Policy) to prevent XSS attacks
   - HTTP Strict Transport Security (HSTS) for HTTPS enforcement
   - Input validation and sanitization on all endpoints

### Key Design Decisions

- **Separation of Concerns**: Controllers handle HTTP logic, services handle business logic, models define data structure
- **Middleware-First Approach**: Security and validation implemented as reusable middleware
- **Stateless Authentication**: JWT tokens allow horizontal scaling without session storage
- **Environment Configuration**: All sensitive data and environment-specific settings use `.env` file
- **Error Handling**: Centralized error handling with try-catch blocks and standardized error responses

## Features

### Authentication & Authorization

- ✅ User registration with validation
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcrypt (salt rounds: 10)
- ✅ HTTP-only cookie-based token storage
- ✅ Token verification middleware
- ✅ Role-based access control (RBAC)
- ✅ Admin authentication and authorization
- ✅ Profile retrieval for authenticated users

### Security Features

- ✅ CORS (Cross-Origin Resource Sharing) protection
- ✅ Rate limiting on all routes (configurable)
- ✅ Security headers via Helmet
- ✅ Content Security Policy (CSP)
- ✅ HTTP Strict Transport Security (HSTS)
- ✅ Input validation using express-validator
- ✅ MongoDB data sanitization
- ✅ Secure password comparison
- ✅ No sensitive data in error messages

### Developer Experience

- ✅ Modular, maintainable code structure
- ✅ Environment-based configuration
- ✅ Morgan request logging
- ✅ Compression middleware for response optimization
- ✅ Cookie parser for HTTP-only cookies
- ✅ Test setup with Jest and Supertest
- ✅ Development mode with Nodemon hot-reload

## Technologies & Stack

### Core Framework & Runtime

- **Node.js** v18+ - JavaScript runtime environment
- **Express.js** 5.x - Lightweight web framework

### Database & ODM

- **MongoDB** v5+ - NoSQL document database
- **Mongoose** 9.x - Object Document Mapper for MongoDB

### Authentication & Security

- **jsonwebtoken** (JWT) - Token generation and verification
- **bcrypt** - Password hashing and comparison
- **helmet** - Security header middleware
- **express-rate-limit** - Request rate limiting
- **cors** - Cross-Origin Resource Sharing
- **express-mongo-sanitize** - MongoDB injection prevention
- **express-validator** - Input validation and sanitization

### Middleware & Utilities

- **morgan** - HTTP request logging
- **compression** - Response compression
- **cookie-parser** - HTTP cookie parsing
- **dotenv** - Environment variable management

### Development Tools

- **nodemon** - Auto-reload during development
- **jest** - JavaScript testing framework
- **supertest** - HTTP assertion library for testing

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js v18.0.0 or higher
- npm v9.0.0 or higher
- MongoDB v5.0 or higher (local or cloud instance)
- Git

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/express-auth-api.git
cd express-auth-api
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages as specified in `package.json`:

- Express framework and middleware
- Database drivers (Mongoose)
- Authentication libraries (JWT, bcrypt)
- Security packages (Helmet, rate-limit, CORS)
- Validation libraries (express-validator)
- Development tools (nodemon, Jest)

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/auth-db

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_min_32_chars
JWT_EXPIRES_IN=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=10

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Admin Configuration
SUPER_ADMIN_EMAIL=admin@example.com
```

### 4. Initialize Database

If using local MongoDB:

```bash
mongod
```

For MongoDB Atlas (cloud), use your connection string in `MONGO_URI`.

## Configuration

The application uses modular configuration files in `src/config/`:

### `env.js` - Environment Validation

Validates and exports all required environment variables. Ensures application won't start without critical configs.

### `db.js` - Database Connection

Establishes connection to MongoDB using Mongoose. Handles connection events and error logging.

### `cors.js` - CORS Setup

Configures allowed origins, credentials, and allowed methods:

- Allows credentials in cross-origin requests
- Whitelists specific origins (configurable)
- Handles preflight requests

### `csp.js` - Content Security Policy

Prevents XSS attacks by controlling resource loading:

- Restricts script sources
- Prevents inline script execution
- Controls frame ancestors

### `hsts.js` - HTTPS Enforcement

Ensures all connections use HTTPS:

- 6-month max age
- Preload enabled for browser HSTS list
- Includes subdomains

### `ratelimit.js` - Rate Limiting

Prevents brute-force attacks and DDoS:

- Configurable time window (default: 15 minutes)
- Configurable request limit (default: 10 requests)
- IP-based tracking

## Project Structure & Architecture

```
src/
├── app.js                    # Express app setup & middleware configuration
├── server.js                 # Server entry point & startup
│
├── config/                   # Configuration modules
│   ├── cor.js               # CORS configuration
│   ├── csp.js               # Content Security Policy
│   ├── db.js                # MongoDB connection setup
│   ├── env.js               # Environment variable validation
│   ├── hsts.js              # HSTS security headers
│   └── ratelimit.js         # Rate limiting rules
│
├── controllers/              # HTTP request handlers
│   ├── auth.controller.js   # Register, Login logic
│   ├── admin.controller.js  # Admin operations & validation
│   └── platform.controller.js # User profile/platform access
│
├── middlewares/              # Middleware functions
│   └── auth.middleware.js   # Input validation middleware
│
├── models/                   # Database schemas
│   └── auth.model.js        # User schema with methods
│
├── routes/                   # API endpoint definitions
│   ├── index.js             # Route aggregation
│   ├── auth.route.js        # Auth endpoints (register, login, profile)
│   └── admin.route.js       # Admin endpoints (list users, find user)
│
├── services/                 # Business logic layer
│   └── auth.service.js      # Database operations (create, find users)
│
├── utils/                    # Utility functions
│   └── jwt.js               # JWT token operations
│
├── validators/               # Input validation rules
│   └── auth.validator.js    # Validation for auth endpoints
│
└── test/                     # Test files
    └── app.test.js          # API integration tests

```

### Architectural Layers

#### 1. **Presentation Layer (Controllers)**

- Handles HTTP requests and responses
- Validates input using middleware
- Delegates business logic to services
- Returns JSON responses

**Example**: `auth.controller.js` - `register()` function

```javascript
- Receives user input from HTTP request
- Calls service to create user in database
- Returns success/error response
```

#### 2. **Business Logic Layer (Services)**

- Encapsulates database operations
- Handles data transformations
- Manages relationships between entities
- Independent of HTTP/Express

**Example**: `auth.service.js` - `createUser()` function

```javascript
- Accepts user data
- Saves to MongoDB
- Returns created user document
```

#### 3. **Data Access Layer (Models)**

- Defines data structure with Mongoose schemas
- Implements custom methods on models
- Enforces validation at database level

**Example**: `auth.model.js` - User schema with `comparePassword()` method

#### 4. **Middleware Layer**

- Validates all inputs before reaching controllers
- Handles authentication token verification
- Enforces security policies
- Logs requests

#### 5. **Configuration Layer**

- Centralizes environment-specific settings
- Applies security configurations globally
- Manages external service connections

## Implementation Details

### Authentication Flow

#### User Registration

1. User sends POST request to `/register` with name, username, email, password
2. Express validator middleware validates input format
3. Custom validators check for existing email/username
4. Password is hashed using bcrypt (10 salt rounds)
5. User role is assigned based on email (super admin check)
6. New user document created in MongoDB
7. Success response sent with user data (no password)

#### User Login

1. User sends POST request to `/login` with email and password
2. Service retrieves user from database by email
3. Bcrypt compares provided password with stored hash
4. JWT token generated with user ID and role
5. Token stored in HTTP-only cookie (prevents XSS)
6. Response includes token and user data

#### Token Verification

1. User includes token in subsequent requests (via cookie or header)
2. `verifyToken` middleware extracts and validates JWT
3. Token signature verified using JWT_SECRET
4. User ID from token attached to request object
5. Request proceeds with authenticated user context

### Role-Based Access Control (RBAC)

**Admin Check in Registration**:

```javascript
const isAdmin = email === env.SUPER_ADMIN_EMAIL;
role: isAdmin ? "admin" : "user";
```

**Admin Middleware Validation**:

```javascript
export const adminValidate = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
```

### Password Security

- **Hashing Algorithm**: bcrypt
- **Salt Rounds**: 10 (balance between security and performance)
- **Comparison**: Never compare plain passwords; use bcrypt.compare()

**Implementation**:

```javascript
// During registration
const hashedPassword = await bcrypt.hash(password, 10);

// During login
const isMatch = await user.comparePassword(password);
```

### Input Validation Strategy

**Chain of Validation**:

1. **Client-side**: Basic format checks (optional, for UX)
2. **Middleware Validation**: Express-validator checks
   - Email format and uniqueness
   - Password strength
   - Required fields
   - Username uniqueness
3. **Schema Validation**: Mongoose enforces schema rules
   - Type checking
   - Required fields
   - Unique constraints (email, username)

### Error Handling Approach

- **Try-Catch Blocks**: Wrap async operations
- **Specific Error Messages**: Helpful for debugging (in development)
- **Generic Responses**: In production to prevent info leakage
- **Consistent Format**: All errors return standardized JSON

## API Documentation

### Authentication Endpoints

#### 1. Register User

Creates a new user account with role-based assignment.

```http
POST /register
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (201 Created)**:

```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Responses**:

- `400 Bad Request`: Invalid input format
- `409 Conflict`: Email or username already exists
- `500 Internal Server Error`: Database error

#### 2. Login User

Authenticates user and returns JWT token in HTTP-only cookie.

```http
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (200 OK)**:

```json
{
  "message": "Login successful",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Headers**:

```
Set-Cookie: token=eyJhbGc...; HttpOnly; SameSite=Lax; Secure
```

**Error Responses**:

- `400 Bad Request`: Missing email or password
- `404 Not Found`: User doesn't exist
- `401 Unauthorized`: Invalid password

#### 3. Get User Profile (Protected Route)

Retrieves authenticated user's profile information.

```http
GET /profile
Authorization: Bearer <token>
Cookie: token=<token>
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Responses**:

- `401 Unauthorized`: Missing or invalid token
- `404 Not Found`: User not found

### Admin Endpoints

**Requirement**: User must have `role: 'admin'`

#### 1. Get All Users (Admin Only)

Retrieves list of all registered users.

```http
GET /api/admin/users
Authorization: Bearer <admin-token>
```

**Success Response (200 OK)**:

```json
{
  "message": "Get all users",
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Admin User",
      "username": "admin",
      "email": "admin@example.com",
      "role": "admin"
    }
  ]
}
```

**Error Responses**:

- `401 Unauthorized`: Missing/invalid admin token
- `403 Forbidden`: User is not admin
- `404 Not Found`: No users found

#### 2. Get User by Username (Admin Only)

Retrieves specific user details by username.

```http
GET /api/admin/users/:username
Authorization: Bearer <admin-token>
```

**Success Response (200 OK)**:

```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Responses**:

- `401 Unauthorized`: Missing/invalid auth token
- `403 Forbidden`: User is not admin
- `404 Not Found`: User with username not found

## Security Architecture

### Multi-Layer Security Implementation

#### Layer 1: Network Security

**CORS (Cross-Origin Resource Sharing)**

- Configured origin whitelist in `config/cors.js`
- Only allows requests from configured domains
- Credentials support enabled (cookies)
- Handles preflight OPTIONS requests

**Rate Limiting**

- IP-based request tracking
- Configurable time window (15 minutes default)
- Configurable max requests (100 per window)
- Returns 429 (Too Many Requests) when exceeded
- Prevents brute-force attacks and DDoS

#### Layer 2: Transport Security

**HSTS (HTTP Strict Transport Security)**

- Enforces HTTPS connections
- 6-month max-age directive
- Preload enabled for browser HSTS list
- Includes subdomains directive

**Secure Cookie Configuration**

```javascript
res.cookie("token", token, {
  httpOnly: true, // Prevents JavaScript access (XSS protection)
  secure: false, // Set to true in production (HTTPS only)
  sameSite: "lax", // CSRF protection
});
```

#### Layer 3: Application Security

**Helmet Middleware**

- X-Frame-Options: DENY (clickjacking protection)
- X-Content-Type-Options: nosniff (MIME type sniffing prevention)
- X-XSS-Protection: 1; mode=block (legacy XSS protection)
- Removes X-Powered-By header

**Content Security Policy (CSP)**

- Restricts inline script execution
- Whitelists specific script sources
- Controls frame ancestors
- Prevents data exfiltration attacks

**Input Validation & Sanitization**

- Express-validator checks all inputs
- Email format validation
- Password strength requirements
- Username/email uniqueness validation
- MongoDB injection prevention via mongo-sanitize

#### Layer 4: Authentication & Authorization

**JWT Token Security**

- Tokens include user ID and role
- Signed with secret key (256-bit recommended)
- Expires after configured duration (7 days default)
- Verified before accessing protected routes
- Stored in HTTP-only cookies

**Password Security**

- Bcrypt hashing with 10 salt rounds
- Never stored in plain text
- Secure comparison prevents timing attacks
- Salt regenerated for each password

**Role-Based Access Control**

- Users assigned roles during registration
- Routes protected by role validation middleware
- Admin routes require `role === 'admin'`
- Returning 403 Forbidden for unauthorized access

#### Layer 5: Data Security

**Error Handling**

- Generic error messages prevent information leakage
- Detailed logs for debugging (development only)
- Stack traces not exposed in production
- Timestamps for audit trails

**Database Security**

- MongoDB connection string in environment variables
- Mongoose schema validation
- Unique indexes on sensitive fields (email, username)
- No sensitive data in responses (passwords, tokens)

## Running the Server

### Development Mode

Starts the server with automatic restart on file changes.

```bash
npm run dev
```

Features:

- Nodemon auto-reload
- Full error stack traces
- Console logging enabled
- Rate limiting increased for development

### Production Mode

Optimized production build.

```bash
npm start
```

Features:

- No auto-reload
- Minimal logging
- Full rate limiting enabled
- Secure cookies (HTTPS required)

### Custom Configuration

Run with specific environment variables:

```bash
NODE_ENV=production PORT=8000 JWT_SECRET=your-secret npm start
```

### Verify Server is Running

```bash
curl http://localhost:5000

# Expected response (404 for invalid route):
# {"success":false,"message":"Route / not found"}
```

## Testing

The project includes Jest and Supertest for API testing.

### Run Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Generate Coverage Report

```bash
npm run test:coverage
```

### Test Structure

Tests located in `src/test/app.test.js`:

- Authentication flow tests
- Authorization tests
- Error handling tests
- Security feature validation

### Testing Security Features

- Verify rate limiting blocks requests
- Confirm CORS rejects disallowed origins
- Test JWT expiration
- Validate password hashing
- Check admin role enforcement

## Error Handling

The API implements standardized error responses across all endpoints.

### Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400,
  "timestamp": "2024-05-10T10:30:00Z"
}
```

### HTTP Status Codes

| Code | Scenario            | Example                         |
| ---- | ------------------- | ------------------------------- |
| 200  | Success             | Login response                  |
| 201  | Resource created    | User registration               |
| 400  | Bad request         | Invalid input format            |
| 401  | Unauthorized        | Missing/invalid token           |
| 403  | Forbidden           | Non-admin accessing admin route |
| 404  | Not found           | User doesn't exist              |
| 409  | Conflict            | Email already registered        |
| 429  | Rate limit exceeded | Too many login attempts         |
| 500  | Server error        | Database connection failed      |

### Error Handling Strategy

1. **Input Validation Errors** → 400 Bad Request
2. **Authentication Failures** → 401 Unauthorized
3. **Authorization Failures** → 403 Forbidden
4. **Resource Not Found** → 404 Not Found
5. **Duplicate Resources** → 409 Conflict
6. **Rate Limit Exceeded** → 429 Too Many Requests
7. **Server Errors** → 500 Internal Server Error

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Coding Standards

- Follow consistent naming conventions
- Add tests for new features
- Update documentation
- Keep commits atomic and descriptive
- Ensure security best practices are maintained

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Author

**Adewale Ayomide**

- GitHub: [@adewaleayomide](https://github.com/adewaleayomide)
- Email: adewaleayo91@gmail.com

## Support

For issues, questions, or suggestions:

1. Check existing [Issues](https://github.com/yourusername/express-auth-api/issues)
2. Create a new Issue with detailed description
3. Include error messages, steps to reproduce, and environment details

---

**Last Updated**: May 2026
**Status**: Production Ready
