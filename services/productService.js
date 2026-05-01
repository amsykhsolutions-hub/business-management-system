const Product = require("../models/Product");

// =========================
// CREATE PRODUCT
// =========================
exports.createProduct = async (data, userId) => {
  return await Product.create({
    ...data,
    user: userId
  });
};

// =========================
// GET ALL PRODUCTS (USER SCOPED)
// =========================
exports.getAllProducts = async (userId) => {
  return await Product.find({ user: userId });
};

// =========================
// GET PRODUCT BY ID (USER SCOPED)
// =========================
exports.getProductById = async (id, userId) => {
  const product = await Product.findOne({
    _id: id,
    user: userId
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// =========================
// UPDATE PRODUCT (USER SCOPED)
// =========================
exports.updateProduct = async (id, data, userId) => {
  const product = await Product.findOneAndUpdate(
    {
      _id: id,
      user: userId
    },
    data,
    { new: true }
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// =========================
// DELETE PRODUCT (USER SCOPED)
// =========================
exports.deleteProduct = async (id, userId) => {
  const product = await Product.findOneAndDelete({
    _id: id,
    user: userId
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};
