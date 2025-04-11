const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // 👤 الاسم الكامل
  name: {
    type: String,
    required: true,
    trim: true
  },

  // 🆔 رقم الطالب (يجب أن يكون فريدًا)
  studentId: {
    type: String,
    required: true,
    unique: true
  },

  // 📧 البريد الإلكتروني
  email: {
    type: String,
    required: true,
    unique: true
  },

  // 🔐 كلمة المرور (مشفرة)
  password: {
    type: String,
    required: true
  },

  // 🎭 الدور: طالب أو أدمن
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },

  // 🌐 اللغة المفضلة (عربي / إنجليزي)
  preferredLanguage: {
    type: String,
    enum: ['ar', 'en'],
    default: 'ar'
  },

  // 🧠 إعادة تعيين كلمة المرور
  resetToken: String,               // رمز التحقق
  resetTokenExpires: Date           // تاريخ انتهاء صلاحية الرمز
}, {
  timestamps: true // ⏱️ يحفظ تاريخ الإنشاء والتعديل تلقائيًا
});

module.exports = mongoose.model('User', userSchema);