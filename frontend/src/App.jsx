import React from 'react';
import Navbar from './components/Navbar'; // ✅ استدعاء شريط التنقل
import { Routes, Route } from 'react-router-dom'; // ✅ تفعيل نظام التوجيه (Routing)
import Home from './pages/Home'; // ✅ استدعاء صفحة البداية

function App() {
  return (
    <div className="min-h-screen bg-gray-50"> {/* الخلفية العامة للموقع */}
      <Navbar /> {/* شريط التنقل ثابت في كل الصفحات */}
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} /> {/* عرض صفحة Home عند المسار الجذري */}
        </Routes>
      </div>
    </div>
  );
}

export default App;