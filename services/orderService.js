const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (items, userId) => {
  if (!items || items.length === 0) {
    throw new Error("Order items required");
  }

  let totalPrice = 0;
  const orderItems = [];

  for (let item of items) {
    const product = await Product.findOne({
      _id: item.product,
      user: userId,
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const qty = parseInt(item.quantity);

if (!qty || qty <= 0) {
  throw new Error("Invalid quantity");
}
// 🔥 IMPORTANT FIX

    if (product.stock < qty) {
      throw new Error(`${product.name} has only ${product.stock} left`);
    }

    // 💰 calculate price
    totalPrice += product.price * qty;

    // 📦 build order
    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: qty,
    });

    // 🔥 REDUCE STOCK HERE (SINGLE SOURCE OF TRUTH)
    product.stock -= qty;
    await product.save();
  }

  const order = await Order.create({
    user: userId,
    items: orderItems,
    totalPrice,
  });

  return order;
};


