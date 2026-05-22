// src/pages/Portal.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

import distanceBg from '/image/distance.jpg'; // Verify this matches your exact file path

export default function Portal() {
  const [regNumber, setRegNumber] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Attempting entry with:", regNumber);
    // Routes the student to their dashboard
    navigate('/student-dashboard'); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FAD4BA] text-[#111111] font-sans relative flex flex-col overflow-x-hidden">
      
      {/* --- Ambient Background Grid Lines - enhanced visibility --- */}
      <div className="absolute inset-0 pointer-events-none flex justify-center w-full max-w-[1400px] mx-auto opacity-80">
         <div className="w-1/5 border-x border-orange-300/60 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/60 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/60 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/60 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/60 h-full"></div>
      </div>

      {/* --- Top Navigation --- */}
      <header className="w-full max-w-[1400px] mx-auto p-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          {/* Logo Image Container - borderless */}
          <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center overflow-hidden">
            <img 
              src="/image/logo.png" 
              alt="College Logo" 
              className="w-full h-full object-contain p-1" 
            />
          </div>
          {/* Title - Restructured */}
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-700 tracking-tight">Gov J.P. Verma College Bilaspur</span>
            <span className="font-extrabold text-2xl text-[#EE6132] tracking-tighter">
              payment portal.
            </span>
          </div>
        </div>

        {/* Admin Login Button - Black Pill */}
        <Link 
          to="/admin"
          className="px-7 py-2.5 text-sm font-semibold text-white bg-[#111111] rounded-full hover:bg-gray-800 transition-colors shadow-md inline-block"
        >
          Admin Login
        </Link>
      </header>

      {/* --- Main Content Split Layout --- */}
      <div className="flex-grow flex items-center justify-center w-full z-10 px-6 py-12 lg:py-0">
        <div className="w-full max-w-[1300px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* ========================================== */}
          {/* LEFT COLUMN: REGULAR STUDENT LOGIN SYSTEM    */}
          {/* ========================================== */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start w-full text-left"
          >
            {/* Headline */}
            <h1 className="text-5xl md:text-[56px] font-extrabold leading-[1.1] mb-5 tracking-tight text-[#111111]">
              Seamless & Secure <br /> Payment Processing
            </h1>
            
            {/* Subheadline */}
            <p className="text-gray-700/80 max-w-lg mb-10 text-[16px] leading-relaxed">
              Access your dashboard to manage transactions, track payments, and update your billing details—all in one place.
            </p>

            {/* --- Form Section --- */}
            <div className="w-full relative flex flex-col items-start justify-center py-6">

              {/* Pill Badge */}
              <div className="relative z-10 mb-5 px-4 py-1.5 rounded-full border border-orange-200 bg-white text-orange-600 text-xs font-bold shadow-sm flex items-center gap-2 tracking-wide uppercase">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
                Regular Student Login
              </div>

              {/* Primary Input Card - Flush on the left */}
              <form 
                onSubmit={handleLogin}
                className="relative z-20 w-full max-w-[600px] bg-white p-2.5 rounded-[12px] shadow-[0_8px_30px_rgb(238,97,50,0.12)] flex items-center border border-orange-100 gap-2"
              >
                <div className="flex-grow flex items-center px-4">
                  <input
                    type="text"
                    id="regNumber"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    placeholder="Enter Registration Number..."
                    className="w-full bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 text-[17px] py-3 focus:ring-0"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="shrink-0 px-8 py-3.5 bg-[#EE6132] text-white font-semibold text-sm rounded-[8px] hover:bg-[#d9562a] transition-colors shadow-md"
                >
                  Enter System
                </button>
              </form>

              {/* Secondary Registration Card (Layered underneath) - Flush on the left, new style */}
              <div className="relative z-10 w-full max-w-[560px] bg-white/90 backdrop-blur-sm p-4 sm:px-6 sm:py-4 rounded-[12px] shadow-[0_15px_40px_rgb(0,0,0,0.04)] border border-orange-100/50 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                 <div className="text-[14px] font-medium text-gray-700 flex-grow text-center sm:text-left">
                   Unregistered Regular Student? Join to manage your academic records and fee payments seamlessly.
                 </div>
                 {/* Normal outline button as requested */}
                 <Link 
                   to="/register" 
                   className="shrink-0 px-5 py-2.5 bg-white border-2 border-[#EE6132] text-[#EE6132] font-bold text-xs uppercase tracking-wide rounded-[8px] hover:bg-orange-50 transition-colors shadow-sm"
                 >
                   Register Now
                 </Link>
              </div>
            </div>
          </motion.div>

          {/* ========================================== */}
          {/* RIGHT COLUMN: DISTANCE / PRIVATE EDUCATION */}
          {/* ========================================== */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="w-full flex justify-center lg:justify-end"
          >
            {/* Card with background image. min-h-[500px] ensures it stays tall even without the headers */}
            <div 
              className="w-full max-w-[500px] min-h-[500px] flex flex-col justify-end bg-white/80 backdrop-blur-2xl rounded-[24px] p-8 sm:p-10 shadow-[0_20px_60px_rgb(0,0,0,0.06)] border border-orange-100/50 relative overflow-hidden text-white"
              style={{ 
                backgroundImage: `url(${distanceBg})`,
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
              }}
            >
              
              {/* Overlay for text readability on image */}
              <div className="absolute inset-0 bg-black/40 z-0"></div>

              {/* relative z-10 ensures content sits above the black overlay. The parent's flex layout pushes this to the bottom. */}
              <div className="relative z-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm font-medium text-white/90" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    Fully remote registration process
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-white/90" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    Self-paced fee schedules
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  {/* compulsory button */}
                  <Link 
                    to="/register-distance" 
                    className="w-full flex items-center justify-between px-6 py-4 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-lg group"
                  >
                    <span>Register as Private Student</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}