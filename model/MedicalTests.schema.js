const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    AppointmentID:String,
    Testname:String,
    Description:String,
},{timestamps:true})
const model = mongoose.model("MedicalTest" , userSchema);
module.exports = model;
