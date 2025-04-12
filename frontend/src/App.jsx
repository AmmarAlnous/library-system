import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'; // استيراد صفحة تسجيل الدخول
import ForgotPassword from './pages/ForgotPassword'; // استيراد صفحة استعادة كلمة المرور
import VerifyCode from './pages/VerifyCode'; // سطر الاستيراد لصفحة التحقق من الرمز
import ResetPassword from './pages/ResetPassword'; // استيراد الصفحة الجديدة
import ResetSuccess from './pages/ResetSuccess'; // استيراد الصفحة

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/reset-password" element={<ResetPassword />} />  
          <Route path="/reset-success" element={<ResetSuccess />} /> {/* صفحة النجاح */}
          

        </Routes>
      </div>
    </div>
  );
}

export default App;