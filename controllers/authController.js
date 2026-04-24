const { sendSuccess, sendError } = require("../utils/response");
const authService = require("../services/authService");

// REGISTER CONTROLLER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await authService.registerUser(name, email, password);

    return sendSuccess(res, user, "User registered successfully");

  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

// LOGIN CONTROLLER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    return sendSuccess(res, result, "Login successful");

  } catch (error) {
    return sendError(res, error.message, 401);
  }
};
