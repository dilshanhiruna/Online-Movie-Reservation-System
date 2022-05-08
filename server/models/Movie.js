const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  movieID: {
    type: String,
    required: [true, 'Please add an ID'],
    unique: [true, 'Please enter an unique ID'],
  },

  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },

  description: {
    type: String,
    required: [true, 'Please add a description'],
    trim: true,
  },

  cast: {
    type: [String],
    trim: true,
  },

  banner: {
    type: String,
    default: 'no-photo.jpg',
  },
});

module.exports = mongoose.model('Movie', MovieSchema);
