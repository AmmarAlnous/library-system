// استدعاء الحزم الأساسية
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const bookRoutes = require('./routes/bookRoutes');


// إنشاء تطبيق Express
const app = express();

// إعدادات الـ Middleware
app.use(cors()); // يسمح للواجهة الأمامية بالاتصال
app.use(express.json()); // لفهم البيانات بصيغة JSON
app.use('/api/books', bookRoutes);


// الاتصال بقاعدة البيانات MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// مسار تجريبي للتأكد من أن السيرفر يعمل
app.get('/', (req, res) => {
  res.status(200).send('📚 Library system backend is running!');
});

// تشغيل السيرفر على المنفذ 3000 أو من .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
