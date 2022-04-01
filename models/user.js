const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, require },
    email: { type: String, require },
    password: { type: String, require },
    status: { type: String, require, default: "visiteur" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
