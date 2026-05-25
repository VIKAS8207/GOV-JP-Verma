// src/pages/reports/CourseWiseReport.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Analytical Data
const initialReportData = [
  { id: 1, course: 'B.Tech Computer Science', totalStudents: 450, male: 300, female: 150, expectedFee: 45000000, collectedFee: 42000000, pendingFee: 3000000 },
  { id: 2, course: 'B.A First Year', totalStudents: 320, male: 120, female: 200, expectedFee: 9600000, collectedFee: 9000000, pendingFee: 600000 },
  { id: 3, course: 'MBA', totalStudents: 180, male: 100, female: 80, expectedFee: 27000000, collectedFee: 20000000, pendingFee: 7000000 },
  { id: 4, course: 'BCA First Year', totalStudents: 250, male: 180, female: 70, expectedFee: 15000000, collectedFee: 14500000, pendingFee: 500000 },
  { id: 5, course: 'B.Com Second Year', totalStudents: 290, male: 160, female: 130, expectedFee: 11600000, collectedFee: 10000000, pendingFee: 1600000 },
];

export default function CourseWiseReport() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter Logic
  const filteredData = initialReportData.filter(item => 
    item.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Aggregated Metrics
  const totalEnrollment = filteredData.reduce((sum, item) => sum + item.totalStudents, 0);
  const totalCollected = filteredData.reduce((sum, item) => sum + item.collectedFee, 0);
  const totalPending = filteredData.reduce((sum, item) => sum + item.pendingFee, 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[1600px] mx-auto space-y-8">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Course-Wise Analytics</h2>
          <p className="text-gray-500 mt-1">Monitor enrollment and financial performance across all programs.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
            Filter Data
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-md">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Export Report
          </button>
        </div>
      </div>

      {/* --- KPI SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Enrollment</p>
            <h3 className="text-3xl font-black text-[#111111]">{totalEnrollment.toLocaleString()}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Realized Revenue</p>
            <h3 className="text-3xl font-black text-green-600">₹{(totalCollected / 10000000).toFixed(2)}Cr</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Outstanding Dues</p>
            <h3 className="text-3xl font-black text-red-500">₹{(totalPending / 100000).toFixed(2)}L</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
        </div>
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="text"
              placeholder="Search by course name..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all text-sm font-medium text-gray-900 shadow-sm"
            />
          </div>
          <span className="px-4 py-2 bg-orange-50 text-[#EE6132] text-xs font-extrabold uppercase tracking-widest rounded-lg border border-orange-100 shrink-0 shadow-sm">
            {filteredData.length} Courses Found
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest w-16">S.No</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Course Name</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Enrollment Stats</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Revenue Status</th>
                <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Outstanding</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <AnimatePresence>
                {paginatedData.map((item, index) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -10 }}
                    className="hover:bg-orange-50/30 transition-colors group"
                  >
                    <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-gray-400">
                      {((currentPage - 1) * itemsPerPage + index + 1).toString().padStart(2, '0')}
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold text-gray-900">{item.course}</p>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-gray-900">{item.totalStudents}</span>
                        <div className="flex gap-1.5">
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded border border-blue-100">M: {item.male}</span>
                          <span className="px-2 py-0.5 bg-pink-50 text-pink-600 text-[10px] font-bold uppercase rounded border border-pink-100">F: {item.female}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold text-gray-500">Exp: ₹{(item.expectedFee / 100000).toFixed(2)}L</span>
                        <span className="text-sm font-black text-green-600">Col: ₹{(item.collectedFee / 100000).toFixed(2)}L</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-right">
                      <span className="text-base font-black text-red-500 font-mono tracking-tight">₹{(item.pendingFee / 100000).toFixed(2)}L</span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {paginatedData.length === 0 && (
            <div className="py-20 text-center text-gray-400 bg-gray-50/50">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              <p className="text-sm font-bold">No course data found matching your search.</p>
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        {totalPages > 0 && (
          <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length}
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