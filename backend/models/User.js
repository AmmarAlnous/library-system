const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // الاسم إلزامي
    trim: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true // رقم الطالب يجب أن يكون مميز
  },
  email: {
    type: String,
    required: true,
    unique: true // الإيميل مميز أيضًا
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'admin'], // دور المستخدم
    default: 'student'
  },
  preferredLanguage: {
    type: String,
    default: 'ar' // اللغة المفضلة، مثل: 'ar' أو 'en'
  }
}, {
  timestamps: true // تاريخ الإنشاء والتعديل تلقائيًا
});

const User = mongoose.model('User', userSchema);
module.exports = User;