const express = require('express');
const router = express.Router();
const { getDoctorAppointments, cancelAppointment, Checkup  } = require('../controllers/DoctorController');

router.post('/appointments', getDoctorAppointments);
router.delete('/delete/:id', cancelAppointment);
router.post('/addCheckup', Checkup); 

module.exports = router;