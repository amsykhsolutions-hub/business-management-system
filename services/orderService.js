const Order = require("../models/Order");
const Product = require("../models/Product");

// =========================
// CREATE ORDER
// =========================
exports.createOrder = async (items, userId) => {
  if (!items || items.length === 0) {
    throw new Error("Order items required");
  }

  let totalPrice = 0;
  const orderItems = [];

  // 🔥 We’ll use first product business
  let businessId = null;

  for (let item of items) {
    const product = await Product.findOne({
      _id: item.product,
      user: userId,
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // 🔥 Save business
    if (!businessId) {
      businessId = product.business;
    }

    const qty = Number(item.quantity);

    if (!qty || qty <= 0) {
      throw new Error("Invalid quantity");
    }

    // 🔥 STOCK CHECK
    if (product.stock < qty) {
      throw new Error(
        `${product.name} has only ${product.stock} left`
      );
    }

    // 💰 CALCULATE TOTAL
    totalPrice += product.price * qty;

    // 📦 BUILD ORDER ITEM
    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: qty,
    });

    // 📉 REDUCE STOCK
    product.stock -= qty;

    await product.save();
  }

  // =========================
  // CREATE ORDER
  // =========================
  const order = await Order.create({
    user: userId,
    business: businessId,
    items: orderItems,
    totalPrice,
    status: "paid",
  });

  return order;
};

// =========================
// GET MY ORDERS
// =========================
exports.getMyOrders = async (userId) => {
  return await Order.find({ user: userId })
    .populate("items.product")
    .sort({ createdAt: -1 });
};

// =========================
// GET ALL ORDERS
// =========================
exports.getAllOrders = async (businessId, query) => {
  let {
    page = 1,
    limit = 10,
    status,
    startDate,
    endDate,
  } = query;

  page = parseInt(page);
  limit = parseInt(limit);

  // =========================
  // FILTER OBJECT
  // =========================
  let filter = {
    business: businessId,
  };

  // 🔹 STATUS FILTER
  if (status) {
    filter.status = status;
  }

  // 🔹 DATE RANGE FILTER
  if (startDate || endDate) {
    filter.createdAt = {};

    if (startDate) {
      filter.createdAt.$gte = new Date(startDate);
    }

    if (endDate) {
      filter.createdAt.$lte = new Date(endDate);
    }
  }

  // =========================
  // QUERY DATABASE
  // =========================
  const orders = await Order.find(filter)
    .populate("items.product")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  // =========================
  // TOTAL DOCUMENTS
  // =========================
  const total = await Order.countDocuments(filter);

  return {
    data: orders,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
// =========================
// REVENUE SUMMARY
// =========================
exports.getRevenueSummary = async (businessId) => {
  const result = await Order.aggregate([
    // 🔒 SaaS isolation
    {
      $match: {
        business: businessId,
        status: {
          $in: ["paid", "completed"],
        },
      },
    },

    // 📊 Calculate analytics
    {
      $group: {
        _id: null,

        totalRevenue: {
          $sum: "$totalPrice",
        },

        totalOrders: {
          $sum: 1,
        },

        averageOrderValue: {
          $avg: "$totalPrice",
        },
      },
    },
  ]);

  // 🔥 Empty fallback
  if (result.length === 0) {
    return {
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
    };
  }

  return {
    totalRevenue: result[0].totalRevenue,
    totalOrders: result[0].totalOrders,
    averageOrderValue: Math.round(
      result[0].averageOrderValue
    ),
  };
};
// =========================
// UPDATE ORDER STATUS
// =========================
exports.updateOrderStatus = async (
  orderId,
  businessId,
  newStatus
) => {
  // 🔍 Find order
  const order = await Order.findOne({
    _id: orderId,
    business: businessId,
  });

  // ❌ Order not found
  if (!order) {
    throw new Error("Order not found");
  }

  const currentStatus = order.status;

  // =========================
  // ALLOWED STATUS CHANGES
  // =========================
  const allowedTransitions = {
    pending: ["paid", "cancelled"],

    paid: ["shipped", "refunded"],

    shipped: ["completed"],

    completed: [],

    cancelled: [],

    refunded: [],
  };

  // ❌ Invalid transition
  if (
    !allowedTransitions[currentStatus].includes(
      newStatus
    )
  ) {
    throw new Error(
      `Cannot change status from ${currentStatus} to ${newStatus}`
    );
  }

  // ✅ Update status
  order.status = newStatus;

  await order.save();

  return order;
};
