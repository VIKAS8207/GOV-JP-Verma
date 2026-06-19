// src/pages/reports/SubFeeHeadReport.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Mock Data for Sub Fee Heads (Granular Fees)
const initialSubFeeData = [
  { id: 1, txnId: 'SF-1001', date: 'May 25, 2026', studentName: 'Aarav Sharma', course: 'B.Tech Computer Science', subHead: 'Library Fine', amount: 250, status: 'Cleared' },
  { id: 2, txnId: 'SF-1002', date: 'May 24, 2026', studentName: 'Priya Patel', course: 'MBA', subHead: 'Late Registration Penalty', amount: 1000, status: 'Pending' },
  { id: 3, txnId: 'SF-1003', date: 'May 22, 2026', studentName: 'Rohan Verma', course: 'B.A First Year', subHead: 'Sports Event Fee', amount: 500, status: 'Cleared' },
  { id: 4, txnId: 'SF-1004', date: 'April 15, 2026', studentName: 'Sneha Gupta', course: 'B.Com First Year', subHead: 'Duplicate ID Card', amount: 150, status: 'Cleared' },
  { id: 5, txnId: 'SF-1005', date: 'April 10, 2026', studentName: 'Kabir Singh', course: 'BCA First Year', subHead: 'Library Fine', amount: 100, status: 'Pending' },
  { id: 6, txnId: 'SF-1006', date: 'March 28, 2026', studentName: 'Meera Rajput', course: 'B.Tech Civil', subHead: 'Hostel Maintenance', amount: 2000, status: 'Cleared' },
  { id: 7, txnId: 'SF-1007', date: 'March 15, 2026', studentName: 'Karan Johar', course: 'B.Sc First year', subHead: 'Lab Breakage Fine', amount: 800, status: 'Cleared' },
];

// Helper to extract unique months
const getUniqueMonths = (data) => {
  const months = data.map(item => {
    const parts = item.date.split(' ');
    return `${parts[0]} ${parts[2]}`;
  });
  return [...new Set(months)];
};

export default function SubFeeHeadReport() {
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [subHeadFilter, setSubHeadFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [monthFilter, setMonthFilter] = useState('All');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const availableMonths = getUniqueMonths(initialSubFeeData);
  const availableSubHeads = [...new Set(initialSubFeeData.map(item => item.subHead))];

  // Filter Logic
  const filteredData = useMemo(() => {
    return initialSubFeeData.filter(item => {
      const matchSearch = item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.txnId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCourse = courseFilter === 'All' || item.course === courseFilter;
      const matchSubHead = subHeadFilter === 'All' || item.subHead === subHeadFilter;
      const matchStatus = statusFilter === 'All' || item.status === statusFilter;
      
      const itemMonthYear = `${item.date.split(' ')[0]} ${item.date.split(' ')[2]}`;
      const matchMonth = monthFilter === 'All' || itemMonthYear === monthFilter;

      return matchSearch && matchCourse && matchSubHead && matchStatus && matchMonth;
    });
  }, [searchTerm, courseFilter, subHeadFilter, statusFilter, monthFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Aggregated KPIs based on filtered data
  const totalClearedAmount = filteredData.filter(item => item.status === 'Cleared').reduce((sum, item) => sum + item.amount, 0);
  const totalPendingAmount = filteredData.filter(item => item.status === 'Pending').reduce((sum, item) => sum + item.amount, 0);

  // Reset pagination when filters change
  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  // --- PDF EXPORT FUNCTION ---
  const handleExportPDF = () => {
    const doc = new jsPDF('landscape');
    
    doc.setFontSize(18);
    doc.setTextColor(17, 17, 17);
    doc.text('Sub Fee Head Report', 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

    const tableColumn = ["S.No", "TXN ID", "Date", "Student Name", "Course", "Sub-Fee Head", "Status", "Amount"];
    const tableRows = [];

    filteredData.forEach((item, index) => {
      const rowData = [
        index + 1,
        item.txnId,
        item.date,
        item.studentName,
        item.course,
        item.subHead,
        item.status,
        `Rs. ${item.amount.toLocaleString('en-IN')}`
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: 'grid',
      headStyles: { fillColor: [238, 97, 50], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 9, cellPadding: 4 },
      alternateRowStyles: { fillColor: [253, 248, 245] },
    });

    doc.save(`Sub_Fee_Head_Report_${new Date().getTime()}.pdf`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[1600px] mx-auto space-y-8">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Sub Fee Head Report</h2>
          <p className="text-gray-500 mt-1">Detailed tracking of miscellaneous, penalty, and granular fee collections.</p>
        </div>
        
        <button 
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-md shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
          Export PDF Report
        </button>
      </div>

      {/* --- KPI SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Cleared Amount</p>
          <h3 className="text-3xl font-black text-[#EE6132] font-mono tracking-tight">₹{totalClearedAmount.toLocaleString('en-IN')}</h3>
          <p className="text-xs font-bold text-gray-500 mt-2">Successfully collected in filtered view</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Pending Dues</p>
          <h3 className="text-3xl font-black text-red-500 font-mono tracking-tight">₹{totalPendingAmount.toLocaleString('en-IN')}</h3>
          <p className="text-xs font-bold text-gray-500 mt-2">Requires administrative follow-up</p>
        </div>

        <div className="bg-[#111111] p-6 rounded-2xl shadow-lg flex flex-col justify-center text-white relative overflow-hidden">
          
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 relative z-10">Filtered Records</p>
          <h3 className="text-3xl font-black text-white font-mono tracking-tight relative z-10">{filteredData.length}</h3>
          <p className="text-xs font-medium text-gray-400 mt-2 relative z-10">Active transactions matching criteria</p>
        </div>
      </div>

      {/* --- ADVANCED FILTERS & DATA TABLE --- */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        
        {/* Filters Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-gray-50/50">
          
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 flex-wrap">
            {/* Search */}
            <div className="relative w-full sm:w-[250px] shrink-0">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input
                type="text"
                placeholder="Search Name or TXN ID..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all text-sm font-bold text-gray-900 shadow-sm placeholder-gray-400"
              />
            </div>

            {/* Month Filter */}
            <select 
              value={monthFilter} 
              onChange={(e) => handleFilterChange(setMonthFilter, e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-xs font-bold py-3 px-4 rounded-xl outline-none focus:border-[#EE6132] shadow-sm appearance-none cursor-pointer"
            >
              <option value="All">All Months</option>
              {availableMonths.map(m => <option key={m} value={m}>{m}</option>)}
            </select>

            {/* Course Filter */}
            <select 
              value={courseFilter} 
              onChange={(e) => handleFilterChange(setCourseFilter, e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-xs font-bold py-3 px-4 rounded-xl outline-none focus:border-[#EE6132] shadow-sm appearance-none cursor-pointer"
            >
              <option value="All">All Courses</option>
              <option value="B.Tech Computer Science">B.Tech Computer Science</option>
              <option value="B.A First Year">B.A First Year</option>
              <option value="BCA First Year">BCA First Year</option>
              <option value="B.Com First Year">B.Com First Year</option>
              <option value="MBA">MBA</option>
            </select>

            {/* Sub-Head Filter */}
            <select 
              value={subHeadFilter} 
              onChange={(e) => handleFilterChange(setSubHeadFilter, e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-xs font-bold py-3 px-4 rounded-xl outline-none focus:border-[#EE6132] shadow-sm appearance-none cursor-pointer"
            >
              <option value="All">All Sub-Heads</option>
              {availableSubHeads.map(sh => <option key={sh} value={sh}>{sh}</option>)}
            </select>

            {/* Status Filter */}
            <select 
              value={statusFilter} 
              onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-xs font-bold py-3 px-4 rounded-xl outline-none focus:border-[#EE6132] shadow-sm appearance-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Cleared">Cleared</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest w-16">S.No</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Transaction Info</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Student & Course</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Sub-Fee Head</th>
                <th className="px-6 py-5 text-center text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Amount</th>
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
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-400">
                      {((currentPage - 1) * itemsPerPage + index + 1).toString().padStart(2, '0')}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-900 font-mono tracking-tight">{item.txnId}</span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">{item.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold text-gray-900">{item.studentName}</span>
                        <span className="text-xs font-bold text-gray-500">{item.course}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="px-3 py-1.5 bg-gray-100 text-gray-800 text-[10px] uppercase tracking-wider font-bold rounded-lg border border-gray-200">
                        {item.subHead}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <span className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md border ${
                        item.status === 'Cleared' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-right">
                      <span className="text-base font-black text-[#111111] font-mono tracking-tight">₹{item.amount.toLocaleString('en-IN')}</span>
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