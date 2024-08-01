const user = require('../model/User.schema');
const Appointment = require('../model/Appointment.schema');

const addDoctor = async (req, res) => {
  try {
  const { name, email, password, role,specialist, availableDays, availableTimeStart, availableTimeEnd, Fees } = req.body;
    const existingDoctor = await user.findOne({ email });

    if (existingDoctor) {
      return res.status(400).json({ message: 'Doctor already exists with this email' });
    }

    const createdDoctor = await user.create({
      name,
      email,
      password,
      role,
      specialist,
      availableDays,
      availableTimeStart,
      availableTimeEnd,
      Fees,
    });

    res.status(201).json(createdDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateDoctor = async (req, res) => {
  const doctorId = req.params.id;
  const { name, email, password, role,specialist, availableDays, availableTimeStart, availableTimeEnd , Fees } = req.body;
  try {
    const updatedDoctor = await user.findByIdAndUpdate(doctorId, {
      name,
      email,
      password,
      role,
      specialist,
      availableDays,
      availableTimeStart,
      availableTimeEnd,
      Fees,
    }, { new: true });

    if (!updatedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteDoctor = async (req, res) => {
  const doctorId = req.params.id;

  try {
    const deletedDoctor = await user.findByIdAndDelete(doctorId);

    if (!deletedDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllDoctor = async (req, res) => {
  try {
    const doctors = await user.find({ role: 'doctor' });

    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateAppointmentStatus = async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, {
      ApproveStatus: true,
    }, { new: true });

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteAppointmentById = async (req, res) => {
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
const updateAppointmentById = async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const { newDate, newTime} = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        Date: newDate,
        Time: newTime,
      },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { 
  addDoctor, 
  updateDoctor, 
  deleteDoctor, 
  getAllDoctor, 
  getAllAppointments, 
  updateAppointmentStatus, 
  deleteAppointmentById,
  updateAppointmentById,
};