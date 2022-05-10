const express = require("express");
const router = express.Router();
var nodemailer = require("nodemailer");

const { sendEmail } = require("../controllers/Email");

router.post("/", sendEmail);

module.exports = router;
