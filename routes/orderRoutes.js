const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getRevenueSummary,
updateOrderStatus,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
// =========================
// ORDER ROUTES
// =========================
router.post("/", protect, createOrder);

router.get("/", protect, getAllOrders);

router.get("/my-orders", protect, getMyOrders);

router.get(
  "/revenue-summary",
  protect,
  getRevenueSummary
);
// =========================
// UPDATE ORDER STATUS
// =========================
router.patch(
  "/:id/status",
  protect,
  updateOrderStatus
);
module.exports = router;


