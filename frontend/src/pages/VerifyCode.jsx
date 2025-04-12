import React, { useState } from 'react';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // هنا لاحقًا رح نربط بالباك إند للتحقق من الكود
    if (code === '') {
      setMessage('⚠️ يرجى إدخال رمز التحقق');
    } else {
      setMessage('✅ تم التحقق من الرمز بنجاح (محاكاة)');
      // بعد التحقق الناجح، يمكن التوجيه إلى صفحة تغيير كلمة المرور
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">🔐 تحقق من الرمز</h2>
      <p className="text-gray-600 mb-4 text-center">
        أدخل الرمز الذي تم إرساله إلى بريدك الإلكتروني.
      </p>

      {message && (
        <div className="mb-4 text-sm text-center text-red-600">{message}</div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="رمز التحقق"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
        >
          تحقق من الرمز
        </button>
      </form>
    </div>
  );
};

export default VerifyCode;