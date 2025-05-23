const mongoose = require('mongoose');

// Define Student Schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  class: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

// Export Model
module.exports = mongoose.model('Student', studentSchema);
