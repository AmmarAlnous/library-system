// middleware/verifyTokenAndAdmin.js
const jwt = require('jsonwebtoken');

function verifyTokenAndAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'يجب تسجيل الدخول أولاً' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'غير مصرح لك، هذا المسار مخصص للمشرفين فقط' });
    }

    req.user = decoded; // نضيف بيانات المستخدم للطلب
    next();
  } catch (err) {
    return res.status(401).json({ error: 'رمز التحقق غير صالح' });
  }
}

module.exports = verifyTokenAndAdmin;
// هذا الكود يستخدم للتحقق من صلاحيات المستخدم، حيث يتحقق من وجود توكن JWT صالح، وإذا كان المستخدم هو مشرف (admin).
// إذا كان كل شيء صحيح، يتم تمرير الطلب إلى المسار التالي، وإذا لم يكن كذلك، يتم إرجاع رسالة خطأ مناسبة.
//
// يمكنك استخدام هذا الميدل وير في المسارات التي تتطلب صلاحيات مشرف فقط، مثل إضافة أو حذف الكتب.
//
// على سبيل المثال: