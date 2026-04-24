const authService = require("../services/authService");

// REGISTER CONTROLLER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await authService.registerUser(name, email, password);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// LOGIN CONTROLLER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

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
};
