const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
router.get("/my-orders", protect, orderController.getMyOrders);
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, orderController.createOrder);

module.exports = router;
