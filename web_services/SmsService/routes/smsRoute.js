const express = require('express');
const router = express.Router();
const { sendSMS } = require('../controllers/smsController');

//routing for the send sms endpoint
router.post('/', sendSMS);

module.exports = router;
