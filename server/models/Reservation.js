const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Reservations = new Schema({
  customerID: {
    type: String,
    require: true,
  },
  movieID: {
    type: String,
  },
  movieName: {
    type: String,
  },
  theaterID: {
    type: String,
  },
  theaterName: {
    type: String,
  },
  noOfTickets: {
    type: Number,
  },
  date: {
    type: Date,
  },
  timeSlot: {
    type: String,
  },
  paymentType: {
    type: String,
  },
  totalPrice: {
    type: Number,
  },
  status: {
    type: String,
  },
  reservedDate: {
    type: Date,
    require: true,
  },
  tickets: {
    type: Array,
  },
});
const reservations = mongoose.model("Reservations", Reservations);

module.exports = reservations;
