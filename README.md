
# Secure Auth API

A secure authentication API built with Express.js implementing JWT authentication, HTTP-only cookies, rate limiting, and modern backend security practices.

---

## Features

- User Registration
- User Login
- JWT Authentication
- HTTP-only Cookies
- Password Hashing with bcrypt
- Rate Limiting
- Helmet Security Headers
- MongoDB Integration
- Protected Routes

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Helmet
- express-rate-limit

---


- Uses Helmet to secure HTTP headers against common web vulnerabilities.



## Installation

Clone the repository:

```bash
git clone <repo-url>
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file:

```env
PORT=
MONGO_URI=
JWT_SECRET=
NODE_ENV=
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/user/profile | Protected route |

---

## Security Features

- HTTP-only cookies
- JWT verification
- Password hashing
- Rate limiting
- Secure headers
- Environment variable protection

---

## Folder Structure

```bash
src/
├── controllers/
├── routes/
├── middleware/
├── models/
├── config/
├── utils/
```

---

## Author

Adewale Ayomide