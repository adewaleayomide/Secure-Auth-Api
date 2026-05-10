import express from "express";
import { adminValidate, adminGetAllUsers, adminGetUserByUsername } from "../controllers/admin.controller.js";
import { verifyToken } from "../utils/jwt.js";

const router = express.Router();

router.get('/users', verifyToken, adminValidate, adminGetAllUsers);

router.get('/users/:username', verifyToken, adminValidate, adminGetUserByUsername );

export default router;