const Medicine = require("../model/Medicine.schema");
const Appointment = require("../model/Appointment.schema");

const getDoctorAppointments = async (req, res) => {
  try {
    const { DoctorID } = req.body;

    if (!DoctorID) {
      throw new Error('Doctor information not available');
    }

    let appointments = await Appointment.find({ DoctorID: DoctorID });

    appointments = appointments.filter(
      (a) => a.ApproveStatus === true && a.Status === 'Incomplete'
    );

    res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    res.status(500).json({ error:` Internal Server Error: ${error.message}` });
  }
};

const cancelAppointment = async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const Checkup = async (req, res) => {
  const { Frequency, AppointmentID, Medicinename, Description, Testname, Noofdays, DoctorID, PatientID, DoctorName, PatientName } = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      AppointmentID,
      { Status: 'Completed' },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const newMedicine = new Medicine({
      Frequency,
      AppointmentID,
      Medicinename,
      Description,
      Testname,
      Noofdays,
      DoctorID,
      PatientID,
      DoctorName,
      PatientName,
    });

    await newMedicine.save();

    res.status(200).json({ message: 'Checkup added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




module.exports = {
  getDoctorAppointments,
  cancelAppointment,
  Checkup
};