const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');

// 📌 تسجيل طالب جديد (مع الحفظ في قاعدة البيانات)
router.post('/register', async (req, res) => {
  const { name, studentId, email, password, preferredLanguage } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ studentId }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'رقم الطالب أو البريد مستخدم بالفعل' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
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

// 🔁 نسيت كلمة المرور - توليد رمز مؤقت
router.post('/forgot-password', async (req, res) => {
  const { studentId } = req.body;
  if (!studentId) return res.status(400).json({ error: 'يرجى إدخال رقم الطالب' });
  try {
    const user = await User.findOne({ studentId });
    if (!user) return res.status(404).json({ error: 'الطالب غير موجود' });
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000);
    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();
    const resetLink = `http://localhost:4000/api/auth/reset-password/${resetToken}`;
    return res.status(200).json({
      message: '✅ تم العثور على الطالب، رابط إعادة التعيين جاهز',
      resetLink
    });
  } catch (err) {
    res.status(500).json({ error: 'حدث خطأ أثناء إنشاء رمز إعادة التعيين' });
  }
});

// 🔐 إعادة تعيين كلمة المرور عبر التوكن
router.post('/reset-password/:token', async (req, res) => {
  const resetToken = req.params.token;
  const { newPassword } = req.body;
  if (!newPassword) return res.status(400).json({ error: 'يرجى إدخال كلمة مرور جديدة' });
  try {
    const user = await User.findOne({
      resetToken,
      resetTokenExpires: { $gt: Date.now() }
    });
    if (!user) return res.status(400).json({ error: 'رمز غير صالح أو منتهي' });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();
    res.status(200).json({ message: '✅ تم تحديث كلمة المرور بنجاح' });
  } catch (err) {
    res.status(500).json({ error: 'حدث خطأ أثناء تحديث كلمة المرور' });
  }
});

module.exports = router;