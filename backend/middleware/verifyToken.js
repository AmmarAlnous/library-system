const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // التحقق من وجود التوكن
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'يرجى تسجيل الدخول أولاً' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // فك تشفير التوكن باستخدام المفتاح السري
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // تخزين بيانات المستخدم في req.user
    req.user = decoded;

    // السماح بالوصول للمسار التالي
    next();
  } catch (err) {
    console.error('❌ خطأ في التوكن:', err.message);
    return res.status(403).json({ error: 'توكن غير صالح أو منتهي الصلاحية' });
  }
};

module.exports = verifyToken;