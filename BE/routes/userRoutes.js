import express from "express";

import {
  updateProfile,
  changePassword,
} from "../controllers/userController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

export default router;