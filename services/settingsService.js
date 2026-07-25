const User = require("../models/User");
const {
  comparePassword,
  hashPassword
} = require("../utils/password");

const updatePassword = async (
  userId,
  currentPassword,
  newPassword,
  confirmPassword
) => {

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await comparePassword(
    currentPassword,
    user.password
  );

  if (!isMatch) {
    throw new Error("Current password is incorrect");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  user.password = await hashPassword(newPassword);

  await user.save();

  return {
    message: "Password updated successfully"
  };
};

module.exports = {
  updatePassword
};
