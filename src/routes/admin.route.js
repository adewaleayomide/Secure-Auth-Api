import express from "express";
import { adminGetAllUsers, adminGetUserById } from "../controllers/admin.controller.js";
import { verifyToken } from "../utils/jwt.js";

const router = express.Router();

const adminValidate = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

router.get('/users', verifyToken, adminValidate, adminGetAllUsers);
router.get('/users/:id', verifyToken, adminValidate, adminGetUserById);

export default router;