import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-700">📚 نظام المكتبة الجامعية</h1>
      <div>
        <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
          تسجيل الدخول
        </button>
      </div>
    </nav>
  );
};

export default Navbar;