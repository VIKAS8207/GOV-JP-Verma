// src/pages/StudentDashboard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

// Mapping the numerical Year (from Register.jsx) to the correct Semester & Base Fee
const feeDataMap = {
  "1": { semester: "1st Semester", baseAmount: 1066 },
  "2": { semester: "3rd Semester", baseAmount: 1066 },
  "3": { semester: "5th Semester", baseAmount: 1066 },
  "4": { semester: "7th Semester", baseAmount: 1066 }
};

export default function StudentDashboard() {
  const location = useLocation();
  
  // Catch the data passed from Register.jsx. 
  // Fallback to mock data if navigated here directly without registering.
  const profile = location.state?.studentProfile || {
    fullName: "Aarav Sharma",
    fatherName: "Ramesh Sharma",
    mobile: "8825736279",
    email: "aarav@example.com",
    city: "Bilaspur",
    gender: "Male",
    caste: "General",
    course: "B.Tech Computer Science",
    year: "1",
    semester: "1st Sem",
    electiveSubject: "Artificial Intelligence"
  };

  const studentYear = location.state?.registeredYear || profile.year || "1";
  const studentCourse = location.state?.registeredCourse || profile.course || "B.Tech Computer Science";

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  // Calculate the single fee based on the passed year
  const currentFeeData = feeDataMap[studentYear] || feeDataMap["1"];
  const grandTotal = currentFeeData.baseAmount * 1.18; // Base + 18% GST

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTransactionId(`TXN-${Math.floor(100000000 + Math.random() * 900000000)}`);
    }, 2000);
  };

  // Reusable detail display component
  const ProfileItem = ({ label, value }) => (
    <div className="flex flex-col w-full overflow-hidden">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5 truncate">{label}</span>
      <span className="text-sm font-bold text-gray-900 break-all">{value || '-'}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5EC] via-[#FFE8D6] to-[#FAD4BA] text-[#111111] font-sans p-4 sm:p-6 lg:p-10 relative overflow-hidden flex flex-col items-center">
      
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 pointer-events-none flex justify-center w-full max-w-[1400px] mx-auto opacity-50 z-0">
         <div className="w-1/5 border-x border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
      </div>

      {/* Centralized Unit */}
      <div className="w-full max-w-[800px] relative z-10 flex flex-col gap-6 mt-4 sm:mt-8">
        
        {/* --- Header --- */}
        <header className="bg-white rounded-2xl p-6 shadow-md border border-orange-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-[#EE6132] font-black text-lg shadow-sm uppercase">
              {profile.fullName.charAt(0)}
            </div>
            <div>
              <h1 className="font-extrabold text-xl leading-none mb-1">Student Dashboard</h1>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                {studentCourse} <span className="mx-2 opacity-50">•</span> Year {studentYear}
              </p>
            </div>
          </div>
          <Link to="/" className="p-2 sm:px-5 sm:py-2.5 bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs uppercase tracking-wide rounded-lg hover:bg-gray-100 transition-colors shadow-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            <span className="hidden sm:block">Logout</span>
          </Link>
        </header>

        {/* --- Main Dashboard & Payment Card --- */}
        <AnimatePresence mode="wait">
          {!paymentSuccess ? (
            <motion.div 
              key="checkout" 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} 
              className="bg-white rounded-[24px] shadow-[0_20px_60px_rgb(238,97,50,0.08)] border border-orange-100/50 overflow-hidden relative"
            >
              <div className="bg-gray-50 p-6 border-b border-gray-100 text-center relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#EE6132]"></div>
                <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest">Admission & Fee Processing</h2>
              </div>
              
              <div className="p-6 sm:p-10 space-y-8">
                
                {/* 1. Verified Student Details Section */}
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">Enrolled Profile</h3>
                    {/* System Verified Badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 text-green-700 rounded-lg shadow-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <span className="text-[10px] font-bold uppercase tracking-widest">System Verified Record</span>
                    </div>
                  </div>

                  <div className="bg-[#F8F9FA] border border-gray-200 p-6 rounded-2xl grid grid-cols-2 sm:grid-cols-3 gap-6">
                    <ProfileItem label="Student Name" value={profile.fullName} />
                    <ProfileItem label="Father's Name" value={profile.fatherName} />
                    <ProfileItem label="Gender" value={profile.gender} />
                    <ProfileItem label="Mobile Number" value={profile.mobile} />
                    <div className="col-span-2 sm:col-span-1"><ProfileItem label="Email Address" value={profile.email} /></div>
                    <ProfileItem label="City" value={profile.city} />
                    <ProfileItem label="Caste" value={profile.caste} />
                    <div className="col-span-2 sm:col-span-2"><ProfileItem label="Elective Subject" value={profile.electiveSubject} /></div>
                  </div>
                </div>

                <div className="border-t border-dashed border-gray-200"></div>

                {/* 2. Payment Gateway Section */}
                <div className="text-center pt-2">
                  {/* Auto-Calculated Semester */}
                  <div className="inline-block px-6 py-2 bg-orange-50 border border-orange-100 rounded-full mb-6">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mr-2">Pending Dues For:</span>
                    <span className="text-sm font-black text-[#EE6132]">{currentFeeData.semester}</span>
                  </div>

                  {/* Total Display */}
                  <div className="flex flex-col items-center justify-center mb-6">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Total Amount Payable</p>
                    <h3 className="text-5xl sm:text-6xl font-black text-[#111111] font-mono tracking-tighter">
                      ₹{grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </h3>
                    <p className="text-[10px] font-bold text-gray-400 mt-4 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100 uppercase tracking-widest">
                      Final Amount (Includes all taxes & fees)
                    </p>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={handlePayment} 
                    disabled={isProcessing} 
                    className="w-full py-4 sm:py-5 bg-[#111111] text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isProcessing ? (
                      <><svg className="animate-spin h-5 w-5 text-[#EE6132]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing Payment...</>
                    ) : (
                      <>Pay Securely Now <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></>
                    )}
                  </button>
                  <div className="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    256-bit SSL Encrypted Transaction
                  </div>
                </div>

              </div>
            </motion.div>
          ) : (
            
            /* --- SUCCESS STATE --- */
            <motion.div 
              key="success" 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} 
              className="bg-white rounded-[24px] shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-green-100 text-center p-8 sm:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-green-400"></div>
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-100 shadow-inner">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              
              <h2 className="text-3xl font-black text-gray-900 mb-2">Payment Successful</h2>
              <p className="text-sm font-bold text-gray-500 mb-8 uppercase tracking-widest">
                {currentFeeData.semester} dues cleared.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-left space-y-4 mb-8">
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Transaction ID</p>
                  <p className="text-sm font-mono font-black text-gray-900">{transactionId}</p>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Amount Paid</p>
                  <p className="text-lg font-black text-[#EE6132] font-mono tracking-tight">₹{grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Date & Time</p>
                  <p className="text-xs font-bold text-gray-900">{new Date().toLocaleString()}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 py-4 bg-[#111111] text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-md">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4-4m4 4V4"></path></svg>
                  Download Receipt
                </button>
                <Link to="/" className="flex-1 py-4 bg-white border border-gray-200 text-gray-700 font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-center">
                  Done
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}