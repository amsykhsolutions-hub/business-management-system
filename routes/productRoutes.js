const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// CREATE PRODUCT (admin only)
router.post("/", protect, role(["admin"]), productController.createProduct);

// GET ALL PRODUCTS
router.get("/", productController.getProducts);

module.exports = router;
