// src/layouts/AdminLayout.jsx
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout() {
  const location = useLocation();
  
  // --- New States for Academic Year & Mobile Menu ---
  const [activeYear, setActiveYear] = useState('2025-2026');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdowns, setMobileDropdowns] = useState({}); // Tracks which mobile dropdowns are open
  
  const academicYears = ['2026-2027', '2025-2026', '2024-2025', '2023-2024'];

  // Navigation structure
  const navItems = [
    { name: 'Overview', path: '/admin-dashboard' },
    { name: 'Students List', path: '/admin-dashboard/students' },
    { name: 'Masters', path: '/admin-dashboard/masters' },
    { 
      name: 'Fee Structure', 
      isDropdown: true,
      pathPrefix: '/admin-dashboard/fees',
      children: [
        { name: 'Course Creation', path: '/admin-dashboard/fees/course-creation' },
        { name: 'Course Fee Creation', path: '/admin-dashboard/fees/course-fee-creation' },
      ]
    },
    { 
      name: 'Reports', 
      isDropdown: true,
      pathPrefix: '/admin-dashboard/reports',
      children: [
        { name: 'Course Wise Report', path: '/admin-dashboard/reports/course-wise' },
        { name: 'Class Wise Report', path: '/admin-dashboard/reports/class-wise' },
        { name: 'Transactional Report', path: '/admin-dashboard/reports/transactional' },
        { name: 'Govt Report', path: '/admin-dashboard/reports/govt' },
        { name: 'Pvt Report', path: '/admin-dashboard/reports/pvt' },
      ]
    },
  ];

  const toggleMobileDropdown = (name) => {
    setMobileDropdowns(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111111] font-sans">
      
      {/* --- Top Shared Navigation Bar --- */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Left: Logo & College Name */}
          <div className="flex items-center gap-4">
            <div className="w-15 h-15 bg-white flex items-center justify-center overflow-hidden">
              <img 
                src="/image/logo.png"
                alt="College Logo" 
                className="w-full h-full object-contain p-1"
              />
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

          {/* Center: Navigation Links (Hidden on small screens) */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              if (!item.isDropdown) {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                      isActive 
                        ? 'bg-orange-50 text-[#EE6132]' 
                        : 'text-gray-500 hover:text-[#111111] hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              }

              const isDropdownActive = location.pathname.startsWith(item.pathPrefix);
              return (
                <div key={item.name} className="relative group">
                  <button className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    isDropdownActive 
                      ? 'bg-orange-50 text-[#EE6132]' 
                      : 'text-gray-500 hover:text-[#111111] hover:bg-gray-50'
                  }`}>
                    {item.name}
                    <svg className={`w-4 h-4 transition-transform duration-200 group-hover:rotate-180 ${isDropdownActive ? 'text-[#EE6132]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>
                  <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="w-56 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgb(0,0,0,0.08)] py-2 flex flex-col">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.path}
                          className={`px-5 py-2.5 text-sm font-medium transition-colors ${
                            location.pathname === child.path
                              ? 'text-[#EE6132] bg-orange-50/50'
                              : 'text-gray-600 hover:text-[#111111] hover:bg-gray-50'
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Right: Academic Year, Profile & Logout (Hidden on small screens) */}
          <div className="hidden lg:flex items-center gap-6">
            
            {/* NEW: Academic Year Capsule Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-5 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                AY: {activeYear}
                <svg className="w-4 h-4 text-gray-400 group-hover:text-[#EE6132] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="w-40 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgb(0,0,0,0.08)] py-2 flex flex-col">
                  {academicYears.map(year => (
                    <button
                      key={year}
                      onClick={() => setActiveYear(year)}
                      className={`px-4 py-2 text-sm font-medium text-left transition-colors ${
                        activeYear === year ? 'text-[#EE6132] bg-orange-50/50 font-bold' : 'text-gray-600 hover:text-[#111111] hover:bg-gray-50'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-200"></div>

            {/* Profile / Logout */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                AD
              </div>
              <Link 
                to="/admin" 
                className="text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1.5"
              >
                Logout
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              </Link>
            </div>
          </div>

          {/* Mobile Hamburger Icon */}
          <button 
            className="lg:hidden p-2 text-gray-600 hover:text-[#EE6132] transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
      </header>

      {/* --- Mobile/Tablet Slide-Out Drawer --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
            />

            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-white shadow-2xl z-[60] flex flex-col lg:hidden border-l border-gray-100"
            >
              {/* Drawer Header */}
              <div className="h-20 px-6 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">AD</div>
                  <span className="font-bold text-gray-900">Admin Menu</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              {/* Drawer Body (Scrollable) */}
              <div className="flex-grow overflow-y-auto p-6 space-y-8">
                
                {/* Academic Year Mobile Selector */}
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Academic Year</h3>
                  <div className="bg-gray-50 rounded-xl p-1 border border-gray-200">
                    <select 
                      value={activeYear}
                      onChange={(e) => setActiveYear(e.target.value)}
                      className="w-full bg-transparent px-3 py-2 font-bold text-gray-900 outline-none"
                    >
                      {academicYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Nav Links */}
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Menu Options</h3>
                  <div className="flex flex-col gap-2">
                    {navItems.map((item) => {
                      
                      // Simple Links
                      if (!item.isDropdown) {
                        const isActive = location.pathname === item.path;
                        return (
                          <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
                              isActive ? 'bg-[#EE6132] text-white shadow-md' : 'text-gray-700 bg-gray-50 hover:bg-gray-100'
                            }`}
                          >
                            {item.name}
                          </Link>
                        );
                      }

                      // Dropdown Links
                      const isDropdownOpen = mobileDropdowns[item.name];
                      const hasActiveChild = location.pathname.startsWith(item.pathPrefix);

                      return (
                        <div key={item.name} className="flex flex-col gap-1">
                          <button 
                            onClick={() => toggleMobileDropdown(item.name)}
                            className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
                              hasActiveChild && !isDropdownOpen ? 'bg-orange-50 text-[#EE6132] border border-orange-100' : 'text-gray-700 bg-gray-50 hover:bg-gray-100'
                            }`}
                          >
                            {item.name}
                            <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180 text-[#EE6132]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                          </button>
                          
                          <AnimatePresence>
                            {isDropdownOpen && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden flex flex-col pl-4 gap-1 border-l-2 border-gray-100 ml-4 mt-1"
                              >
                                {item.children.map(child => (
                                  <Link
                                    key={child.name}
                                    to={child.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                                      location.pathname === child.path ? 'text-[#EE6132] bg-orange-50' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Drawer Footer (Logout) */}
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <Link 
                  to="/admin" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-red-200 text-red-600 font-bold text-sm rounded-xl hover:bg-red-50 transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                  Secure Logout
                </Link>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- Dynamic Page Content Area --- */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-10 relative z-10">
        <Outlet />
      </main>

    </div>
  );
}