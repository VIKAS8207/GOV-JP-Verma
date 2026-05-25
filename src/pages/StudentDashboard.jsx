// src/pages/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const studentProfile = {
  name: "Aarav Sharma",
  regNo: "REG-2026-8891",
  course: "B.Tech Computer Science",
  year: "1st Year" // Updated to 1st year for a fresh start
};

// Generate 8 Semesters - ALL starting as "Pending"
const generateInitialRecords = () => Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: `Year ${Math.floor(i / 2) + 1}, Semester ${i + 1}`,
  status: 'Pending', // Changed to start everyone as Pending
  dueDate: `15 ${i % 2 === 0 ? 'Aug' : 'Jan'} ${2025 + Math.floor(i / 2)}`,
  fees: {
    govt: { tuition: 40000, practical: 2500, additional: 600, sta: 300 },
    nonGovt: { pd_af: 1500, cm: 1000, reentry: 500 },
    others: { jb: 450, sf: 250 }
  }
}));

const getRecordTotal = (record) => {
  const g = Object.values(record.fees.govt).reduce((a, b) => a + b, 0);
  const ng = Object.values(record.fees.nonGovt).reduce((a, b) => a + b, 0);
  const o = Object.values(record.fees.others).reduce((a, b) => a + b, 0);
  return g + ng + o;
};

export default function StudentDashboard() {
  const [elective, setElective] = useState('');
  const [isElectiveLocked, setIsElectiveLocked] = useState(false);
  const [feeRecords, setFeeRecords] = useState(generateInitialRecords());
  const [selectedFees, setSelectedFees] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  // Default Selection Logic: Automatically select the first pending semester
  // This will auto-select Semester 1 initially. After they pay for Sem 1, it will auto-select Sem 2!
  useEffect(() => {
    const pendingRecords = feeRecords.filter(f => f.status === 'Pending').sort((a, b) => a.id - b.id);
    if (pendingRecords.length > 0 && selectedFees.length === 0) {
      setSelectedFees([pendingRecords[0].id]);
    }
  }, [feeRecords, selectedFees.length]);

  const handleElectiveSave = (e) => {
    e.preventDefault();
    if (elective) setIsElectiveLocked(true);
  };

  const toggleFeeSelection = (feeId) => {
    setSelectedFees(prev => prev.includes(feeId) ? prev.filter(id => id !== feeId) : [...prev, feeId]);
  };

  const pendingFees = feeRecords.filter(f => f.status === 'Pending').sort((a, b) => a.id - b.id);
  const paidFees = feeRecords.filter(f => f.status === 'Paid').sort((a, b) => b.id - a.id);
  const selectedRecords = feeRecords.filter(f => selectedFees.includes(f.id));

  const bill = { govt: { tuition: 0, practical: 0, additional: 0, sta: 0 }, nonGovt: { pd_af: 0, cm: 0, reentry: 0 }, others: { jb: 0, sf: 0 } };

  selectedRecords.forEach(r => {
    Object.keys(bill.govt).forEach(k => bill.govt[k] += r.fees.govt[k]);
    Object.keys(bill.nonGovt).forEach(k => bill.nonGovt[k] += r.fees.nonGovt[k]);
    Object.keys(bill.others).forEach(k => bill.others[k] += r.fees.others[k]);
  });

  const subTotal = Object.values(bill.govt).reduce((a,b)=>a+b,0) + Object.values(bill.nonGovt).reduce((a,b)=>a+b,0) + Object.values(bill.others).reduce((a,b)=>a+b,0);
  const gstAmount = subTotal * 0.18;
  const grandTotal = subTotal + gstAmount;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      setTransactionId(`TXN-${Math.floor(100000000 + Math.random() * 900000000)}`);
      
      // Move selected items to Paid status
      setFeeRecords(prev => prev.map(f => selectedFees.includes(f.id) ? { ...f, status: 'Paid' } : f));
      
      // Clear selection so the useEffect can auto-select the next pending one
      setSelectedFees([]);
    }, 2000);
  };

  const InvoiceRow = ({ label, amount }) => (
    <div className="flex justify-between items-center text-[13px] py-1.5">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-900 font-bold font-mono tracking-tight text-right w-24">
        {amount > 0 ? `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : '-'}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5EC] via-[#FFE8D6] to-[#FAD4BA] text-[#111111] font-sans p-4 lg:p-10 relative overflow-hidden">
      
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 pointer-events-none flex justify-center w-full max-w-[1400px] mx-auto opacity-50 z-0">
         <div className="w-1/5 border-x border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
      </div>

      <div className="max-w-[1300px] mx-auto relative z-10">
        {/* Navigation Header */}
        <header className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-[#EE6132] font-black text-lg">{studentProfile.name.charAt(0)}</div>
            <div>
              <h1 className="font-extrabold text-xl leading-none mb-1">{studentProfile.name}</h1>
              <p className="text-xs font-bold text-gray-500 uppercase">{studentProfile.regNo} <span className="mx-2 opacity-50">•</span> {studentProfile.course} ({studentProfile.year})</p>
            </div>
          </div>
          <Link to="/" className="px-5 py-2.5 bg-gray-50 border border-gray-200 text-gray-700 font-bold text-xs uppercase tracking-wide rounded-lg hover:bg-gray-100 transition-colors shadow-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Logout
          </Link>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Selection */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Academic Elective Selection */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-sm font-extrabold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#EE6132]"></span> Academic Subject Selection
                </h2>
              </div>
              <div className="p-6">
                {isElectiveLocked ? (
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-100 rounded-xl">
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
                      <label className="text-xs font-bold text-red-500 uppercase tracking-wider block">Action Required: Select Elective</label>
                      <select value={elective} onChange={(e) => setElective(e.target.value)} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:border-[#EE6132] font-medium" required>
                        <option value="">Choose your elective subject...</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Cyber Security">Cyber Security</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 shadow-sm">Lock Subject</button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Semester Ledger */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-sm font-extrabold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#111111]"></span> Fee Ledger
                </h2>
              </div>
              <div className="p-6">
                
                {/* Pending Dues */}
                <div className="space-y-3 mb-8">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2">Pending Dues</p>
                  {pendingFees.length === 0 ? (
                    <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-green-700 font-bold text-sm flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      All pending semester dues have been cleared.
                    </div>
                  ) : (
                    pendingFees.map((fee) => {
                      const isSelected = selectedFees.includes(fee.id);
                      return (
                        <div key={fee.id} onClick={() => toggleFeeSelection(fee.id)} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'border-[#EE6132] bg-orange-50/30 shadow-sm' : 'border-gray-100 hover:border-orange-200'}`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${isSelected ? 'bg-[#EE6132]' : 'bg-white border-2 border-gray-300'}`}>
                              {isSelected && <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                            </div>
                            <div>
                              <h3 className="font-bold text-sm">{fee.title}</h3>
                              <p className="text-[11px] font-bold text-gray-500 uppercase mt-0.5">Due: {fee.dueDate}</p>
                            </div>
                          </div>
                          <span className="font-extrabold text-gray-900">₹{(getRecordTotal(fee) * 1.18).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Paid Semesters - Only shows if there are actually paid semesters */}
                {paidFees.length > 0 && (
                  <div className="border-t border-gray-100 pt-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-700 text-sm">Paid Semesters</h3>
                          <p className="text-[11px] text-gray-500 font-bold uppercase">{paidFees.length} Semesters Cleared</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-lg">₹{paidFees.reduce((sum, f) => sum + (getRecordTotal(f) * 1.18), 0).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Invoice */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-8">
            <AnimatePresence mode="wait">
              {!paymentSuccess ? (
                <motion.div key="checkout" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-3xl shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-gray-200 overflow-hidden relative">
                  <div className="bg-gray-50 p-6 border-b border-dashed border-gray-300 text-center relative">
                    <h2 className="text-sm font-black uppercase tracking-widest">Official Fee Estimate</h2>
                    <p className="text-xs text-gray-500 mt-1">Gov J.P. Verma College, Bilaspur</p>
                  </div>
                  <div className="p-6 sm:p-8">
                    {selectedRecords.length === 0 ? (
                      <div className="py-12 text-center text-gray-400">
                        <svg className="w-12 h-12 mx-auto mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        <p className="text-sm font-bold">Awaiting semester selection.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {selectedRecords.map(record => (
                            <span key={record.id} className="text-[10px] font-bold bg-orange-50 text-[#EE6132] px-2 py-1 rounded border border-orange-100 uppercase tracking-wider">{record.title}</span>
                          ))}
                        </div>
                        <div>
                          <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-3">1. Govt Charges</h4>
                          <div className="space-y-1">
                            <InvoiceRow label="Tuition Fee" amount={bill.govt.tuition} />
                            <InvoiceRow label="Practical Fee" amount={bill.govt.practical} />
                            <InvoiceRow label="Additional Fee" amount={bill.govt.additional} />
                            <InvoiceRow label="STA" amount={bill.govt.sta} />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-3">2. Non-Govt Fees</h4>
                          <div className="space-y-1">
                            <InvoiceRow label="PD / AF" amount={bill.nonGovt.pd_af} />
                            <InvoiceRow label="CM" amount={bill.nonGovt.cm} />
                            <InvoiceRow label="Re-entry Fee" amount={bill.nonGovt.reentry} />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2 mb-3">3. Other Charges</h4>
                          <div className="space-y-1">
                            <InvoiceRow label="JB" amount={bill.others.jb} />
                            <InvoiceRow label="SF" amount={bill.others.sf} />
                          </div>
                        </div>
                        <div className="border-t-2 border-dashed border-gray-300 pt-4 mt-6">
                          <InvoiceRow label="Subtotal" amount={subTotal} />
                          <InvoiceRow label="GST (18%)" amount={gstAmount} />
                          <div className="flex justify-between items-center mt-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <span className="text-sm font-black uppercase tracking-widest">Grand Total</span>
                            <span className="text-2xl font-black text-[#EE6132] font-mono tracking-tight">₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="mt-6 space-y-3">
                      {!isElectiveLocked && selectedRecords.length > 0 && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs font-bold text-red-600 flex items-start gap-2">
                          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> Elective Subject must be locked.
                        </div>
                      )}
                      <button onClick={handlePayment} disabled={selectedFees.length === 0 || !isElectiveLocked || isProcessing} className={`w-full py-4 font-bold text-sm uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 ${selectedFees.length === 0 || !isElectiveLocked ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#111111] text-white hover:bg-gray-900 shadow-lg shadow-black/20'}`}>
                        {isProcessing ? (
                          <><svg className="animate-spin h-5 w-5 text-[#EE6132]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...</>
                        ) : (
                          <>Pay Securely <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-green-100 text-center p-8">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-100">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h2 className="text-2xl font-black mb-2">Payment Successful</h2>
                  <p className="text-sm font-medium text-gray-500 mb-8">Academic dues cleared.</p>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-left space-y-4 mb-8">
                    <div><p className="text-[10px] font-bold text-gray-500 uppercase">Transaction ID</p><p className="text-sm font-mono font-bold">{transactionId}</p></div>
                    <div><p className="text-[10px] font-bold text-gray-500 uppercase">Amount Paid</p><p className="text-xl font-black text-[#EE6132] font-mono tracking-tight">₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p></div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button className="w-full py-4 bg-[#111111] text-white font-bold text-sm uppercase rounded-xl">Download e-Receipt</button>
                    <button onClick={() => setPaymentSuccess(false)} className="w-full py-3 bg-white border border-gray-200 text-gray-600 font-bold text-sm uppercase rounded-xl">Done</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}