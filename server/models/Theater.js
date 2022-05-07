const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Theater = new Schema({
  theaterID: {
    type: String,
  },
  theaterName: {
    type: String,
    require: true,
  },
  // show:[{
  //   MovieID:{type : mongoose.Schema.Types.ObjectId, ref:'Movie'},
  //   ShowDate:{type:String},
  //   ShowTime:{type:String},
  // }],
  seatPrice: {
    type: Number,
  },
  location: {
    type: String,
  },
});
const theater = mongoose.model("Theater", Theater);

module.exports = theater;
