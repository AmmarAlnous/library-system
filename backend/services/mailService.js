const nodemailer = require('nodemailer');

// 📧 دالة لإرسال بريد إلكتروني
async function sendResetCodeEmail(to, code) {
  try {
    // إعداد المرسل (Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME, // بريد المرسل
        pass: process.env.EMAIL_PASSWORD  // كلمة مرور التطبيق
      }
    });

    // محتوى الرسالة
    const mailOptions = {
      from: `"Library System" <${process.env.EMAIL_USERNAME}>`,
      to,
      subject: 'إعادة تعيين كلمة المرور',
      html: `
        <h2>رمز التحقق لإعادة تعيين كلمة المرور</h2>
        <p>رمز التحقق الخاص بك هو:</p>
        <h1 style="color:blue;">${code}</h1>
        <p>هذا الرمز صالح لمدة 15 دقيقة فقط.</p>
      `
    };

    // إرسال الرسالة
    await transporter.sendMail(mailOptions);
    console.log('📧 تم إرسال الرمز إلى البريد الإلكتروني:', to);

  } catch (error) {
    console.error('❌ فشل في إرسال البريد الإلكتروني:', error.message);
    throw new Error('تعذر إرسال البريد الإلكتروني');
  }
}

module.exports = sendResetCodeEmail;