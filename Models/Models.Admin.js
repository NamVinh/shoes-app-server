const mongoose = require("mongoose");
const Admin = new mongoose.Schema({
  fullname: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
});

module.exports = mongoose.model("Admin", Admin);