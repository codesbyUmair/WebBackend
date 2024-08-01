const Doctor = require('../model/User.schema');
const Appointment = require('../model/Appointment.schema');
const Medicine = require('../model/Medicine.schema'); 

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ role: 'doctor' });
    res.status(200).json({ doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const requestAppointment = async (req, res) => {
  try {
    const { Date, Time, DoctorID, PatientID } = req.body;
    console.log(PatientID)
    console.log(DoctorID)
    const doctor = await Doctor.findById(DoctorID);
    const patient = await Doctor.findById(PatientID);

    const appointment = new Appointment({
      Date,
      Time,
      DoctorID,
      PatientID,
      DoctorName: doctor.name,
      PatientName: patient.name,
      ApproveStatus: false,
      Status: 'Incomplete',
    });

    const savedAppointment = await appointment.save();

    res.status(201).json({ appointment: savedAppointment });
  } catch (error) {
    console.error('Error requesting appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllMedicines = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const medicines = await Medicine.find({ PatientID: patientId });
    res.status(200).json({ medicines });
  } catch (error) {
    console.error('Error fetching medicines:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllDoctors,
  requestAppointment,
  getAllMedicines,
};
