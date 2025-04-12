import React, { useState } from 'react';

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('تم إرسال طلب استعادة كلمة المرور لـ:', identifier);
    // هون لاحقًا رح نربطه بالباك إند
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-center text-blue-700 mb-4">🔐 نسيت كلمة المرور؟</h2>
        <p className="text-gray-600 text-sm mb-4 text-center">
          أدخل البريد الإلكتروني أو رقم الطالب لإرسال رمز التحقق.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="البريد الإلكتروني أو رقم الطالب"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
          >
            إرسال رمز التحقق
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;