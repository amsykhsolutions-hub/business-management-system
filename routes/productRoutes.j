const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// PUBLIC
router.get("/", productController.getAllProducts);

// ADMIN ONLY
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  productController.createProduct
);

module.exports = router;
