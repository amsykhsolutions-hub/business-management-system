const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

// =========================
// CREATE PRODUCT
// =========================
router.post(
  "/",
  authMiddleware,
  productController.createProduct
);

// =========================
// GET ALL PRODUCTS
// =========================
router.get(
  "/",
  authMiddleware,
  productController.getAllProducts
);

// =========================
// GET SINGLE PRODUCT
// =========================
router.get(
  "/:id",
  authMiddleware,
  productController.getSingleProduct
);

// =========================
// UPDATE PRODUCT
// =========================
router.put(
  "/:id",
  authMiddleware,
  productController.updateProduct
);

// =========================
// DELETE PRODUCT
// =========================
router.delete(
  "/:id",
  authMiddleware,
  productController.deleteProduct
);

module.exports = router;
