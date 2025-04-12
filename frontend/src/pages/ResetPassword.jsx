// ResetPassword.jsx
import React from 'react';

const ResetPassword = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">🔒 تغيير كلمة المرور</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">الرجاء إدخال كلمة المرور الجديدة وتأكيدها.</p>

        <form className="space-y-4">
          <input
            type="password"
            placeholder="كلمة المرور الجديدة"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
          />
          <input
            type="password"
            placeholder="تأكيد كلمة المرور"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
          >
            تحديث كلمة المرور
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;