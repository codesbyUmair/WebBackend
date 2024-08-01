const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  role: String, 
  password: String,
  specialist:String,
  blocked: Boolean, 
  reason: String, 
  availableDays:String,
  availableTimeStart:String,
  availableTimeEnd:String,
  Fees: Number,
}, { timestamps: true });

const model = mongoose.model("User", userSchema);
module.exports = model;
