const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    FullName :String,
    Email:String,
    Role:String,
    Password:String,
    Blocked:Boolean,
    Reason:String,  
    NormalFees :Number,
    EmergencyFees:Number,
    AvailableDays:[String],
    AvailableTimeStart:String,
    AvailableTimeEnd:String,
},{timestamps:true})
const model = mongoose.model("Doctor" , userSchema);
module.exports = model;

