import React from 'react';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">مرحبًا بك في نظام المكتبة الجامعية 📚</h2>
      <p className="text-gray-700 leading-relaxed">
        هذا النظام يتيح للطلاب استعراض الكتب وقراءتها بشكل رقمي وآمن، ويمنح المشرفين أدوات قوية لإدارة الكتب والمستخدمين.
      </p>
    </div>
  );
};

export default Home;