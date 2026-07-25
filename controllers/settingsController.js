const User = require("../models/User");
const settingsService = require("../services/settingsService");
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
  .select("-password")
  .populate("business");
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
res.json(user);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name },
      { new: true }
    ).select("-password");

    res.json({
      message: "Profile updated successfully",
      user
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

const updateTheme = async (req, res) => {
  try {
    const { theme } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { theme },
      { new: true }
    ).select("-password");

    res.json({
      message: "Theme updated successfully",
      user
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
const updatePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword
    } = req.body;

    const result = await settingsService.updatePassword(
      req.user._id,
      currentPassword,
      newPassword,
      confirmPassword
    );

    res.json(result);

  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};
module.exports = {
  getProfile,
  updateProfile,
updateTheme,
updatePassword};

