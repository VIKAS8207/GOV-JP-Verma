// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import StudentList from '../components/StudentList';



export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');

  const navItems = ['Overview', 'Students List', 'Fee Structure', 'Reports'];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111111] font-sans">
      
      {/* --- Top Navigation Bar --- */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Left: Logo & College Name */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#111111] rounded-lg shadow-sm flex items-center justify-center overflow-hidden">
              <span className="text-[10px] text-[#EE6132] font-black tracking-widest">LOGO</span>
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight leading-none">
                JP Verma College
              </h1>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Administration
              </span>
            </div>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === item 
                    ? 'bg-orange-50 text-[#EE6132]' 
                    : 'text-gray-500 hover:text-[#111111] hover:bg-gray-100'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Right: Profile / Logout */}
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-gray-200 border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold text-gray-600">
              AD
            </div>
            <Link 
              to="/admin" 
              className="text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2"
            >
              Logout
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </Link>
          </div>
        </div>
      </header>

      {/* --- Main Dashboard Content Area --- */}
      <main className="max-w-[1600px] mx-auto px-6 py-10">
        <motion.div
          key={activeTab} // Animate when tab changes
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight">{activeTab}</h2>
            <p className="text-gray-500 mt-1">Manage and view data for {activeTab.toLowerCase()}.</p>
          </div>

          {/* Placeholder Grid for Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-center items-center text-gray-400">
              Widget 1 Placeholder
            </div>
            <div className="h-64 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-center items-center text-gray-400">
              Widget 2 Placeholder
            </div>
            <div className="h-64 bg-[#111111] rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center text-gray-500 border border-gray-800">
              Premium Stats Placeholder
            </div>
          </div>
        </motion.div>
      </main>

    </div>
  );
}