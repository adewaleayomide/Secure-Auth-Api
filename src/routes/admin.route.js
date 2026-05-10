import express from "express";
import { adminValidate, adminGetAllUsers } from "../controllers/admin.controller.js";
import { verifyToken } from "../utils/jwt.js";

const router = express.Router();

// find all users
// filter based on role
// filter by first match - findOne

router.get('/users', verifyToken, adminValidate, adminGetAllUsers);

export default router;