const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// مسار تسجيل الدخول
router.post('/login', async (req, res) => {
  const { studentId, password } = req.body;

  try {
    // التحقق من وجود الطالب
    const user = await User.findOne({ studentId });
    if (!user) {
      return res.status(401).json({ error: 'رقم الطالب غير موجود' });
    }

    // التحقق من كلمة المرور
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'كلمة المرور خاطئة' });
    }

    // إنشاء رمز JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' } // صلاحية الرمز
    );

    // إرسال الرمز وبعض بيانات المستخدم
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