const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  pageNumber: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['highlight', 'note'], // فقط هاتين القيمتين مسموحتين
    required: true
  }
}, {
  timestamps: true
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;