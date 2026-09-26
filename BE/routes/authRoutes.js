import express from "express";
import {
  getUsers,
  updateUserRole,
  updateUserStatus,
} from "../controllers/adminUserController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import { register, login, getCurrentUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", authMiddleware, getCurrentUser);

router.put(
  "/users/:id/status",
  authMiddleware,
  adminMiddleware,
  updateUserStatus,
);

export default router;
