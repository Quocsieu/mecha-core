import express from "express";

import {
  getProducts,
  getProductNew,
  getProductById,
  createProduct,
  updateProducts,
  deleteProduct,
  searchProduct,
} from "../controllers/productController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

// GET - user bình thường cũng được xem
router.get("/", getProducts);

router.get("/new", getProductNew);

router.get("/search", searchProduct);

router.get("/:id", getProductById);

// POST - chỉ Admin
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createProduct
);

// PUT - chỉ Admin
router.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateProducts
);

// DELETE - chỉ Admin
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);

export default router;