const productService = require("../services/productService");
const { sendSuccess, sendError } = require("../utils/response");

// CREATE
exports.createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body, req.user.id);
    sendSuccess(res, product, "Product created");
  } catch (err) {
    sendError(res, err.message);
  }
};

// GET ALL
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    sendSuccess(res, products);
  } catch (err) {
    sendError(res, err.message);
  }
};
