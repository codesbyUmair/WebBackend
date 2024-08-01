const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    Title:String,
    Amount:String,
    Description:String,
},{timestamps:true})
const model = mongoose.model("Expenses" , userSchema);
module.exports = model;
