const { sendSuccess, sendError } = require("../utils/response");
const authService = require("../services/authService");
const Business = require("../models/Business");

console.log(Business);

// REGISTER CONTROLLER
exports.registerUser = async (req, res) => {
  console.log("REGISTER CONTROLLER HIT");

  try {
    const { name, email, password } = req.body;

    // ✅ FIRST: create user
    const user = await authService.registerUser(name, email, password);

    // ✅ THEN: create business
    console.log("About to create business");

    const business = await Business.create({
      name: "My Business",
      owner: user._id,
    });

    // ✅ attach business to user
    user.business = business._id;
    await user.save();

    console.log("Business created successfully");

    return sendSuccess(
      res,
      {
        user,
        business,
      },
      "User registered successfully"
    );

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
