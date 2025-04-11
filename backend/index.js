// 📦 استدعاء الحزم الأساسية
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// 📁 استدعاء ملفات المسارات
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

// 🚀 إنشاء تطبيق Express
const app = express();

// 🛡️ إعدادات الـ Middleware
app.use(cors());
app.use(express.json());

// 🧭 ربط المسارات
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// 🛠️ مسار تجريبي لاختبار السيرفر
app.get('/', (req, res) => {
  res.status(200).send('📚 Library system backend is running!');
});

// 🧬 الاتصال بقاعدة بيانات MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });