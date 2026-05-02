const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// CREATE PRODUCT (admin only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  productController.createProduct
);

// GET ALL PRODUCTS
router.get("/", authMiddleware, productController.getAllProducts);

// GET SINGLE PRODUCT
router.get("/:id", productController.getSingleProduct);

// UPDATE PRODUCT (admin)
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  productController.updateProduct
);

// DELETE PRODUCT (admin)
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  productController.deleteProduct
);

module.exports = router;
