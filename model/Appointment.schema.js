const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  Date: String,
  Time: String,
  DoctorName : String, 
  PatientName: String,
  DoctorID: String,
  PatientID: String,
  ApproveStatus: Boolean,
  Status: String, 
  
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
