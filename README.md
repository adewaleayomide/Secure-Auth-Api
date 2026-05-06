# Secure Auth API

A production-ready authentication API built with Express.js that implements industry-standard security practices including JWT authentication, HTTP-only cookies, rate limiting, CORS protection, and comprehensive security headers.

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?style=flat-square)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-90c53f?style=flat-square)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v5%2B-13aa52?style=flat-square)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Security Features](#security-features)
- [Running the Server](#running-the-server)
- [Testing](#testing)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Features

- User registration and authentication
- JWT-based stateless authentication
- Secure HTTP-only cookie storage
- Password hashing with bcrypt
- Request rate limiting with configurable thresholds
- CORS (Cross-Origin Resource Sharing) protection
- Security headers via Helmet middleware
- MongoDB persistent data storage with Mongoose ODM
- Protected routes with authentication middleware
- Admin panel functionality
- Input validation and sanitization
- Comprehensive error handling and logging
- Environment-based configuration

## Technologies

- **Runtime**: Node.js v18+
- **Web Framework**: Express.js 4.x
- **Database**: MongoDB v5+ with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Security**: bcrypt
- **Security Headers**: Helmet
- **Rate Limiting**: express-rate-limit
- **Environment Management**: dotenv
- **Testing**: Jest (configured)

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

This will install all required packages as specified in `package.json`.

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
JWT_EXPIRE=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Admin Configuration
ADMIN_EMAIL=admin@example.com
```

### 4. Initialize Database

If using local MongoDB:

```bash
mongod
```

For MongoDB Atlas cloud database, use your connection string in `MONGO_URI`.

## Project Structure

```
src/
├── app.js                    # Express app configuration
├── server.js                 # Server initialization and startup
├── config/                   # Configuration files
│   ├── cors.js              # CORS middleware setup
│   ├── csp.js               # Content Security Policy configuration
│   ├── db.js                # Database connection
│   ├── env.js               # Environment variable validation
│   ├── hsts.js              # HSTS security header
│   └── ratelimit.js         # Rate limiting configuration
├── controllers/              # Request handlers
│   ├── auth.controller.js    # Authentication logic
│   ├── admin.controller.js   # Admin operations
│   └── platform.controller.js # Platform operations
├── middlewares/              # Middleware functions
│   └── auth.middleware.js    # JWT verification middleware
├── models/                   # Database schemas
│   └── auth.model.js        # User schema and model
├── routes/                   # API route definitions
│   ├── index.js             # Route aggregation
│   ├── auth.route.js        # Authentication routes
│   └── admin.route.js       # Admin routes
├── services/                 # Business logic
│   └── auth.service.js      # Authentication service functions
├── utils/                    # Utility functions
│   └── jwt.js               # JWT token operations
├── validators/               # Input validation
│   └── auth.validator.js    # Authentication request validation
└── test/                     # Test files
    └── app.test.js          # API tests
```

## API Documentation

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response (201 Created)**:

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK)**:

```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Get User Profile (Protected)

```http
GET /api/auth/profile
Authorization: Bearer <token>
```

**Response (200 OK)**:

```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

### Admin Endpoints

#### Get All Users (Admin Only)

```http
GET /api/admin/users
Authorization: Bearer <admin_token>
```

**Response (200 OK)**:

```json
{
  "success": true,
  "users": [...],
  "total": 42
}
```

## Security Features

### Authentication & Authorization

- **JWT Tokens**: Stateless authentication using JSON Web Tokens
- **HTTP-Only Cookies**: Secure token storage prevents XSS attacks
- **Token Expiration**: Configurable token lifetime with refresh capability
- **Password Security**: Salted bcrypt hashing with strength factor 10

### Network Security

- **Rate Limiting**: Prevents brute-force and DDoS attacks
  - Configurable per-endpoint rate limits
  - IP-based request tracking
  - 15-minute rolling windows by default

- **CORS Protection**: Whitelisted origin control
  - Credential support enabled
  - Preflight request handling
  - Custom header configuration

- **HSTS (HTTP Strict Transport Security)**: Forces HTTPS connections
  - 6-month max age
  - Preload enabled for modern browsers

### Headers & Content Security

- **Helmet Middleware**: Protects against common vulnerabilities
  - X-Frame-Options: DENY (Clickjacking protection)
  - X-Content-Type-Options: nosniff (MIME type sniffing prevention)
  - X-XSS-Protection: 1; mode=block (Legacy XSS protection)
  - Strict-Transport-Security (HSTS)

- **CSP (Content Security Policy)**: Controls resource loading
  - Prevents inline script execution
  - Restricts resource origins

### Data Protection

- **Environment Variables**: Sensitive credentials never hardcoded
- **Input Validation**: All user inputs validated and sanitized
- **Error Messages**: Generic error responses prevent information leakage
- **Logging**: Requests and activity logged for audit trails

## Running the Server

### Development Mode

```bash
npm run dev
```

Starts the server with automatic restart on file changes using Nodemon.

### Production Mode

```bash
npm start
```

Runs the server with production optimizations.

### Custom Configuration

To run with specific environment:

```bash
NODE_ENV=production PORT=8000 npm start
```

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate coverage report:

```bash
npm run test:coverage
```

## Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Common HTTP Status Codes

| Code | Meaning                                       |
| ---- | --------------------------------------------- |
| 200  | OK - Request successful                       |
| 201  | Created - Resource created successfully       |
| 400  | Bad Request - Invalid input                   |
| 401  | Unauthorized - Missing/invalid authentication |
| 403  | Forbidden - Insufficient permissions          |
| 404  | Not Found - Resource doesn't exist            |
| 409  | Conflict - Resource already exists            |
| 429  | Too Many Requests - Rate limit exceeded       |
| 500  | Internal Server Error - Server-side error     |

## Contributing

Contributions are welcome and appreciated. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards

- Follow ESLint configuration
- Use consistent naming conventions
- Add tests for new features
- Update documentation as needed
- Keep commits atomic and descriptive

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Adewale Ayomide**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## Support

For issues, questions, or suggestions:

1. Check existing [Issues](https://github.com/yourusername/express-auth-api/issues)
2. Create a new Issue with detailed description
3. Include error messages, steps to reproduce, and environment details

---

**Last Updated**: December 2024
