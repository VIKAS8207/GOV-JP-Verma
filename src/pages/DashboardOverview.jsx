// src/pages/DashboardOverview.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Mock Data for the Dashboard
const financialStats = [
  { label: 'Total Fees Collected', value: '₹42.5L', desc: 'Aggregate collection', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: "Today's Collection", value: '₹1.2L', desc: 'Current date receipts', color: 'text-blue-600', bg: 'bg-blue-50', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { label: 'Pending Fees', value: '₹5.4L', desc: 'Outstanding payments', color: 'text-red-500', bg: 'bg-red-50', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Total Transactions', value: '1,842', desc: 'Processed payments', color: 'text-purple-600', bg: 'bg-purple-50', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
];

const studentStats = [
  { label: 'Total Students', value: '2,450', desc: 'Cumulative enrollment', color: 'text-[#111111]', bg: 'bg-gray-100' },
  { label: 'New Admissions', value: '850', desc: 'Current cycle', color: 'text-[#EE6132]', bg: 'bg-orange-50' },
  { label: 'Old Students', value: '1,400', desc: 'Returning via portal', color: 'text-teal-600', bg: 'bg-teal-50' },
  { label: 'Private Students', value: '200', desc: 'Distance learners', color: 'text-indigo-600', bg: 'bg-indigo-50' },
];

export default function DashboardOverview() {
  
  // Percentages for CSS Graphs
  const feeCollectedPct = (42.5 / (42.5 + 5.4)) * 100;
  const feePendingPct = 100 - feeCollectedPct;

  const newPct = (850 / 2450) * 100;
  const oldPct = (1400 / 2450) * 100;
  const pvtPct = (200 / 2450) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 max-w-[1600px] mx-auto pb-10"
    >
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-[#111111]">Admin Dashboard</h2>
        <p className="text-gray-500 mt-1">Real-time aggregate insights for JP Verma College administration.</p>
      </div>

      {/* --- FINANCIAL METRICS GRID --- */}
      <div>
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Financial & Transaction Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {financialStats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${stat.bg} opacity-50 group-hover:scale-110 transition-transform`}></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={stat.icon}></path></svg>
                  </div>
                </div>
                <h3 className="text-3xl font-black text-[#111111] font-mono tracking-tight">{stat.value}</h3>
                <p className="text-xs font-bold text-gray-900 uppercase tracking-widest mt-2">{stat.label}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- STUDENT DEMOGRAPHICS GRID --- */}
      <div>
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Enrollment Demographics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {studentStats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
              <div className="flex items-end gap-3">
                <h3 className={`text-3xl font-black ${stat.color}`}>{stat.value}</h3>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 bg-gray-50 px-2 py-1 rounded w-fit">{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- GRAPHICAL ANALYTICS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Graph 1: Revenue Breakdown */}
        <div className="bg-[#111111] p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
        
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 relative z-10">Revenue Distribution</h3>
          
          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Expected</p>
                <p className="text-2xl font-black text-white font-mono">₹47.9L</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-[#EE6132]">{feeCollectedPct.toFixed(1)}%</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Collection Rate</p>
              </div>
            </div>

            {/* CSS Progress Bar */}
            <div className="h-4 w-full bg-gray-800 rounded-full overflow-hidden flex">
              <motion.div initial={{ width: 0 }} animate={{ width: `${feeCollectedPct}%` }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-emerald-500"></motion.div>
              <motion.div initial={{ width: 0 }} animate={{ width: `${feePendingPct}%` }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-red-500"></motion.div>
            </div>

            {/* Legend */}
            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
                <span className="text-xs font-bold text-gray-300">Collected (₹42.5L)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-red-500"></div>
                <span className="text-xs font-bold text-gray-300">Pending (₹5.4L)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Graph 2: Student Breakdown */}
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden">
          <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6 relative z-10">Student Composition</h3>
          
          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Registry</p>
                <p className="text-2xl font-black text-[#111111]">2,450</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-teal-600">{oldPct.toFixed(1)}%</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Retention Rate</p>
              </div>
            </div>

            {/* CSS Segmented Bar */}
            <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex">
              <motion.div initial={{ width: 0 }} animate={{ width: `${oldPct}%` }} transition={{ duration: 1, delay: 0.3 }} className="h-full bg-teal-500"></motion.div>
              <motion.div initial={{ width: 0 }} animate={{ width: `${newPct}%` }} transition={{ duration: 1, delay: 0.3 }} className="h-full bg-[#EE6132]"></motion.div>
              <motion.div initial={{ width: 0 }} animate={{ width: `${pvtPct}%` }} transition={{ duration: 1, delay: 0.3 }} className="h-full bg-indigo-500"></motion.div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-between items-center pt-2 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-teal-500"></div>
                <span className="text-xs font-bold text-gray-600">Old (1,400)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-[#EE6132]"></div>
                <span className="text-xs font-bold text-gray-600">New (850)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-indigo-500"></div>
                <span className="text-xs font-bold text-gray-600">Private (200)</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}