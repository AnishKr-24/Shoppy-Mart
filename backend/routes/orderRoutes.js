const express = require("express");
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { createOrder, getOrders, myOrders, updateOrderStatus } = require("../controllers/orderController.js");

const router = express.Router();

router.route('/').post(protect, createOrder).get(protect, admin, getOrders);
router.route('/myorders').get(protect, myOrders);
router.route('/:id').get(protect, myOrders).put(protect, admin, updateOrderStatus);

module.exports = router;