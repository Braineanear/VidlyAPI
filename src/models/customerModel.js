const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    minlength: 5,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    minlength: 11,
    maxlength: 15,
    required: [true, 'Please tell us you phone number']
  }
});

module.exports = mongoose.model('Customer', customerSchema);
