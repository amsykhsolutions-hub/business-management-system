const productService = require("../services/productService");
const { sendSuccess, sendError } = require("../utils/response");

// CREATE PRODUCT (ADMIN ONLY)
exports.createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return sendError(res, "Name and price are required");
    }

    if (price <= 0) {
      return sendError(res, "Price must be greater than 0");
    }

    const product = await productService.createProduct(req.body, req.user.id);
    sendSuccess(res, product, "Product created");
  } catch (err) {
    sendError(res, err.message);
  }
};

// GET ALL PRODUCTS (PUBLIC)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    sendSuccess(res, products);
  } catch (err) {
    sendError(res, err.message);
  }
};

// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    sendSuccess(res, product);
  } catch (err) {
    sendError(res, err.message);
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.body
    );

    sendSuccess(res, product, "Product updated");
  } catch (err) {
    sendError(res, err.message);
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    sendSuccess(res, product, "Product deleted");
  } catch (err) {
    sendError(res, err.message);
  }
};
