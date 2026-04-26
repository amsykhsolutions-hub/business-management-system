const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// Get logged-in user's orders
router.get("/my-orders", protect, orderController.getMyOrders);

// Create order
router.post("/", protect, orderController.createOrder);

module.exports = router;
