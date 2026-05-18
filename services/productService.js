const Product = require("../models/Product");

// =========================
// CREATE PRODUCT
// =========================
exports.createProduct = async (data, userId, businessId) => {
return await Product.create({
  ...data,
  user: userId,
  business: businessId,
})
};

// =========================
// GET ALL PRODUCTS
// =========================
exports.getAllProducts = async (businessId) => {
  return await Product.find({
    business: businessId,
  });
};

// =========================
// GET SINGLE PRODUCT
// =========================
exports.getProductById = async (id, businessId) => {
  const product = await Product.findOne({
    _id: id,
    business: businessId,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// =========================
// UPDATE PRODUCT
// =========================
exports.updateProduct = async (id, data, businessId) => {
  const product = await Product.findOneAndUpdate(
    {
      _id: id,
      business: businessId,
    },
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

// =========================
// DELETE PRODUCT
// =========================
exports.deleteProduct = async (id, businessId) => {
  const product = await Product.findOneAndDelete({
    _id: id,
    business: businessId,
  });

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};
