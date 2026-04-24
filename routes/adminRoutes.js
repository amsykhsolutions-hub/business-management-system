const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// ADMIN ONLY TEST
router.get("/test", auth, role(["admin"]), (req, res) => {
  res.json({
    success: true,
    message: "Admin access granted"
  });
});

module.exports = router;
