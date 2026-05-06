// REGISTER & LOGIN

import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { loginValidation, registerValidation, existingEmail, existingUsername  } from '../validator/auth.validator.js';
import { validate } from '../middlewares/auth.middleware.js';
import { verifyToken } from '../utils/jwt.js';
import { platform } from '../controllers/platform.controller.js';

const router = express.Router();

// register a new user
router.post('/register', registerValidation, existingEmail, existingUsername, validate, register);

// login an existing user
router.post('/login', loginValidation, validate, login);

router.get('/profile', verifyToken, platform);

// logout a user


// get all users
// get a particular user


// router.disable("X-powered-by");
export default router;