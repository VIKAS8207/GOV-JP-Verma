// src/layouts/AdminLayout.jsx
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function AdminLayout() {
  const location = useLocation();

  // Updated navigation structure with dropdown support
  const navItems = [
    { name: 'Overview', path: '/admin-dashboard' },
    { name: 'Students List', path: '/admin-dashboard/students' },
    { name: 'Masters', path: '/admin-dashboard/masters' }, // New Masters Option
    { 
      name: 'Fee Structure', 
      isDropdown: true,
      pathPrefix: '/admin-dashboard/fees', // Used to keep the parent active if a child is clicked
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
        { name: 'Chargeback Report', path: '/admin-dashboard/reports/chargeback' },
        { name: 'Fee Head Wise report', path: '/admin-dashboard/reports/fee-head-wise' },
        { name: 'Sub Fee head', path: '/admin-dashboard/reports/sub-fee-head' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111111] font-sans">
      
      {/* --- Top Shared Navigation Bar --- */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Left: Logo & College Name */}
          <div className="flex items-center gap-4">
            <div className="w-15 h-15 bg-white  flex items-center justify-center overflow-hidden">
    <img 
      src="/image/logo.png" /* <-- Put your image path or URL here */
      alt="College Logo" 
      className="w-full h-full object-contain p-1" /* Added p-1 for slight breathing room inside the border */
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

          {/* Center: Navigation Links with Dropdowns */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              
              // Handle standard links without dropdowns
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

              // Handle Dropdown Menus
              const isDropdownActive = location.pathname.startsWith(item.pathPrefix);
              
              return (
                <div key={item.name} className="relative group">
                  {/* Dropdown Trigger Button */}
                  <button className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    isDropdownActive 
                      ? 'bg-orange-50 text-[#EE6132]' 
                      : 'text-gray-500 hover:text-[#111111] hover:bg-gray-50'
                  }`}>
                    {item.name}
                    <svg className={`w-4 h-4 transition-transform duration-200 group-hover:rotate-180 ${isDropdownActive ? 'text-[#EE6132]' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>

                  {/* Dropdown Menu (Hidden by default, shown on hover) */}
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

      {/* --- Dynamic Page Content Area --- */}
      <main className="max-w-[1600px] mx-auto px-6 py-10">
        <Outlet />
      </main>

    </div>
  );
}