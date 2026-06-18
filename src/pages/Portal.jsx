// src/pages/Portal.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function Portal() {
  const [regNumber, setRegNumber] = useState('');
  const navigate = useNavigate();

  // State to control visibility based on Admin settings
  const [controls, setControls] = useState({
    showLogin: true,
    showRegular: true,
    showDistance: true
  });

  // Fetch settings from LocalStorage when the portal loads
  useEffect(() => {
    const storedControls = localStorage.getItem('portalControls');
    if (storedControls) {
      setControls(JSON.parse(storedControls));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/student-dashboard'); 
  };

  // Logic: Check if the entire portal is turned off
  const isPortalClosed = !controls.showLogin && !controls.showRegular && !controls.showDistance;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFF5EC] to-[#FAD4BA] text-[#111111] font-sans relative flex flex-col overflow-x-hidden">
      
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none flex justify-center w-full max-w-[1400px] mx-auto opacity-60 z-0">
         <div className="w-1/5 border-x border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
      </div>

      {/* Header */}
      <header className="w-full max-w-[1400px] mx-auto p-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-sm border border-orange-100">
            <img src="/image/logo.png" alt="College Logo" className="w-full h-full object-contain p-2" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest">Gov J.P. Verma College</span>
            <span className="font-black text-xl sm:text-2xl text-[#EE6132] tracking-tight">payment portal.</span>
          </div>
        </div>

        <Link to="/admin" className="px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#111111] rounded-full hover:bg-gray-800 transition-colors shadow-lg flex items-center gap-2">
          <svg className="w-4 h-4 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          Admin Login
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center w-full z-10 px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full max-w-md flex flex-col items-center text-center">
          
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4 tracking-tight text-[#111111]">Student Portal</h1>
          <p className="text-gray-600 text-sm sm:text-base font-medium mb-8 max-w-sm px-4">
            Manage your academic records, process fee payments seamlessly, and access your dashboard.
          </p>

          <div className="w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgb(238,97,50,0.1)] border border-orange-100/60 p-6 sm:p-8 overflow-hidden relative">
            
            {/* If all switches in the Master Domain are turned OFF */}
            {isPortalClosed ? (
              <div className="py-10 text-center">
                <div className="w-16 h-16 bg-orange-50 text-[#EE6132] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-2">Portal Under Maintenance</h3>
                <p className="text-sm font-medium text-gray-500">Student admissions and logins have been temporarily paused by administration. Please check back later.</p>
              </div>
            ) : (
              <>
                {/* 1. Login Section Toggle */}
                {controls.showLogin && (
                  <div className="mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="h-px w-8 bg-gray-200"></span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Existing Students</span>
                      <span className="h-px w-8 bg-gray-200"></span>
                    </div>
                    
                    <form onSubmit={handleLogin} className="flex flex-col gap-3">
                      <input
                        type="text"
                        value={regNumber}
                        onChange={(e) => setRegNumber(e.target.value)}
                        placeholder="Enter Registration Number"
                        className="w-full px-5 py-4 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-bold text-gray-900 text-center text-lg placeholder-gray-400"
                        required
                      />
                      <button type="submit" className="w-full px-6 py-4 bg-[#EE6132] text-white font-bold text-[15px] rounded-xl hover:bg-[#d9562a] transition-all shadow-lg hover:shadow-[#EE6132]/30 flex items-center justify-center gap-2 group">
                        Enter System
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </button>
                    </form>
                  </div>
                )}

                {/* Divider - Only show if Login AND at least one Reg type is visible */}
                {controls.showLogin && (controls.showRegular || controls.showDistance) && (
                  <div className="w-full h-px bg-gray-100 mb-8 relative">
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest rounded-full">New Admission?</span>
                  </div>
                )}

                {/* Registration Options */}
                <div className="flex flex-col gap-3">
                  {/* 2. Regular Registration Toggle */}
                  {controls.showRegular && (
                    <Link to="/register" className="w-full px-6 py-3.5 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-md flex items-center justify-between group">
                      <span>Regular Student Registration</span>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                  )}
                  
                  {/* 3. Distance Registration Toggle */}
                  {controls.showDistance && (
                    <Link to="/register-distance" className="w-full px-6 py-3.5 bg-orange-50 border border-orange-200 text-[#EE6132] font-bold text-sm rounded-xl hover:bg-orange-100 transition-colors flex items-center justify-between group">
                      <span>Private / Distance Registration</span>
                      <svg className="w-4 h-4 text-orange-400 group-hover:text-[#EE6132] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                  )}
                </div>
              </>
            )}

          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full z-20 pb-8 pt-4">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <Link to="#" className="hover:text-[#EE6132] transition-colors">Privacy Policy</Link>
          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          <Link to="#" className="hover:text-[#EE6132] transition-colors">Terms & Conditions</Link>
          <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block"></span>
          <span className="hidden sm:block">© {new Date().getFullYear()} Gov J.P. Verma College</span>
        </div>
      </footer>
    </div>
  );
}