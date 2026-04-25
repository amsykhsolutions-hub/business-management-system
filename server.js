require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = require("./config/db");

const app = express();
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

// middleware
app.use(cors());
app.use(express.json());

// DB connect
connectDB().catch(err => {
  console.log("DB connection failed:", err.message);
});

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
// test route
app.get("/", (req, res) => {
  res.status(200).send("API is running...");
});

// protected route
const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

// DB log
mongoose.connection.on("connected", () => {
  console.log("🔥 DB Connected:", mongoose.connection.name);
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
