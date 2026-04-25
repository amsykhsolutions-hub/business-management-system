const orderService = require("../services/orderService");

exports.createOrder = async (req, res) => {
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
