// utils/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // بريد المشروع
    pass: process.env.EMAIL_PASS  // كلمة مرور التطبيقات (App Password)
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: `"📚 Library System" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text
    });

    console.log(`📨 تم إرسال البريد إلى: ${to}`);
    console.log(`📬 معلومات الإرسال: ${info.messageId}`);
  } catch (error) {
    console.error('❌ فشل إرسال البريد:', error.message);
    throw new Error('فشل إرسال البريد الإلكتروني');
  }
};

module.exports = sendEmail;