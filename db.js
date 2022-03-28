const mongoose = require("mongoose");

var mongoURL = "mongodb+srv://clement:clement@hypnos.dhuwd.mongodb.net/Hypnos";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("MongoDB connection failed");
});

connection.on("connected", () => {
  console.log("MongoDB connection successfull");
});

module.exports = mongoose;
