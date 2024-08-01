const express = require('express');
const router = express.Router();
const {verify} = require("../utils")
const { getAllDoctors, requestAppointment,getAllMedicines } = require('../controllers/PatientController');

router.get('/doctors', getAllDoctors);
router.post('/request-appointment', verify, requestAppointment);
router.get('/medicines/:patientId', verify, getAllMedicines);

module.exports = router;
