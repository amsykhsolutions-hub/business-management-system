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
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
