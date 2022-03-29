const mongoose = require("mongoose");
//const { stringify } = require("querystring");

const hotelSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const roomModel = mongoose.model("hotels", hotelSchema);

module.exports = roomModel;
