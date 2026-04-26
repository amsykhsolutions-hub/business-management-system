const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// CREATE PRODUCT (admin)
router.post("/", protect, role(["admin"]), productController.createProduct);

// GET ALL PRODUCTS
router.get("/", productController.getAllProducts);

// GET SINGLE PRODUCT
router.get("/:id", productController.getProduct);

// UPDATE PRODUCT
router.put("/:id", protect, role(["admin"]), productController.updateProduct);

// DELETE PRODUCT
router.delete("/:id", protect, role(["admin"]), productController.deleteProduct);

module.exports = router;
