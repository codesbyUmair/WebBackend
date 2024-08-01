const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    Frequency:String, 
    AppointmentID:String,
    Medicinename:String,
    Description:String,
    Testname:String,
    Noofdays:Number,
    DoctorName : String, 
    PatientName: String,
    DoctorID: String,
    PatientID: String,
},{timestamps:true})
const model = mongoose.model("Medicine" , userSchema);
module.exports = model;
