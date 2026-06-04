const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const Order = require('../model/Order');
const Product = require('../model/Product');
const User = require('../model/User');

// Sales Analytics
router.get("/sales", protect, admin, async (req, res) => {
  try {
    // TODO: Add sales analytics logic
    res.status(200).json({ message: "Sales analytics data" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Product Analytics
router.get("/products", protect, admin, async (req, res) => {
  try {
    // TODO: Add product analytics logic
    res.status(200).json({ message: "Product analytics data" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// User Analytics
router.get("/users", protect, admin, async (req, res) => {
  try {
    // TODO: Add user analytics logic
    res.status(200).json({ message: "User analytics data" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Revenue Analytics
router.get("/revenue", protect, admin, async (req, res) => {
  try {
    // TODO: Add revenue analytics logic
    res.status(200).json({ message: "Revenue analytics data" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Summary analytics for dashboard
router.get('/', protect, admin, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const revenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = (revenueAgg && revenueAgg[0] && revenueAgg[0].total) || 0;

    res.status(200).json({
      totalOrders,
      totalProducts,
      totalUsers,
      totalRevenue
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
