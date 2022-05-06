const express = require("express");
const router = express.Router();

const { createTicket } = require("../controllers/Tickets");

router.post("/", createTicket);

module.exports = router;
