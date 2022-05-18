const express = require("express");
const router = express.Router();

const { createTicket } = require("../controllers/Tickets");

router.post("/", createTicket); // return a QR code using data object

module.exports = router;
