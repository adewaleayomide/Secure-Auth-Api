// REGISTER & LOGIN

import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { loginValidation, registerValidation, existingEmail, existingUsername  } from '../validator/auth.validator.js';
import { validate } from '../middlewares/auth.middleware.js';
import { verifyToken } from '../utils/jwt.js';
import { platform } from '../controllers/platform.controller.js';

const router = express.Router();

// register a new user - DONE
router.post('/register', registerValidation, existingEmail, existingUsername, validate, register);

// login an existing user - DONE
router.post('/login', loginValidation, validate, login);

// access platform - DONE
router.get('/profile', verifyToken, platform);

router.patch('/make-admin', async (req, res) => {
  const user = await User.findOneAndUpdate(
    { email: env.SUPER_ADMIN_EMAIL },
    { role: 'admin' },
    { new: true }
  );
  res.json(user);
});

// router.disable("X-powered-by");
export default router;