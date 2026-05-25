// src/pages/reports/GovtReport.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const govtData = {
  yearly: [
    { year: '2026-27', total: 45000000, tuition: 30000000, practical: 10000000, grants: 5000000 },
    { year: '2025-26', total: 42000000, tuition: 28000000, practical: 9000000, grants: 5000000 },
  ],
  monthly: [
    { month: 'May 2026', total: 5200000, tuition: 4000000, practical: 800000, grants: 400000 },
    { month: 'April 2026', total: 4800000, tuition: 3500000, practical: 900000, grants: 400000 },
  ]
};

export default function GovtReport() {
  const [view, setView] = useState('monthly'); // 'monthly' or 'yearly'

  const currentData = view === 'monthly' ? govtData.monthly : govtData.yearly;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[1600px] mx-auto space-y-8">
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Government Audit Report</h2>
          <p className="text-gray-500 mt-1">Consolidated view of government-regulated fee collections.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button onClick={() => setView('monthly')} className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${view === 'monthly' ? 'bg-white shadow-sm text-[#EE6132]' : 'text-gray-500'}`}>Monthly</button>
          <button onClick={() => setView('yearly')} className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${view === 'yearly' ? 'bg-white shadow-sm text-[#EE6132]' : 'text-gray-500'}`}>Yearly</button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">{view === 'monthly' ? 'Month' : 'Academic Year'}</th>
              <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Tuition (Govt)</th>
              <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Practical</th>
              <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Grants/Misc</th>
              <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Grand Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentData.map((row, i) => (
              <tr key={i} className="hover:bg-orange-50/30">
                <td className="px-8 py-5 font-black text-gray-900">{row.month || row.year}</td>
                <td className="px-6 py-5 font-mono text-gray-600">₹{row.tuition.toLocaleString()}</td>
                <td className="px-6 py-5 font-mono text-gray-600">₹{row.practical.toLocaleString()}</td>
                <td className="px-6 py-5 font-mono text-gray-600">₹{row.grants.toLocaleString()}</td>
                <td className="px-8 py-5 font-black text-[#EE6132] font-mono text-right">₹{row.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}