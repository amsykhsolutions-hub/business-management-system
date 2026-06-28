const User = require("../models/User");

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
   

module.exports = {
  getProfile,
  updateProfile
};

