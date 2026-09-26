import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const { customer, shippingAddress, items, total, paymentMethod } = req.body;

    // Validate dữ liệu
    if (!customer?.name || !customer?.email || !customer?.phone) {
      return res.status(400).json({
        message: "Customer information is required",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        message: "Shipping address is required",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one product",
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        message: "Payment method is required",
      });
    }

    // Tính lại total từ items
    const calculatedTotal = items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    // Kiểm tra total frontend gửi lên
    if (calculatedTotal !== total) {
      return res.status(400).json({
        message: "Invalid order total",
      });
    }

    // Tạo ID Order
    const lastOrder = await Order.findOne().sort({
      id: -1,
    });

    const newId = lastOrder ? lastOrder.id + 1 : 1;

    // Tạo Order
    const order = await Order.create({
      id: newId,
      userId: req.user.id,
      customer,
      shippingAddress,
      items,
      total: calculatedTotal,
      paymentMethod,
      status: "pending",
    });

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = Number(req.params.id);
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "confirmed",
      "shipping",
      "completed",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findOne({
      id: orderId,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    return res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const orderId = Number(req.params.id);

    const order = await Order.findOne({
      id: orderId,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Không cho user xem order của người khác
    if (order.userId !== req.user.id) {
      return res.status(403).json({
        message: "You are not allowed to view this order",
      });
    }

    return res.status(200).json({
      order,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
