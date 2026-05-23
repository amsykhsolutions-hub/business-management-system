const orderService = require("../services/orderService");

// =========================
// CREATE ORDER
// =========================
const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(
      req.body.items,
      req.user.id
    );

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// GET ALL ORDERS
// =========================
const getAllOrders = async (req, res) => {
  try {
    const result = await orderService.getAllOrders(
      req.user.business._id,
      req.query
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// GET MY ORDERS
// =========================
const getMyOrders = async (req, res) => {
  try {
    const orders = await orderService.getMyOrders(req.user.id);

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// =========================
// REVENUE SUMMARY
// =========================
const getRevenueSummary = async (req, res) => {
  try {
    const summary =
      await orderService.getRevenueSummary(
        req.user.business._id
      );

    res.status(200).json({
      success: true,
      summary,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = {
  createOrder,
  getAllOrders,
  getMyOrders,
getRevenueSummary,
};
