// src/pages/reports/GovtReport.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Expanded Mock Data with Course breakdowns
const govtData = {
  yearly: [
    { id: 1, period: '2026-2027', course: 'B.Tech Computer Science', tuition: 15000000, practical: 5000000, addFee: 200000, sta: 100000, total: 20300000 },
    { id: 2, period: '2026-2027', course: 'MBA', tuition: 12000000, practical: 1000000, addFee: 150000, sta: 50000, total: 13200000 },
    { id: 3, period: '2026-2027', course: 'B.A First Year', tuition: 3000000, practical: 2000000, addFee: 50000, sta: 25000, total: 5075000 },
    { id: 4, period: '2025-2026', course: 'B.Tech Computer Science', tuition: 14000000, practical: 4500000, addFee: 180000, sta: 90000, total: 18770000 },
    { id: 5, period: '2025-2026', course: 'MBA', tuition: 11000000, practical: 900000, addFee: 140000, sta: 45000, total: 12085000 },
    { id: 6, period: '2025-2026', course: 'BCA First Year', tuition: 6000000, practical: 2000000, addFee: 100000, sta: 50000, total: 8150000 },
  ],
  monthly: [
    { id: 7, period: 'May 2026', course: 'B.Tech Computer Science', tuition: 1500000, practical: 400000, addFee: 20000, sta: 10000, total: 1930000 },
    { id: 8, period: 'May 2026', course: 'MBA', tuition: 1200000, practical: 100000, addFee: 15000, sta: 5000, total: 1320000 },
    { id: 9, period: 'May 2026', course: 'B.A First Year', tuition: 300000, practical: 200000, addFee: 5000, sta: 2500, total: 507500 },
    { id: 10, period: 'April 2026', course: 'B.Tech Computer Science', tuition: 1200000, practical: 350000, addFee: 15000, sta: 8000, total: 1573000 },
    { id: 11, period: 'April 2026', course: 'B.Com Second Year', tuition: 800000, practical: 50000, addFee: 10000, sta: 4000, total: 864000 },
    { id: 12, period: 'March 2026', course: 'BCA First Year', tuition: 900000, practical: 300000, addFee: 12000, sta: 6000, total: 1218000 },
    { id: 13, period: 'March 2026', course: 'MBA', tuition: 1000000, practical: 80000, addFee: 10000, sta: 5000, total: 1095000 },
  ]
};

export default function GovtReport() {
  const [view, setView] = useState('monthly'); // 'monthly' or 'yearly'
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const currentData = view === 'monthly' ? govtData.monthly : govtData.yearly;

  // Filter Logic
  const filteredData = useMemo(() => {
    return currentData.filter(item => {
      const matchSearch = item.period.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.course.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCourse = courseFilter === 'All' || item.course === courseFilter;
      return matchSearch && matchCourse;
    });
  }, [currentData, searchTerm, courseFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Aggregated Metrics
  const totalRevenue = filteredData.reduce((sum, item) => sum + item.total, 0);
  const totalTuition = filteredData.reduce((sum, item) => sum + item.tuition, 0);

  // --- PDF EXPORT FUNCTION ---
  const handleExportPDF = () => {
    const doc = new jsPDF('landscape'); // Landscape for wide tables
    
    // Add Report Title
    doc.setFontSize(18);
    doc.setTextColor(17, 17, 17);
    doc.text('Government Funds Report', 14, 22);
    
    // Add Timestamp & Filters
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleString()} | View: ${view.toUpperCase()} | Course: ${courseFilter}`, 14, 30);

    // Define Table Columns
    const tableColumn = ["S.No", view === 'monthly' ? "Month & Year" : "Academic Year", "Course", "Tuition", "Practical", "Add Fee", "STA", "Total Amount"];
    const tableRows = [];

    // Map Data
    filteredData.forEach((item, index) => {
      const rowData = [
        index + 1,
        item.period,
        item.course,
        `Rs. ${item.tuition.toLocaleString('en-IN')}`,
        `Rs. ${item.practical.toLocaleString('en-IN')}`,
        `Rs. ${item.addFee.toLocaleString('en-IN')}`,
        `Rs. ${item.sta.toLocaleString('en-IN')}`,
        `Rs. ${item.total.toLocaleString('en-IN')}`
      ];
      tableRows.push(rowData);
    });

    // AutoTable Generation
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: 'grid',
      headStyles: { fillColor: [238, 97, 50], textColor: [255, 255, 255], fontStyle: 'bold' }, // #EE6132
      styles: { fontSize: 9, cellPadding: 4 },
      alternateRowStyles: { fillColor: [253, 248, 245] },
    });

    // Save the PDF
    doc.save(`Govt_Report_${view}_${new Date().getTime()}.pdf`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[1600px] mx-auto space-y-8">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Government Funds Report</h2>
          <p className="text-gray-500 mt-1">Consolidated view of government-regulated fee collections.</p>
        </div>
        
        <div className="flex gap-4 items-center">
          
          {/* Animated Toggle Switch */}
          <div className="flex bg-gray-100 p-1 rounded-xl relative shadow-inner">
            {['monthly', 'yearly'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setView(tab); setCurrentPage(1); }}
                className={`relative px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-colors duration-300 z-10 ${
                  view === tab ? 'text-[#EE6132]' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {view === tab && (
                  <motion.div 
                    layoutId="activeTabGovt" 
                    className="absolute inset-0 bg-white rounded-lg shadow-sm -z-10" 
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>

          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-md shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Export PDF Report
          </button>
        </div>
      </div>

      {/* --- KPI SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Govt Revenue ({view === 'monthly' ? 'Filtered Months' : 'Filtered Years'})</p>
          <h3 className="text-3xl font-black text-[#EE6132] font-mono tracking-tight">₹{totalRevenue.toLocaleString('en-IN')}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Tuition Collected</p>
          <h3 className="text-3xl font-black text-[#111111] font-mono tracking-tight">₹{totalTuition.toLocaleString('en-IN')}</h3>
        </div>
      </div>

      {/* --- ADVANCED FILTERS & DATA TABLE --- */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        
        {/* Filters Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
            
            {/* Search */}
            <div className="relative w-full sm:w-[300px]">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input
                type="text"
                placeholder={`Search ${view === 'monthly' ? 'Month' : 'Year'} or Course...`}
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all text-sm font-bold text-gray-900 shadow-sm placeholder-gray-400"
              />
            </div>

            {/* Course Filter */}
            <select 
              value={courseFilter} 
              onChange={(e) => { setCourseFilter(e.target.value); setCurrentPage(1); }}
              className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 shadow-sm appearance-none cursor-pointer"
            >
              <option value="All">All Courses</option>
              <option value="B.Tech Computer Science">B.Tech Computer Science</option>
              <option value="B.A First Year">B.A First Year</option>
              <option value="BCA First Year">BCA First Year</option>
              <option value="B.Com Second Year">B.Com Second Year</option>
              <option value="MBA">MBA</option>
            </select>
          </div>

          <span className="px-4 py-2 bg-orange-50 text-[#EE6132] text-xs font-extrabold uppercase tracking-widest rounded-lg border border-orange-100 shrink-0 shadow-sm">
            {filteredData.length} Records Found
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest w-16">S.No</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">{view === 'monthly' ? 'Month & Year' : 'Academic Year'}</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Course</th>
                <th className="px-6 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Tuition</th>
                <th className="px-6 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Practical</th>
                <th className="px-6 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Add Fee</th>
                <th className="px-6 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">STA</th>
                <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <AnimatePresence>
                {paginatedData.map((row, index) => (
                  <motion.tr 
                    key={row.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -10 }}
                    className="hover:bg-orange-50/30 transition-colors group"
                  >
                    <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-gray-400">
                      {((currentPage - 1) * itemsPerPage + index + 1).toString().padStart(2, '0')}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap font-black text-gray-900">{row.period}</td>
                    <td className="px-6 py-5 whitespace-nowrap font-bold text-gray-700">{row.course}</td>
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