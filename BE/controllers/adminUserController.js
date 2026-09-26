import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      users,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const user = await User.findOne({
      id: userId,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.role = role;

    await user.save();

    return res.status(200).json({
      message: "User role updated successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateUserStatus = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { status } = req.body;

    if (!["active", "disabled"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const user = await User.findOne({
      id: userId,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.status = status;

    await user.save();

    return res.status(200).json({
      message: "User status updated successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};