const express = require("express");
const router = express.Router();

const { sendEmail } = require("../controllers/Email");

router.post("/", sendEmail);

module.exports = router;
