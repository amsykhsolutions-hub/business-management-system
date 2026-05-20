const productService = require("../services/productService");

// =========================
// CREATE PRODUCT
// =========================
exports.createProduct = async (req, res) => {
  try {
    const businessId = req.user.business._id;

    const product = await productService.createProduct(
      req.body,
      req.user.id,
      businessId
    );

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// GET ALL PRODUCTS
// =========================
exports.getAllProducts = async (req, res) => {
  try {
    const businessId = req.user.business._id;

const products = await productService.getAllProducts(
  businessId,
  req.query
);
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// GET SINGLE PRODUCT
// =========================
exports.getSingleProduct = async (req, res) => {
  try {
    const businessId = req.user.business._id;

    const product = await productService.getProductById(
      req.params.id,
      businessId
    );

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// UPDATE PRODUCT
// =========================
exports.updateProduct = async (req, res) => {
  try {
    const businessId = req.user.business._id;

    const product = await productService.updateProduct(
      req.params.id,
      req.body,
      businessId
    );

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================
// DELETE PRODUCT
// =========================
exports.deleteProduct = async (req, res) => {
  try {
    const businessId = req.user.business._id;

    await productService.deleteProduct(
      req.params.id,
      businessId
    );

    return res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
