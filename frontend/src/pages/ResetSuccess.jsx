// ResetSuccess.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        <div className="text-5xl text-green-500 mb-4">✅</div>
        <h2 className="text-xl font-bold text-green-700 mb-2">تم تغيير كلمة المرور بنجاح!</h2>
        <p className="text-gray-600 mb-4">يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة.</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
};

export default ResetSuccess;