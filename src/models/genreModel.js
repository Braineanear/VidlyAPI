import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the genre name!'],
    minlength: 5,
    maxlength: 50,
    unique: true
  }
});

export default mongoose.model('Genre', genreSchema);
