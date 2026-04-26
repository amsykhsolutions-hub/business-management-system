const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE ORDER
router.post("/", authMiddleware, orderController.createOrder);

// GET MY ORDERS
router.get("/my-orders", authMiddleware, orderController.getMyOrders);

module.exports = router;
