import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorhandling.js";

const app = express();
throw new Error("TEST SERVER CODE");
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/api/auth", authRouter);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);

async function strartServer() {
  await connectDB();
  // Route 1: Kết nối Backend  tại trang chủ
  app.get("/", (req, res) => {
    res.send("Hello Backend");
  });

  // Route 2: GET/api
  app.get("/api", (req, res) => {
    res.send("Hello API");
  });

  // Route 3: Kết nối Backend
  app.use("/api/products", productRoutes);

  // Route 4: Upload file
  app.use("/api/upload", uploadRoutes);

  // Test lỗi
  app.get("/api/error", (req, res, next) => {
    const error = new Error();
    next(error);
  });

  app.use(errorHandler);

  // Khởi động server
  app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
  });
}

strartServer();
