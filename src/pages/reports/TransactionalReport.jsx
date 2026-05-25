// src/pages/reports/TransactionalReport.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Transaction Data
const initialTransactions = [
  { id: 1, txnId: 'TXN-884920112', date: 'May 25, 2026', time: '10:45 AM', studentName: 'Aarav Sharma', regNo: 'REG-2026-8891', course: 'B.Tech Computer Science', amount: 53100, method: 'Credit Card', status: 'Success' },
  { id: 2, txnId: 'TXN-399281774', date: 'May 25, 2026', time: '09:12 AM', studentName: 'Priya Patel', regNo: 'REG-2026-3342', course: 'MBA', amount: 48500, method: 'UPI', status: 'Success' },
  { id: 3, txnId: 'TXN-993827110', date: 'May 24, 2026', time: '04:30 PM', studentName: 'Rohan Verma', regNo: 'REG-2026-1198', course: 'B.A First Year', amount: 15400, method: 'Net Banking', status: 'Failed' },
  { id: 4, txnId: 'TXN-554829100', date: 'May 24, 2026', time: '02:15 PM', studentName: 'Sneha Gupta', regNo: 'REG-2026-5567', course: 'B.Com First Year', amount: 22000, method: 'Debit Card', status: 'Success' },
  { id: 5, txnId: 'TXN-774829331', date: 'May 23, 2026', time: '11:20 AM', studentName: 'Kabir Singh', regNo: 'REG-2026-8822', course: 'BCA', amount: 31000, method: 'UPI', status: 'Pending' },
  { id: 6, txnId: 'TXN-229485771', date: 'May 23, 2026', time: '09:05 AM', studentName: 'Meera Rajput', regNo: 'REG-2026-9901', course: 'B.Tech Civil', amount: 53100, method: 'Credit Card', status: 'Success' },
];

export default function TransactionalReport() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Search Logic (Searches by TXN ID, Name, or Reg No)
  const filteredData = initialTransactions.filter(item => 
    item.txnId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.regNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Aggregated Metrics
  const totalVolume = initialTransactions.length;
  const successfulTxns = initialTransactions.filter(t => t.status === 'Success');
  const totalClearedRevenue = successfulTxns.reduce((sum, item) => sum + item.amount, 0);
  const failedAmount = initialTransactions.filter(t => t.status === 'Failed').reduce((sum, item) => sum + item.amount, 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[1600px] mx-auto space-y-8">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Transaction Master Ledger</h2>
          <p className="text-gray-500 mt-1">Real-time view of all gateway payments, bank transfers, and failures.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Date Range
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#EE6132] text-white font-bold text-sm rounded-xl hover:bg-[#d9562a] transition-colors shadow-md">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Download CSV
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
          <div className="absolute right-0 top-0 opacity-10">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4l7.5 14h-15L12 6zm-1 4v5h2v-5h-2zm0 7v2h2v-2h-2z"></path></svg>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 relative z-10">Failed / Dropped Value</p>
          <h3 className="text-3xl font-black text-red-400 font-mono tracking-tight relative z-10">₹{failedAmount.toLocaleString('en-IN')}</h3>
          <p className="text-xs font-medium text-gray-400 mt-2 relative z-10">Requires admin review</p>
        </div>
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
          <div className="relative w-full sm:w-[450px]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="text"
              placeholder="Search by TXN ID, Student Name, or Reg No..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all text-sm font-bold text-gray-900 shadow-sm placeholder-gray-400"
            />
          </div>
          <div className="flex gap-2 shrink-0">
            <select className="bg-white border border-gray-200 text-gray-700 text-xs font-bold py-2.5 px-4 rounded-lg outline-none focus:border-[#EE6132] shadow-sm">
              <option value="all">All Statuses</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
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
                        <button className="text-[#EE6132] hover:text-[#d9562a] font-bold text-sm flex items-center justify-end gap-1 ml-auto transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                          View
                        </button>
                      ) : (
                        <span className="text-gray-300 font-bold text-sm">—</span>
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