const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// ADMIN ONLY TEST
router.get("/test", protect, role(["admin"]), (req, res) => {
  res.json({
    success: true,
    message: "Admin access granted"
  });
});

module.exports = router;
