const Product = require("../models/Product");

// CREATE
exports.createProduct = async (data, userId) => {
  return await Product.create({
    ...data,
    createdBy: userId,
  });
};

// GET ALL
exports.getAllProducts = async () => {
  return await Product.find();
};
exports.getProductById = async (id) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};
