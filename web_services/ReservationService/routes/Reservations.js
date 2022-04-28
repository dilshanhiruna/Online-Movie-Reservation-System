const express = require("express");
const router = express.Router();

const {
  getReservations,
  getReservation,
  addReservation,
} = require("../models/Reservation");

router.get("/", getReservations);
router.get("/:id", getReservation);
router.post("/", addReservation);
