import mongoose from 'mongoose';

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
  year: {
    type: Number,
    min: 1800,
    max: 3000,
    required: [true, 'Please enter the year of the movie.']
  },
  directors: [
    {
      type: String,
      minlength: 5,
      maxlength: 100
    }
  ],
  writers: [
    {
      type: String,
      minlength: 5,
      maxlength: 100
    }
  ],
  cast: [
    {
      type: String,
      minlength: 5,
      maxlength: 100
    }
  ],
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

export default mongoose.model('Movie', movieSchema);
