const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Theater = new  Schema({
    theaterID: {
        type: String,
        require: true,
      },
      theaterName: {
        type: String,
        require: true,
      },
      showDates: {
        type: String,
        //monday..
      },
      showTime: {
        type: String,
      },
      theaterArea:{
        type: String,
      },
});
const theater = mongoose.model("Theater", Theater);

module.exports = theater;