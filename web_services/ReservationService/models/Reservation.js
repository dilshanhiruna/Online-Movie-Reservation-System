const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Reservations = new Schema({
  userID: {
    type: String,
    require: true,
  },
  qrcode: {
    type: String,
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
  status: {
    type: String,
  },
  reservedDate: {
    type: Date,
    require: true,
  },
});
const reservations = mongoose.model("Reservations", Reservations);

module.exports = reservations;
