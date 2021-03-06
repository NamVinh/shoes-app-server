const mongoose = require("mongoose");
const User = new mongoose.Schema({
  avatar: { type:String},
  name: { type: String },
  phone: { type: String },
  gmail: { type: String, unique: true },
  password: { type: String },
});

module.exports = mongoose.model("User", User);