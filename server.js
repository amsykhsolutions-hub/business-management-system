require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = require("./config/db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB connect (SAFE WRAP)
try {
  connectDB();
} catch (err) {
  console.log("DB connection failed:", err.message);
}

// routes (SAFE LOAD)
try {
  app.use("/api/auth", require("./routes/authRoutes"));
} catch (err) {
  console.log("Auth routes error:", err.message);
}

// test route
app.get("/", (req, res) => {
  res.status(200).send("API is running...");
});

// protected route (SAFE LOAD)
try {
  const authMiddleware = require("./middleware/authMiddleware");

  app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({
      message: "Protected route accessed",
      user: req.user
    });
  });
} catch (err) {
  console.log("Auth middleware error:", err.message);
}

// DB log
mongoose.connection.on("connected", () => {
  console.log("🔥 DB Connected:", mongoose.connection.name);
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
