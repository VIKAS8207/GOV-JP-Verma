// src/pages/reports/TransactionalReport.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Mock Transaction Data
const initialTransactions = [
  { id: 1, txnId: 'TXN-884920112', date: 'May 25, 2026', time: '10:45 AM', studentName: 'Aarav Sharma', regNo: 'REG-2026-8891', course: 'B.Tech Computer Science', amount: 53100, method: 'Credit Card', status: 'Success' },
  { id: 2, txnId: 'TXN-399281774', date: 'May 25, 2026', time: '09:12 AM', studentName: 'Priya Patel', regNo: 'REG-2026-3342', course: 'MBA', amount: 48500, method: 'UPI', status: 'Success' },
  { id: 3, txnId: 'TXN-993827110', date: 'May 24, 2026', time: '04:30 PM', studentName: 'Rohan Verma', regNo: 'REG-2026-1198', course: 'B.A First Year', amount: 15400, method: 'Net Banking', status: 'Failed' },
  { id: 4, txnId: 'TXN-554829100', date: 'April 14, 2026', time: '02:15 PM', studentName: 'Sneha Gupta', regNo: 'REG-2026-5567', course: 'B.Com First Year', amount: 22000, method: 'Debit Card', status: 'Success' },
  { id: 5, txnId: 'TXN-774829331', date: 'April 10, 2026', time: '11:20 AM', studentName: 'Kabir Singh', regNo: 'REG-2026-8822', course: 'BCA', amount: 31000, method: 'UPI', status: 'Pending' },
  { id: 6, txnId: 'TXN-229485771', date: 'March 23, 2026', time: '09:05 AM', studentName: 'Meera Rajput', regNo: 'REG-2026-9901', course: 'B.Tech Civil', amount: 53100, method: 'Credit Card', status: 'Success' },
];

// Helper to extract unique months from data (e.g., "May 2026")
const getUniqueMonths = (data) => {
  const months = data.map(item => {
    const parts = item.date.split(' '); // e.g., ["May", "25,", "2026"]
    return `${parts[0]} ${parts[2]}`;
  });
  return [...new Set(months)];
};

export default function TransactionalReport() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [monthFilter, setMonthFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReceipt, setSelectedReceipt] = useState(null); // State for receipt modal

  const itemsPerPage = 5;
  const availableMonths = getUniqueMonths(initialTransactions);

  // Filter Logic
  const filteredData = useMemo(() => {
    return initialTransactions.filter(item => {
      const matchSearch = item.txnId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.regNo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchStatus = statusFilter === 'All' || item.status === statusFilter;
      
      const itemMonthYear = `${item.date.split(' ')[0]} ${item.date.split(' ')[2]}`;
      const matchMonth = monthFilter === 'All' || itemMonthYear === monthFilter;

      return matchSearch && matchStatus && matchMonth;
    });
  }, [searchTerm, statusFilter, monthFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Aggregated Metrics
  const totalVolume = filteredData.length;
  const successfulTxns = filteredData.filter(t => t.status === 'Success');
  const totalClearedRevenue = successfulTxns.reduce((sum, item) => sum + item.amount, 0);
  const failedAmount = filteredData.filter(t => t.status === 'Failed').reduce((sum, item) => sum + item.amount, 0);

  // --- PDF EXPORT FUNCTION ---
  const handleExportPDF = () => {
    const doc = new jsPDF('landscape');
    
    doc.setFontSize(18);
    doc.setTextColor(17, 17, 17);
    doc.text('Transaction Master Ledger', 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleString()} | Filter: ${monthFilter} | Status: ${statusFilter}`, 14, 30);

    const tableColumn = ["TXN ID", "Date & Time", "Student Name", "Reg No", "Course", "Method", "Amount", "Status"];
    const tableRows = [];

    filteredData.forEach(item => {
      const rowData = [
        item.txnId,
        `${item.date} ${item.time}`,
        item.studentName,
        item.regNo,
        item.course,
        item.method,
        `Rs. ${item.amount.toLocaleString('en-IN')}`,
        item.status
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

    doc.save(`Transaction_Report_${new Date().getTime()}.pdf`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[1600px] mx-auto space-y-8 relative">
      
      {/* --- RECEIPT MODAL --- */}
      <AnimatePresence>
        {selectedReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedReceipt(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
            >
              <div className="p-6 bg-gray-50 border-b border-gray-100 text-center relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#EE6132]"></div>
                <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest">Transaction Receipt</h2>
                <p className="text-xs font-bold text-green-600 mt-1 flex items-center justify-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  Payment Successful
                </p>
              </div>
              
              <div className="p-8 space-y-5">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">TXN ID</span>
                  <span className="text-sm font-black text-gray-900 font-mono">{selectedReceipt.txnId}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Date & Time</span>
                  <span className="text-sm font-bold text-gray-900">{selectedReceipt.date} • {selectedReceipt.time}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Student Name</span>
                  <span className="text-sm font-bold text-gray-900">{selectedReceipt.studentName}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Registration No</span>
                  <span className="text-sm font-bold text-gray-900">{selectedReceipt.regNo}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Course</span>
                  <span className="text-sm font-bold text-gray-900">{selectedReceipt.course}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Payment Method</span>
                  <span className="text-sm font-bold text-gray-900">{selectedReceipt.method}</span>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-xl flex justify-between items-center mt-2 border border-orange-100">
                  <span className="text-sm font-black text-gray-700 uppercase tracking-widest">Amount Paid</span>
                  <span className="text-2xl font-black text-[#EE6132] font-mono tracking-tight">₹{selectedReceipt.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
                <button onClick={() => setSelectedReceipt(null)} className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-100 transition-colors shadow-sm">
                  Close
                </button>
                <button onClick={() => { alert("Downloading Receipt PDF..."); setSelectedReceipt(null); }} className="flex-1 py-3 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-md flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  Download
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Transaction Master Ledger</h2>
          <p className="text-gray-500 mt-1">Real-time view of all gateway payments, bank transfers, and failures.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Export PDF Report
          </button>
        </div>
      </div>

      {/* --- KPI SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Cleared Revenue</p>
            <span className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded">Live</span>
          </div>
          <h3 className="text-3xl font-black text-[#111111] font-mono tracking-tight">₹{totalClearedRevenue.toLocaleString('en-IN')}</h3>
          <p className="text-xs font-bold text-gray-500 mt-2">From {successfulTxns.length} successful transactions</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Transaction Volume</p>
          <h3 className="text-3xl font-black text-[#111111]">{totalVolume}</h3>
          <p className="text-xs font-bold text-gray-500 mt-2">Total attempts logged in system</p>
        </div>
        
        <div className="bg-[#111111] p-6 rounded-2xl border border-gray-800 shadow-lg flex flex-col justify-center text-white relative overflow-hidden">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 relative z-10">Failed / Dropped Value</p>
          <h3 className="text-3xl font-black text-red-400 font-mono tracking-tight relative z-10">₹{failedAmount.toLocaleString('en-IN')}</h3>
          <p className="text-xs font-medium text-gray-400 mt-2 relative z-10">Requires admin review</p>
        </div>
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        
        {/* Toolbar & Filters */}
        <div className="p-6 border-b border-gray-100 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 bg-gray-50/50">
          
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
            {/* Search Bar */}
            <div className="relative w-full sm:w-[350px]">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input
                type="text"
                placeholder="Search TXN ID, Name, or Reg No..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all text-sm font-bold text-gray-900 shadow-sm placeholder-gray-400"
              />
            </div>

            {/* Month Filter */}
            <select 
              value={monthFilter}
              onChange={(e) => { setMonthFilter(e.target.value); setCurrentPage(1); }}
              className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 shadow-sm appearance-none cursor-pointer"
            >
              <option value="All">All Months</option>
              {availableMonths.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select 
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 text-sm font-bold py-3 px-4 rounded-xl outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 shadow-sm appearance-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Success">Success</option>
              <option value="Failed">Failed</option>
              <option value="Pending">Pending</option>
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
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Transaction Info</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Candidate Details</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Method & Program</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <AnimatePresence>
                {paginatedData.map((item) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -10 }}
                    className="hover:bg-orange-50/30 transition-colors group"
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-900 font-mono tracking-tight">{item.txnId}</span>
                        <span className="text-[11px] font-bold text-gray-500 mt-1">{item.date} • {item.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{item.studentName}</span>
                        <span className="text-xs font-bold text-gray-500 mt-0.5">{item.regNo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-700">{item.course}</span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 border border-gray-200 bg-gray-50 px-2 py-0.5 rounded w-fit">{item.method}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-base font-black text-[#111111] font-mono tracking-tight">₹{item.amount.toLocaleString('en-IN')}</span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md border ${
                        item.status === 'Success' ? 'bg-green-50 text-green-700 border-green-100' :
                        item.status === 'Failed' ? 'bg-red-50 text-red-700 border-red-100' :
                        'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      {item.status === 'Success' ? (
                        <button 
                          onClick={() => setSelectedReceipt(item)}
                          className="text-[#EE6132] hover:text-[#d9562a] font-bold text-sm flex items-center justify-end gap-1 ml-auto transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                          View
                        </button>
                      ) : (
                        <span className="text-gray-300 font-bold text-sm mr-4">—</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {paginatedData.length === 0 && (
            <div className="py-20 text-center text-gray-400 bg-gray-50/50">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <p className="text-sm font-bold">No transactions found matching your criteria.</p>
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