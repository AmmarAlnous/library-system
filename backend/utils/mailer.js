// utils/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // بريد المشروع
    pass: process.env.EMAIL_PASS  // كلمة مرور التطبيقات
  }
});

const sendEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: `"📚 Library System" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text
  });
};

module.exports = sendEmail;