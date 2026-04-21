const mongoose = require("mongoose");const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// connect database (ONLY HERE)
connectDB();

// routes
app.use("/api/auth", require("./routes/authRoutes"));

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});
const PORT = process.env.PORT || 5000;
mongoose.connection.on("connected", () => {
  console.log("🔥 REAL DB:", mongoose.connection.name);
});
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
