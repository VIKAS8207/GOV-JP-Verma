// src/pages/reports/GovtReport.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const govtData = {
  yearly: [
    { id: 1, period: '2026-2027', total: 45000000, tuition: 30000000, practical: 10000000, grants: 5000000, addFee: 0, sta: 0 },
    { id: 2, period: '2025-2026', total: 42000000, tuition: 28000000, practical: 9000000, grants: 5000000, addFee: 0, sta: 0 },
  ],
  monthly: [
    { id: 3, period: 'May 2026', total: 5200000, tuition: 4000000, practical: 800000, grants: 400000, addFee: 0, sta: 0 },
    { id: 4, period: 'April 2026', total: 4800000, tuition: 3500000, practical: 900000, grants: 400000, addFee: 0, sta: 0 },
  ]
};

export default function GovtReport() {
  const [view, setView] = useState('monthly'); // 'monthly' or 'yearly'
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const currentData = view === 'monthly' ? govtData.monthly : govtData.yearly;

  // Filter Logic
  const filteredData = currentData.filter(item => 
    item.period.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[1600px] mx-auto space-y-8">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Government Funds Report</h2>
          <p className="text-gray-500 mt-1">Consolidated view of government-regulated fee collections.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex bg-white p-1.5 rounded-xl shadow-sm border border-gray-200">
            <button onClick={() => { setView('monthly'); setCurrentPage(1); }} className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${view === 'monthly' ? 'bg-orange-50 text-[#EE6132] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>Monthly</button>
            <button onClick={() => { setView('yearly'); setCurrentPage(1); }} className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${view === 'yearly' ? 'bg-orange-50 text-[#EE6132] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}>Yearly</button>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#EE6132] text-white font-bold text-sm rounded-xl hover:bg-[#d9562a] transition-colors shadow-md shrink-0">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Export
          </button>
        </div>
      </div>

      {/* --- KPI SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Govt Revenue ({view === 'monthly' ? 'Selected Months' : 'Selected Years'})</p>
          <h3 className="text-3xl font-black text-[#EE6132] font-mono tracking-tight">₹{filteredData.reduce((s, r) => s + r.total, 0).toLocaleString('en-IN')}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Tuition Collected</p>
          <h3 className="text-3xl font-black text-[#111111] font-mono tracking-tight">₹{filteredData.reduce((s, r) => s + r.tuition, 0).toLocaleString('en-IN')}</h3>
        </div>
      </div>

      {/* --- ADVANCED FILTERS & DATA TABLE --- */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        
        {/* Filters Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
          <div className="relative w-full sm:w-[400px]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="text"
              placeholder={`Search by ${view === 'monthly' ? 'Month (e.g. May)' : 'Year (e.g. 2026)'}...`}
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all text-sm font-bold text-gray-900 shadow-sm placeholder-gray-400"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">{view === 'monthly' ? 'Month' : 'Academic Year'}</th>
                <th className="px-6 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Tuition</th>
                <th className="px-6 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Practical</th>
                <th className="px-6 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Add Fee</th>
                <th className="px-6 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">STA</th>
                <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <AnimatePresence>
                {paginatedData.map((row) => (
                  <motion.tr 
                    key={row.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -10 }}
                    className="hover:bg-orange-50/30 transition-colors group"
                  >
                    <td className="px-8 py-5 whitespace-nowrap font-black text-gray-900">{row.period}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-right font-medium text-gray-700 font-mono">{row.tuition > 0 ? `₹${row.tuition.toLocaleString('en-IN')}` : '-'}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-right font-medium text-gray-700 font-mono">{row.practical > 0 ? `₹${row.practical.toLocaleString('en-IN')}` : '-'}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-right font-medium text-gray-700 font-mono">{row.addFee > 0 ? `₹${row.addFee.toLocaleString('en-IN')}` : '-'}</td>
                    <td className="px-6 py-5 whitespace-nowrap text-right font-medium text-gray-700 font-mono">{row.sta > 0 ? `₹${row.sta.toLocaleString('en-IN')}` : '-'}</td>
                    <td className="px-8 py-5 whitespace-nowrap text-right">
                      <span className="text-base font-black text-[#111111] font-mono tracking-tight">₹{row.total.toLocaleString('en-IN')}</span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {paginatedData.length === 0 && (
            <div className="py-20 text-center text-gray-400 bg-gray-50/50">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
              <p className="text-sm font-bold">No records found matching your filters.</p>
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        {totalPages > 0 && (
          <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} records
            </span>
            <div className="flex gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-white disabled:opacity-50 transition-colors shadow-sm">Previous</button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button key={idx + 1} onClick={() => setCurrentPage(idx + 1)} className={`w-9 h-9 rounded-lg text-xs font-bold transition-all shadow-sm ${currentPage === idx + 1 ? 'bg-[#111111] text-white' : 'text-gray-700 hover:bg-white border border-gray-200'}`}>{idx + 1}</button>
                ))}
              </div>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-white disabled:opacity-50 transition-colors shadow-sm">Next</button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}