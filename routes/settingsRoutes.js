const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {
  getProfile,
  updateProfile,
  updateTheme,updatePassword
} = require("../controllers/settingsController");
router.put(
  "/theme",
  authMiddleware,
  updateTheme
);
router.put(
  "/password",
  authMiddleware,
  updatePassword
);
router.get("/profile", authMiddleware, getProfile);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);
module.exports = router;
