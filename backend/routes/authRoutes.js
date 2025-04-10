const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 📌 تسجيل طالب جديد (مع الحفظ في قاعدة البيانات)
router.post('/register', async (req, res) => {
  const { name, studentId, email, password, preferredLanguage } = req.body;

  console.log('📥 تم استقبال البيانات من العميل');

  try {
    // التحقق من وجود الطالب مسبقًا
    const existingUser = await User.findOne({
      $or: [{ studentId }, { email }]
    });

    if (existingUser) {
      console.log('⚠️ الطالب أو البريد موجود مسبقًا');
      return res.status(400).json({ error: 'رقم الطالب أو البريد مستخدم بالفعل' });
    }

    // تشفير كلمة المرور
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('🔐 تم تشفير كلمة المرور');

    // إنشاء المستخدم الجديد
    const newUser = new User({
      name,
      studentId,
      email,
      password: hashedPassword,
      preferredLanguage
    });

    await newUser.save();
    console.log('✅ تم حفظ الطالب في قاعدة البيانات');

    res.status(201).json({ message: 'تم إنشاء الحساب بنجاح' });

  } catch (err) {
    console.error('❌ Register error:', err.message);
    res.status(500).json({ error: 'حدث خطأ أثناء إنشاء الحساب' });
  }
});

// 🔐 تسجيل الدخول
router.post('/login', async (req, res) => {
  const { studentId, password } = req.body;

  try {
    const user = await User.findOne({ studentId });
    if (!user) {
      return res.status(401).json({ error: 'رقم الطالب غير موجود' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'كلمة المرور خاطئة' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: 'تم تسجيل الدخول بنجاح',
      token,
      user: {
        name: user.name,
        studentId: user.studentId,
        role: user.role,
        preferredLanguage: user.preferredLanguage
      }
    });

  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ error: 'حدث خطأ أثناء تسجيل الدخول' });
  }
});

module.exports = router;