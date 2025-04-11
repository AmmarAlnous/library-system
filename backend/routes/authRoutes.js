const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const generateCode = require('../utils/generateCode');
const sendEmail = require('../utils/mailer'); // جديد لإرسال الإيميل
const verifyTokenAndAdmin = require('../middlewares/verifyTokenAndAdmin');

// 📌 تسجيل طالب جديد
router.post('/register', async (req, res) => {
  const { name, studentId, email, password, preferredLanguage } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ studentId }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'رقم الطالب أو البريد مستخدم بالفعل' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      studentId,
      email,
      password: hashedPassword,
      preferredLanguage
    });
    await newUser.save();
    res.status(201).json({ message: 'تم إنشاء الحساب بنجاح' });
  } catch (err) {
    res.status(500).json({ error: 'حدث خطأ أثناء إنشاء الحساب' });
  }
});

// 🔐 تسجيل الدخول
router.post('/login', async (req, res) => {
  const { studentId, password } = req.body;
  try {
    const user = await User.findOne({ studentId });
    if (!user) return res.status(401).json({ error: 'رقم الطالب غير موجود' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'كلمة المرور خاطئة' });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });

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
    res.status(500).json({ error: 'حدث خطأ أثناء تسجيل الدخول' });
  }
});

// 🔁 نسيت كلمة المرور - إرسال رمز تحقق عبر البريد
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'يرجى إدخال البريد الإلكتروني' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'لا يوجد مستخدم مرتبط بهذا البريد' });

    const code = generateCode(6);
    const expires = new Date(Date.now() + 2 * 60 * 1000); // صلاحية: دقيقتان فقط

    user.resetToken = code;
    user.resetTokenExpires = expires;
    await user.save();

    await sendEmail(user.email, 'رمز التحقق لإعادة تعيين كلمة المرور', `رمز التحقق الخاص بك هو: ${code}`);

    res.status(200).json({ message: '✅ تم إرسال رمز التحقق إلى البريد الإلكتروني' });

  } catch (err) {
    console.error('❌ Forgot-password error:', err.message);
    res.status(500).json({ error: 'حدث خطأ أثناء إرسال رمز التحقق' });
  }
});

// 🔐 إعادة تعيين كلمة المرور بعد التحقق
router.post('/reset-password', async (req, res) => {
  const { email, code, newPassword } = req.body;

  if (!email || !code || !newPassword) {
    return res.status(400).json({ error: 'يرجى إدخال كافة البيانات المطلوبة' });
  }

  try {
    const user = await User.findOne({
      email,
      resetToken: code,
      resetTokenExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ error: 'رمز غير صالح أو منتهي' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: '✅ تم تحديث كلمة المرور بنجاح' });

  } catch (err) {
    console.error('❌ Reset-password error:', err.message);
    res.status(500).json({ error: 'حدث خطأ أثناء تحديث كلمة المرور' });
  }
});
// ✅ تغيير كلمة المرور من قبل الأدمن باستخدام PATCH

router.patch('/admin-reset-password', verifyTokenAndAdmin, async (req, res) => {
  const { studentId, newPassword } = req.body;

  if (!studentId || !newPassword) {
    return res.status(400).json({ error: 'يرجى إدخال رقم الطالب وكلمة المرور الجديدة' });
  }

  try {
    const user = await User.findOne({ studentId });

    if (!user) {
      return res.status(404).json({ error: 'الطالب غير موجود' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: '✅ تم تحديث كلمة المرور بنجاح من قبل الأدمن' });

  } catch (err) {
    console.error('❌ Admin reset-password error:', err.message);
    res.status(500).json({ error: 'حدث خطأ أثناء التحديث من قبل الأدمن' });
  }
});
module.exports = router;