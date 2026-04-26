const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// ADMIN ONLY TEST
router.get(
  "/test",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    res.json({
      success: true,
      message: "Admin access granted",
    });
  }
);

module.exports = router;
