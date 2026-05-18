const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");
const authService = require("../services/authService");
// ============================
// REGISTER
// ============================
router.post("/register", authController.registerUser);

// ============================
// LOGIN
// ============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const result = await authService.loginUser(email, password);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: result.user,
      token: result.token
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
});

// ============================
// GET CURRENT USER (/me)
// ============================
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
