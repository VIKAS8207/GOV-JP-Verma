// src/pages/Portal.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5EC] via-[#FFE8D6] to-[#FAD4BA] text-[#111111] font-sans relative flex flex-col overflow-x-hidden">
      
      {/* --- Ambient Background Grid Lines --- */}
      <div className="absolute inset-0 pointer-events-none flex justify-center w-full max-w-[1400px] mx-auto opacity-50">
         <div className="w-1/5 border-x border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
      </div>

      {/* --- Top Navigation --- */}
      <header className="w-full max-w-[1400px] mx-auto p-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          {/* Logo Image Container */}
          <div className="w-10 h-10 bg-white rounded-lg border border-orange-200 shadow-sm flex items-center justify-center overflow-hidden">
            <span className="text-[9px] text-orange-500 font-black tracking-widest">LOGO</span>
          </div>
          {/* Title */}
          <span className="font-extrabold text-2xl text-[#EE6132] tracking-tighter">
            payment portal.
          </span>
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
          {/* LEFT COLUMN: EXISTING LOGIN SYSTEM         */}
          {/* ========================================== */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-start w-full"
          >
            {/* Headline */}
            <h1 className="text-5xl md:text-[56px] font-extrabold text-left leading-[1.1] mb-5 tracking-tight text-[#111111]">
              Seamless & Secure <br /> Payment Processing
            </h1>
            
            {/* Subheadline */}
            <p className="text-gray-700/80 text-left max-w-lg mb-10 text-[16px] leading-relaxed">
              Access your dashboard to manage transactions, track payments, and update your billing details—all in one place.
            </p>

            {/* --- Form Section --- */}
            <div className="w-full relative flex flex-col items-start justify-center py-6">
              
              {/* Background accent block for the left column */}
              <div className="absolute inset-0 bg-[#FFF5EC]/60 w-[120%] -left-[10%] border-y border-orange-300/30 -z-10 rounded-3xl blur-xl"></div>

              {/* Pill Badge */}
              <div className="relative z-10 mb-5 px-4 py-1.5 rounded-full border border-orange-200 bg-white text-orange-600 text-xs font-bold shadow-sm flex items-center gap-2 tracking-wide uppercase">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
                Regular Student Login
              </div>

              {/* Primary Input Card */}
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

              {/* Secondary Registration Card (Layered underneath) */}
              <div className="relative z-10 w-full max-w-[560px] bg-white/90 backdrop-blur-sm p-4 sm:px-6 sm:py-4 rounded-[12px] shadow-[0_15px_40px_rgb(0,0,0,0.04)] border border-orange-100/50 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 ml-2">
                 <div className="text-[14px] font-medium text-gray-700 flex-grow text-center sm:text-left">
                   Not a registered regular student yet?
                 </div>
                 <Link 
                   to="/register" 
                   className="shrink-0 px-5 py-2.5 bg-orange-50 border border-orange-200 text-[#EE6132] font-bold text-xs uppercase tracking-wide rounded-[8px] hover:bg-orange-100 transition-colors shadow-sm"
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
            <div className="w-full max-w-[500px] bg-white/80 backdrop-blur-2xl rounded-[24px] p-8 sm:p-10 shadow-[0_20px_60px_rgb(0,0,0,0.06)] border border-orange-100/50">
              
              <div className="w-14 h-14 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center text-[#EE6132] mb-6 shadow-sm">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
              </div>

              <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight mb-3">
                Distance & <br /> Private Education
              </h2>
              
              <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
                Enroll in our specialized programs designed for maximum flexibility. Access course materials, submit assignments, and manage your academic progression from anywhere in the world.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  Fully remote registration process
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  Self-paced fee schedules
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100">
                <Link 
                  to="/register-distance" 
                  className="w-full flex items-center justify-between px-6 py-4 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-md group"
                >
                  <span>Register as Private Student</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </Link>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}