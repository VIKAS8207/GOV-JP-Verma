// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // New error state
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Hardcoded Credential Check
    if (adminId === 'Admin' && password === 'Admin123') {
      setError('');
      // Set a simple auth flag in browser storage
      localStorage.setItem('isAdminAuthenticated', 'true');
      console.log("Admin authenticated successfully.");
      navigate('/admin-dashboard'); 
    } else {
      // Trigger Error
      setError('Invalid Admin ID or Password. Access Denied.');
      // Shake animation effect could be added here, but we will use a banner
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-[#FFF5EC] via-[#FFE8D6] to-[#FAD4BA] text-[#111111] font-sans relative flex flex-col items-center justify-center overflow-hidden">
      
      {/* --- Ambient Background Grid Lines --- */}
      <div className="absolute inset-0 pointer-events-none flex justify-center w-full max-w-[1400px] mx-auto opacity-50">
         <div className="w-1/5 border-x border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[420px] mx-4"
      >
        {/* --- Back to Portal Link --- */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#EE6132] hover:text-[#d9562a] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Return to Portal
          </Link>
        </div>

        {/* --- Dark Admin Card --- */}
        <div className="bg-[#111111] text-white p-8 sm:p-10 rounded-[20px] shadow-[0_20px_50px_rgb(0,0,0,0.2)] border border-gray-800">
          
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-gray-300 text-[10px] font-bold tracking-widest uppercase mb-4 border border-white/5">
              <span className="w-2 h-2 rounded-full bg-[#EE6132] animate-pulse"></span>
              Restricted Access
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Admin Gateway.</h1>
            <p className="text-gray-400 text-sm mt-2">Enter your administrative credentials.</p>
          </div>

          {/* --- Error Warning Banner --- */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-[10px] flex items-center gap-3 text-red-500 text-xs font-bold tracking-wide"
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                Admin ID
              </label>
              <input
                type="text"
                value={adminId}
                onChange={(e) => { setAdminId(e.target.value); setError(''); }}
                placeholder="ADM-XXXX"
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-[10px] focus:outline-none focus:border-[#EE6132] transition-colors text-white placeholder-gray-600 font-mono text-sm"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-[10px] focus:outline-none focus:border-[#EE6132] transition-colors text-white placeholder-gray-600 font-mono text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-2 bg-[#EE6132] text-white font-bold text-sm rounded-[10px] hover:bg-[#d9562a] transition-all hover:shadow-[0_0_20px_rgba(238,97,50,0.3)]"
            >
              Authenticate
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}