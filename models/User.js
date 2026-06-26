const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
business: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Business"
},
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
theme: {
    type: String,
    enum: ["light", "dark"],
    default: "light"
  }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
