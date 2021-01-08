const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please Enter the Movie Title'],
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  genre: {
    type: mongoose.Schema.ObjectId,
    ref: 'Genre',
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
});

module.exports = mongoose.model('Movie', movieSchema);
