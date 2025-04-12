import React from 'react';

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">تسجيل الدخول</h2>

        <form>
          <label className="block mb-2 text-right font-medium">رقم الطالب أو البريد</label>
          <input
            type="text"
            className="w-full p-2 mb-4 border rounded"
            placeholder="student123"
          />

          <label className="block mb-2 text-right font-medium">كلمة المرور</label>
          <input
            type="password"
            className="w-full p-2 mb-4 border rounded"
            placeholder="••••••"
          />

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
          >
            تسجيل الدخول
          </button>

          <div className="mt-4 text-center">
            <a href="#" className="text-blue-600 hover:underline">نسيت كلمة المرور؟</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;