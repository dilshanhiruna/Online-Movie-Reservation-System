const express = require("express");
const router = express.Router();

const { checkPayment } = require("../controllers/Payment");

router.post("/", checkPayment); // validate card and payment

module.exports = router;
