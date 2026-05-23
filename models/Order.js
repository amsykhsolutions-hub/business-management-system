const mongoose = require("mongoose");

// =========================
// ORDER ITEM SCHEMA
// =========================
const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // 🔥 Snapshot of product name
    name: {
      type: String,
      required: true,
    },

    // 🔥 Snapshot of product price
    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  { _id: false }
);

// =========================
// ORDER SCHEMA
// =========================
const orderSchema = new mongoose.Schema(
  {
    // 👤 User who placed order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // 🏢 SaaS business isolation
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    // 📦 Order items
    items: {
      type: [orderItemSchema],
      required: true,

      validate: {
        validator: function (items) {
          return items.length > 0;
        },

        message: "Order must contain at least one item",
      },
    },

    // 💰 Total order price
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // 🚚 Order lifecycle
    status: {
      type: String,

      enum: [
        "pending",
        "paid",
        "shipped",
        "completed",
        "cancelled",
        "refunded",
      ],

      default: "paid",

      index: true,
    },

    // 💳 Payment tracking
    paymentStatus: {
      type: String,

      enum: [
        "unpaid",
        "paid",
        "failed",
        "refunded",
      ],

      default: "paid",
    },
  },

  // 🕒 createdAt + updatedAt
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
