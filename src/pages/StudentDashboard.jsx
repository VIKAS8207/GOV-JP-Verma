// src/pages/StudentDashboard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Mock Student Data
const studentProfile = {
  name: "Aarav Sharma",
  regNo: "REG-2026-8891",
  course: "B.Tech Computer Science",
  year: "2nd Year"
};

// Advanced Fee Ledger with Breakdowns
const initialFeeRecords = [
  { id: 1, title: 'Year 1, Semester 1', tuition: 38000, exam: 7000, status: 'Paid', dueDate: '15 Aug 2025' },
  { id: 2, title: 'Year 1, Semester 2', tuition: 38000, exam: 7000, status: 'Paid', dueDate: '15 Jan 2026' },
  { id: 3, title: 'Year 2, Semester 3', tuition: 40000, exam: 8000, status: 'Pending', dueDate: '15 Aug 2026' },
  { id: 4, title: 'Year 2, Semester 4', tuition: 40000, exam: 8000, status: 'Pending', dueDate: '15 Jan 2027' },
];

export default function StudentDashboard() {
  // Academic States
  const [elective, setElective] = useState('');
  const [isElectiveLocked, setIsElectiveLocked] = useState(false);

  // Payment States
  const [selectedFees, setSelectedFees] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  // --- ACTIONS ---
  const handleElectiveSave = (e) => {
    e.preventDefault();
    if (elective) {
      setIsElectiveLocked(true);
    }
  };

  const toggleFeeSelection = (feeId) => {
    setSelectedFees(prev => 
      prev.includes(feeId) ? prev.filter(id => id !== feeId) : [...prev, feeId]
    );
  };

  // --- CALCULATIONS ---
  const selectedRecords = initialFeeRecords.filter(f => selectedFees.includes(f.id));
  const subtotalTuition = selectedRecords.reduce((sum, f) => sum + f.tuition, 0);
  const subtotalExam = selectedRecords.reduce((sum, f) => sum + f.exam, 0);
  const totalBaseFee = subtotalTuition + subtotalExam;
  const gstAmount = totalBaseFee * 0.18; // 18% GST calculation
  const grandTotal = totalBaseFee + gstAmount;

  const handlePayment = () => {
    if (selectedFees.length === 0 || !isElectiveLocked) return;
    
    setIsProcessing(true);
    // Simulate API Network Request
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTransactionId(`TXN-${Math.floor(100000000 + Math.random() * 900000000)}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5EC] via-[#FFE8D6] to-[#FAD4BA] text-[#111111] font-sans p-4 sm:p-6 lg:p-10 relative overflow-hidden">
      
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 pointer-events-none flex justify-center w-full max-w-[1400px] mx-auto opacity-50 z-0">
         <div className="w-1/5 border-x border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
      </div>

      <div className="max-w-[1300px] mx-auto relative z-10">
        
        {/* --- Top Navigation / Student Header --- */}
        <header className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-orange-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-full flex items-center justify-center text-[#EE6132] font-black text-lg shadow-sm">
              {studentProfile.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 leading-none mb-1">{studentProfile.name}</h1>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                {studentProfile.regNo} <span className="mx-2 opacity-50">•</span> {studentProfile.course} ({studentProfile.year})
              </p>
            </div>
          </div>
          <Link 
            to="/" 
            className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold text-xs uppercase tracking-wide rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Logout
          </Link>
        </header>

        {/* --- Two Column Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================== */}
          {/* LEFT COLUMN: SELECTIONS                    */}
          {/* ========================================== */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Academic Elective Selection */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#EE6132]"></span>
                  Academic Subject Selection
                </h2>
              </div>
              <div className="p-6">
                {isElectiveLocked ? (
                  <div className="flex items-center justify-between p-4 bg-green-50/50 border border-green-100 rounded-xl">
                    <div>
                      <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-1">Locked Elective</p>
                      <p className="text-gray-900 font-bold">{elective}</p>
                    </div>
                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleElectiveSave} className="flex flex-col sm:flex-row items-end gap-4">
                    <div className="w-full flex-grow space-y-1.5">
                      <label className="text-xs font-bold text-red-500 uppercase tracking-wider block">
                        Action Required: Select Elective to enable payment
                      </label>
                      <select
                        value={elective}
                        onChange={(e) => setElective(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EE6132]/20 focus:border-[#EE6132] transition-all font-medium text-gray-900 appearance-none cursor-pointer"
                        required
                      >
                        <option value="" disabled>Choose your elective subject...</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Cloud Computing">Cloud Computing</option>
                        <option value="Cyber Security">Cyber Security</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors shrink-0 shadow-sm">
                      Lock Subject
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* 2. Semester Fee Selection */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#111111]"></span>
                  Semester Dues
                </h2>
                <span className="text-xs font-bold text-gray-500 bg-white px-3 py-1 rounded-md border border-gray-200">
                  {initialFeeRecords.filter(f => f.status === 'Pending').length} Pending
                </span>
              </div>
              <div className="p-2 sm:p-4">
                <div className="space-y-2">
                  {initialFeeRecords.map((fee) => {
                    const isPaid = fee.status === 'Paid';
                    const isSelected = selectedFees.includes(fee.id);

                    return (
                      <div 
                        key={fee.id}
                        onClick={() => !isPaid && toggleFeeSelection(fee.id)}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                          isPaid 
                            ? 'bg-gray-50/50 border-transparent opacity-60 cursor-not-allowed' 
                            : isSelected 
                              ? 'bg-orange-50/30 border-[#EE6132] cursor-pointer shadow-sm' 
                              : 'bg-white border-gray-100 cursor-pointer hover:border-orange-200'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {/* Minimal Checkbox */}
                          <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                            isPaid ? 'bg-gray-200' : isSelected ? 'bg-[#EE6132]' : 'bg-white border-2 border-gray-300'
                          }`}>
                            {(isSelected || isPaid) && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-sm">{fee.title}</h3>
                            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-1">Due: {fee.dueDate}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-extrabold text-gray-900 block">
                            ₹{(fee.tuition + fee.exam).toLocaleString()}
                          </span>
                          <span className={`text-[10px] font-extrabold uppercase tracking-widest mt-0.5 block ${isPaid ? 'text-green-600' : 'text-red-500'}`}>
                            {fee.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ========================================== */}
          {/* RIGHT COLUMN: INVOICE & CHECKOUT           */}
          {/* ========================================== */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-8">
            <AnimatePresence mode="wait">
              
              {/* STATE 1: CHECKOUT INVOICE */}
              {!paymentSuccess && (
                <motion.div 
                  key="checkout"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-3xl shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-gray-200 overflow-hidden"
                >
                  <div className="p-8 bg-[#111111] text-white">
                    <h2 className="text-sm font-extrabold uppercase tracking-widest text-gray-400 mb-1">Invoice Summary</h2>
                    <p className="text-3xl font-black">₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                  </div>
                  
                  <div className="p-8">
                    {selectedRecords.length === 0 ? (
                      <div className="py-10 text-center text-gray-400">
                        <svg className="w-12 h-12 mx-auto mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        <p className="text-sm font-bold">Select semesters to view breakdown.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Selected Items List */}
                        <div className="space-y-3">
                          {selectedRecords.map(record => (
                            <div key={record.id} className="flex justify-between items-center text-sm font-bold text-gray-700">
                              <span>{record.title}</span>
                            </div>
                          ))}
                        </div>

                        <div className="border-t-2 border-dashed border-gray-200 pt-6 space-y-3">
                          <div className="flex justify-between text-sm font-medium text-gray-600">
                            <span>Tuition Fees</span>
                            <span>₹{subtotalTuition.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                          </div>
                          <div className="flex justify-between text-sm font-medium text-gray-600">
                            <span>Examination Fees</span>
                            <span>₹{subtotalExam.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                          </div>
                          <div className="flex justify-between text-sm font-medium text-gray-600">
                            <span>GST (18%)</span>
                            <span>₹{gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                          </div>
                        </div>

                        <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
                          <span className="text-base font-extrabold text-gray-900">Total Payable</span>
                          <span className="text-xl font-black text-[#EE6132]">₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        </div>
                      </div>
                    )}

                    {/* Warnings & Action */}
                    <div className="mt-8 space-y-4">
                      {!isElectiveLocked && selectedRecords.length > 0 && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs font-bold text-red-600 flex items-start gap-2">
                          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                          Please lock your Elective Subject to proceed with payment.
                        </div>
                      )}

                      <button
                        onClick={handlePayment}
                        disabled={selectedFees.length === 0 || !isElectiveLocked || isProcessing}
                        className={`w-full py-4 font-bold text-sm uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 ${
                          selectedFees.length === 0 || !isElectiveLocked
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-[#EE6132] text-white hover:bg-[#d9562a] shadow-lg hover:shadow-orange-500/30'
                        }`}
                      >
                        {isProcessing ? (
                          <><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...</>
                        ) : (
                          <>Pay Securely <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></>
                        )}
                      </button>
                      <div className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        End-to-End Encrypted
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STATE 2: SUCCESS RECEIPT */}
              {paymentSuccess && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-green-100 overflow-hidden text-center p-8"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-100">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  
                  <h2 className="text-2xl font-black text-gray-900 mb-2">Payment Successful</h2>
                  <p className="text-sm font-medium text-gray-500 mb-8">Your academic dues have been cleared.</p>

                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-left space-y-4 mb-8">
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Transaction ID</p>
                      <p className="text-sm font-mono font-bold text-gray-900">{transactionId}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Amount Paid</p>
                      <p className="text-xl font-black text-[#EE6132]">₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Date & Time</p>
                      <p className="text-sm font-bold text-gray-900">{new Date().toLocaleString()}</p>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-white border-2 border-gray-200 text-gray-900 font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Download Receipt
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}