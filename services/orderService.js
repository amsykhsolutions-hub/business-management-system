const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (items, userId) => {
  if (!items || items.length === 0) {
    throw new Error("Order items required");
  }

  let totalPrice = 0;
  const orderItems = [];

  for (let item of items) {
    const product = await Product.findById(item.product);

    if (!product) {
      throw new Error("Product not found");
    }

    const itemTotal = product.price * item.quantity;
    totalPrice += itemTotal;

    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });
  }

  const order = await Order.create({
    user: userId,
    items: orderItems,
    totalPrice,
  });

  return order;
};
exports.getMyOrders = async (userId) => {
  const orders = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate("items.product", "name price");

  return orders;
};
