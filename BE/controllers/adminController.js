import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

export const getDashboard = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();

    const userCount = await User.countDocuments();

    const orderCount = await Order.countDocuments();

    const revenueResult = await Order.aggregate([
      {
        $match: {
          status: {
            $in: [
              "confirmed",
              "shipping",
              "completed",
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$total",
          },
        },
      },
    ]);

    const revenue =
      revenueResult.length > 0
        ? revenueResult[0].total
        : 0;

    return res.status(200).json({
      products: productCount,
      users: userCount,
      orders: orderCount,
      revenue,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};