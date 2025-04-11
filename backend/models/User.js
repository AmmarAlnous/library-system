const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  preferredLanguage: {
    type: String,
    default: 'ar'
  },
  resetToken: String,
  resetTokenExpires: Date
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;