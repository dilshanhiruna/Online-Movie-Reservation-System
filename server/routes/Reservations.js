const express = require("express");
const router = express.Router();

const {
  getReservations,
  getReservation,
  addReservation,
} = require("../controllers/Reservations");

router.get("/", getReservations);
router.get("/tickets/:id", getReservation);
router.post("/", addReservation);

module.exports = router;
