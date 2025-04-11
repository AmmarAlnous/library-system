// 📦 استدعاء الحزم الأساسية
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// 📁 استدعاء المسارات
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

// 🚀 إنشاء تطبيق Express
const app = express();

// 🛡️ إعداد الميدلوير
app.use(cors());                 // السماح بالوصول من الواجهة الأمامية
app.use(express.json());        // قراءة body بصيغة JSON

// 🧭 ربط المسارات
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// 🔄 مسار تجريبي لاختبار السيرفر
app.get('/', (req, res) => {
  res.status(200).send('📚 Library system backend is running!');
});

// 🔌 الاتصال بقاعدة بيانات MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    // 📡 تشغيل السيرفر
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });