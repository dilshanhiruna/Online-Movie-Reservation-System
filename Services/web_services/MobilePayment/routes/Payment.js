const express = require("express");
const router = express.Router();

const { checkPayment } = require("../controllers/Payment");

router.post("/", checkPayment); // validate payment and mobile number

module.exports = router;
