import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

import { getDashboard } from "../controllers/adminController.js";

import {
  getUsers,
  updateUserRole,
} from "../controllers/adminUserController.js";

import {
  getAllOrders,
  updateOrderStatus,
} from "../controllers/adminOrderController.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, adminMiddleware, getDashboard);

router.get("/users", authMiddleware, adminMiddleware, getUsers);

router.put("/users/:id/role", authMiddleware, adminMiddleware, updateUserRole);

router.get("/orders", authMiddleware, adminMiddleware, getAllOrders);

router.put(
  "/orders/:id/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus,
);

export default router;
