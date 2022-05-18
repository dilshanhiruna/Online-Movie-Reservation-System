const express = require("express");
const router = express.Router();

const {
  getReservations,
  getReservation,
  addReservation,
  getCustomerReservations,
} = require("../controllers/Reservations");

router.post("/", addReservation); //create a reservation
router.get("/", getReservations); //get all reservations
router.get("/tickets/:id", getReservation); // get a single reservation
router.get("/customer/:id", getCustomerReservations); // get all reservations belong to a customer

module.exports = router;
