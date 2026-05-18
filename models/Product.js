const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  stock: {
    type: Number,
    default: 0,
  },

  // OLD SYSTEM (keep for now)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // NEW SAAS SYSTEM
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
