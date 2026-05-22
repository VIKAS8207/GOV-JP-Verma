// src/pages/StudentDashboard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Mock data simulating what you would fetch from the database using their Reg Number
const studentProfile = {
  name: "Aarav Sharma",
  regNo: "REG-2026-8891",
  course: "B.Tech Computer Science",
  year: "2nd Year"
};

const initialFeeRecords = [
  { id: 1, title: 'Year 1, Semester 1', amount: 45000, status: 'Paid', dueDate: '15 Aug 2025' },
  { id: 2, title: 'Year 1, Semester 2', amount: 45000, status: 'Paid', dueDate: '15 Jan 2026' },
  { id: 3, title: 'Year 2, Semester 3', amount: 48000, status: 'Pending', dueDate: '15 Aug 2026' },
  { id: 4, title: 'Year 2, Semester 4', amount: 48000, status: 'Pending', dueDate: '15 Jan 2027' },
];

export default function StudentDashboard() {
  // States for Elective Logic
  const [elective, setElective] = useState('');
  const [isElectiveLocked, setIsElectiveLocked] = useState(false); // Change to true to see the "already filled" state

  // States for Payment Logic
  const [selectedFees, setSelectedFees] = useState([]);

  const handleElectiveSave = (e) => {
    e.preventDefault();
    if (elective) {
      setIsElectiveLocked(true);
      alert(`Elective "${elective}" successfully locked for this academic year.`);
    }
  };

  const toggleFeeSelection = (feeId) => {
    setSelectedFees(prev => 
      prev.includes(feeId) 
        ? prev.filter(id => id !== feeId) 
        : [...prev, feeId]
    );
  };

  // Calculate the total amount for selected checkboxes
  const totalPayable = selectedFees.reduce((total, feeId) => {
    const fee = initialFeeRecords.find(f => f.id === feeId);
    return total + (fee ? fee.amount : 0);
  }, 0);

  const handlePayment = () => {
    if (selectedFees.length === 0) return;
    alert(`Redirecting to payment gateway to pay ₹${totalPayable.toLocaleString()}...`);
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

      <div className="max-w-[1200px] mx-auto relative z-10">
        
        {/* --- Top Navigation / Student Header --- */}
        <header className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-orange-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-[#EE6132] font-black text-xl border-2 border-white shadow-sm">
              {studentProfile.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 leading-tight">{studentProfile.name}</h1>
              <p className="text-sm font-medium text-gray-500">
                {studentProfile.regNo} <span className="mx-2">•</span> {studentProfile.course} ({studentProfile.year})
              </p>
            </div>
          </div>
          <Link 
            to="/" 
            className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Logout
          </Link>
        </header>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          
          {/* --- Section 1: Elective Subject Selection --- */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-orange-100 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#EE6132]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              Academic Elective Selection
            </h2>
            
            {isElectiveLocked ? (
              // Locked State (Read-Only)
              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Your Selected Elective</p>
                  <p className="text-gray-900 font-semibold">{elective || "Artificial Intelligence & Ethics"}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  Locked
                </span>
              </div>
            ) : (
              // Unlocked State (Requires Selection)
              <form onSubmit={handleElectiveSave} className="flex flex-col sm:flex-row items-end gap-4 p-4 bg-orange-50 border border-orange-200 rounded-xl">
                <div className="w-full flex-grow">
                  <label className="text-xs font-bold text-[#EE6132] uppercase tracking-widest mb-1 block">
                    Action Required: Select Elective
                  </label>
                  <select
                    value={elective}
                    onChange={(e) => setElective(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EE6132]/20 focus:border-[#EE6132] transition-all text-gray-800"
                    required
                  >
                    <option value="" disabled>Choose your elective subject...</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="Cyber Security">Cyber Security</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors shrink-0"
                >
                  Save & Lock
                </button>
              </form>
            )}
          </div>

          {/* --- Section 2: Fee Payment Portal --- */}
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Fee Ledger & Payments</h2>
                <p className="text-sm text-gray-500 mt-1">Select one or more pending semesters to process payment.</p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="space-y-4">
                {initialFeeRecords.map((fee) => {
                  const isPaid = fee.status === 'Paid';
                  const isSelected = selectedFees.includes(fee.id);

                  return (
                    <div 
                      key={fee.id}
                      onClick={() => !isPaid && toggleFeeSelection(fee.id)}
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-xl border-2 transition-all ${
                        isPaid 
                          ? 'bg-gray-50 border-gray-100 opacity-75' 
                          : isSelected 
                            ? 'bg-orange-50 border-[#EE6132] cursor-pointer' 
                            : 'bg-white border-gray-200 cursor-pointer hover:border-orange-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Checkbox / Status Icon */}
                        <div className="shrink-0">
                          {isPaid ? (
                            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                          ) : (
                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-[#EE6132] border-[#EE6132]' : 'bg-white border-gray-300'
                            }`}>
                              {isSelected && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div>
                          <h3 className="font-bold text-gray-900">{fee.title}</h3>
                          <p className="text-sm text-gray-500 mt-0.5">Due Date: {fee.dueDate}</p>
                        </div>
                      </div>

                      {/* Amount & Status Badge */}
                      <div className="mt-4 sm:mt-0 flex items-center justify-between w-full sm:w-auto gap-6 sm:pl-4 pl-10">
                        <span className="font-extrabold text-gray-900 tracking-tight text-lg">
                          ₹{fee.amount.toLocaleString()}
                        </span>
                        {isPaid ? (
                          <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-bold rounded-full">Paid</span>
                        ) : (
                          <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full">Pending</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* --- Payment Summary Footer --- */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Total Selected Payable</p>
                  <p className="text-3xl font-extrabold text-[#111111]">
                    ₹{totalPayable.toLocaleString()}
                  </p>
                </div>
                
                <button
                  onClick={handlePayment}
                  disabled={selectedFees.length === 0}
                  className={`w-full sm:w-auto px-10 py-4 font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${
                    selectedFees.length === 0 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' 
                      : 'bg-[#EE6132] text-white hover:bg-[#d9562a] hover:shadow-[0_8px_25px_rgba(238,97,50,0.3)] hover:-translate-y-0.5'
                  }`}
                >
                  Proceed to Secure Payment
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}