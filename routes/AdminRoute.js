const {addRecipient} = require('../controllers/AdminController');
const express = require('express');
const router = express.Router();

router.post("/add", addRecipient);

module.exports = router;
