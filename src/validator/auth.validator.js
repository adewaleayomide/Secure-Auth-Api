import { body, query, param} from "express-validator";
import { findInfo } from "../services/auth.service.js";

export const registerValidation = [
    body('name')
    .exists().withMessage('Name is required')
    .isString().trim().escape()
    .isLength({ min: 2, max: 25}).withMessage("Name must not be less than 2 Characters and more than 25 characters"),
    body('username')
    .exists().withMessage('Username is required')
    .isAlphanumeric().withMessage('Username can only contain Letter and Number'),
    body('email')
    .exists().withMessage('Email is required')
    .isEmail().withMessage("Invalid Email Format").normalizeEmail(),
    body('password')
    .exists().withMessage("Password is required")
    .isStrongPassword().withMessage("Password must contain a Capital Letter, Small letter, Number, Symbol")
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

export const loginValidation = [
    body('email')
    .exists().withMessage('Email is required')
    .isEmail().withMessage("Invalid Email Format").normalizeEmail(),
    body('password')
    .exists().withMessage('Password is required')
];

export const existingEmail = body('email').custom(async (email) => {
  const normalizedEmail = email.toLowerCase();

  const user = await findInfo({ email: normalizedEmail })

  if (user) {
    throw new Error('Email already in use'); // ✅ THIS is correct
  }

  return true;
});

export const existingUsername = body('username').custom(async (username) => {
  const user = await findInfo({ username });

  if (user) {
    throw new Error('Username already in use'); // ✅ correct
  }

  return true;
});