const mongoose = require('mongoose');

const readingSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // مرجع إلى مستخدم
    ref: 'User',
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId, // مرجع إلى كتاب
    ref: 'Book',
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now // يبدأ تلقائيًا من الآن
  },
  endTime: {
    type: Date // يمكن تحديثه لاحقًا عند نهاية الجلسة
  },
  remainingTime: {
    type: Number, // بالدقائق مثلًا
    default: 60 // مثلاً: كل طالب له 60 دقيقة افتراضيًا
  }
}, {
  timestamps: true
});

const ReadingSession = mongoose.model('ReadingSession', readingSessionSchema);
module.exports = ReadingSession;