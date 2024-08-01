const { 
    addDoctor, 
    updateDoctor, 
    deleteDoctor, 
    getAllDoctor, 
    getAllAppointments, 
    updateAppointmentStatus, 
    deleteAppointmentById,
    updateAppointmentById, // Add the new function
  } = require('../controllers/RecipientController');
  const express = require('express');
  const router = express.Router();
  
  router.post("/add", addDoctor);
  router.put("/update/:id", updateDoctor);
  router.delete("/delete/:id", deleteDoctor);
  router.get("/getAll", getAllDoctor);
  router.get("/getAllAppointments", getAllAppointments);
  router.put("/updateAppointmentStatus/:id", updateAppointmentStatus);
  router.delete("/deleteAppointment/:id", deleteAppointmentById);
  router.put("/updateAppointment/:id", updateAppointmentById); 
  
  module.exports = router;