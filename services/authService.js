const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/password");
const jwt = require("jsonwebtoken");

// REGISTER SERVICE
const registerUser = async (name, email, password) => {
    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    return user;
};

// LOGIN SERVICE
const loginUser = async (email, password) => {
    // find user
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid credentials");
    }

    // check password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    // generate token
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return {
        user,
        token
    };
};

module.exports = {
    registerUser,
    loginUser
};
