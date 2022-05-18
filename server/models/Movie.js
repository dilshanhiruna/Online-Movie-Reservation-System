const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  // movieID: {
  //   type: String,
  //   required: [true, 'Please add an ID'],
  // },

  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: [true, 'Please enter an unique ID'],

    trim: true,
  },

  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true,
  },

  cast: {
    type: String,
    trim: true,
  },

  banner: {
    type: String,
    default: 'no-photo.jpg',
    required: [true, 'Please add an image'],
  },

  theaters: {
    type: [String],
    ref: 'Theater',
    trim: true,
  },

  showTime: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Movie', MovieSchema);
