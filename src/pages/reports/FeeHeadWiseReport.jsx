// src/pages/reports/FeeHeadWiseReport.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Mock Transaction Data with detailed Fee Head breakdowns and Demographics
const initialFeeHeadData = [
  { id: 1, txnId: 'TXN-884920112', date: 'May 25, 2026', studentName: 'Aarav Sharma', course: 'B.Tech', branch: 'Computer Science', caste: 'General', gender: 'Male', fees: { tuition: 40000, practical: 5000, pd_af: 1500, other: 800 }, total: 47300 },
  { id: 2, txnId: 'TXN-399281774', date: 'May 25, 2026', studentName: 'Priya Patel', course: 'MBA', branch: 'Marketing & Finance', caste: 'OBC/UR', gender: 'Female', fees: { tuition: 35000, practical: 0, pd_af: 2000, other: 1500 }, total: 38500 },
  { id: 3, txnId: 'TXN-993827110', date: 'May 24, 2026', studentName: 'Rohan Verma', course: 'B.A First Year', branch: 'General', caste: 'SC/ST', gender: 'Male', fees: { tuition: 0, practical: 2000, pd_af: 500, other: 500 }, total: 3000 },
  { id: 4, txnId: 'TXN-554829100', date: 'May 24, 2026', studentName: 'Sneha Gupta', course: 'B.Com First Year', branch: 'General', caste: 'General', gender: 'Female', fees: { tuition: 15000, practical: 1000, pd_af: 1000, other: 500 }, total: 17500 },
  { id: 5, txnId: 'TXN-774829331', date: 'May 23, 2026', studentName: 'Kabir Singh', course: 'B.Sc First year', branch: 'Computer Science', caste: 'OBC/UR', gender: 'Male', fees: { tuition: 25000, practical: 3000, pd_af: 1200, other: 800 }, total: 30000 },
  { id: 6, txnId: 'TXN-229485771', date: 'May 23, 2026', studentName: 'Meera Rajput', course: 'B.A First Year', branch: 'Home Science', caste: 'General', gender: 'Female', fees: { tuition: 12000, practical: 0, pd_af: 800, other: 200 }, total: 13000 },
];

export default function FeeHeadWiseReport() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Advanced Filters
  const [courseFilter, setCourseFilter] = useState('All');
  const [branchFilter, setBranchFilter] = useState('All');
  const [casteFilter, setCasteFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Extract unique branches for the new filter dropdown
  const availableBranches = [...new Set(initialFeeHeadData.map(item => item.branch))];

  // Filter Logic
  const filteredData = useMemo(() => {
    return initialFeeHeadData.filter(item => {
      const matchSearch = item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || item.txnId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCourse = courseFilter === 'All' || item.course === courseFilter;
      const matchBranch = branchFilter === 'All' || item.branch === branchFilter;
      const matchCaste = casteFilter === 'All' || item.caste === casteFilter;
      const matchGender = genderFilter === 'All' || item.gender === genderFilter;
      
      return matchSearch && matchCourse && matchBranch && matchCaste && matchGender;
    });
  }, [searchTerm, courseFilter, branchFilter, casteFilter, genderFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Aggregated KPIs based on filtered data
  const totalRevenue = filteredData.reduce((sum, item) => sum + item.total, 0);
  const totalTuition = filteredData.reduce((sum, item) => sum + item.fees.tuition, 0);
  const totalPractical = filteredData.reduce((sum, item) => sum + item.fees.practical, 0);

  // Reset pagination when filters change
  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  // --- PDF EXPORT FUNCTION ---
  const handleExportPDF = () => {
    const doc = new jsPDF('landscape'); // Landscape for wide tables
    
    // Add Report Title
    doc.setFontSize(18);
    doc.setTextColor(17, 17, 17);
    doc.text('Fee Head Wise Report', 14, 22);
    
    // Add Timestamp
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

    // Define Table Columns and Rows
    const tableColumn = ["S.No", "TXN ID", "Student Name", "Course", "Branch", "Tuition", "Practical", "PD/AF", "Other", "Total"];
    const tableRows = [];

    filteredData.forEach((item, index) => {
      const rowData = [
        index + 1,
        item.txnId,
        item.studentName,
        item.course,
        item.branch,
        `Rs. ${item.fees.tuition.toLocaleString('en-IN')}`,
        `Rs. ${item.fees.practical.toLocaleString('en-IN')}`,
        `Rs. ${item.fees.pd_af.toLocaleString('en-IN')}`,
        `Rs. ${item.fees.other.toLocaleString('en-IN')}`,
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
      styles: { fontSize: 9, cellPadding: 3 },
      alternateRowStyles: { fillColor: [253, 248, 245] },
    });

    // Save the PDF
    doc.save(`Fee_Head_Report_${new Date().getTime()}.pdf`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[1600px] mx-auto space-y-8">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Fee Head Wise Report</h2>
          <p className="text-gray-500 mt-1">Analyze revenue collections broken down by specific fee components and demographics.</p>
        </div>
        
        <button 
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-md shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Export PDF Report
        </button>
      </div>

      {/* --- KPI SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Filtered Total Revenue</p>
          <h3 className="text-3xl font-black text-[#EE6132] font-mono tracking-tight">₹{totalRevenue.toLocaleString('en-IN')}</h3>
          <p className="text-xs font-bold text-gray-500 mt-2">Across {filteredData.length} filtered transactions</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Tuition Fees Collected</p>
          <h3 className="text-3xl font-black text-[#111111] font-mono tracking-tight">₹{totalTuition.toLocaleString('en-IN')}</h3>
          <p className="text-xs font-bold text-gray-500 mt-2">Primary Academic Revenue</p>
        </div>

        <div className="bg-[#111111] p-6 rounded-2xl shadow-lg flex flex-col justify-center text-white relative overflow-hidden">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 relative z-10">Practical Fees Collected</p>
          <h3 className="text-3xl font-black text-blue-400 font-mono tracking-tight relative z-10">₹{totalPractical.toLocaleString('en-IN')}</h3>
          <p className="text-xs font-medium text-gray-400 mt-2 relative z-10">Laboratory & Equipment usage</p>
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

            {/* Demographics Filters */}
            <select 
              value={courseFilter} 
              onChange={(e) => handleFilterChange(setCourseFilter, e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-xs font-bold py-3 px-4 rounded-xl outline-none focus:border-[#EE6132] shadow-sm appearance-none cursor-pointer"
            >
              <option value="All">All Courses</option>
              <option value="B.Tech">B.Tech</option>
              <option value="B.A First Year">B.A First Year</option>
              <option value="B.Sc First year">B.Sc First year</option>
              <option value="B.Com First Year">B.Com First Year</option>
              <option value="MBA">MBA</option>
            </select>

            <select 
              value={branchFilter} 
              onChange={(e) => handleFilterChange(setBranchFilter, e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-xs font-bold py-3 px-4 rounded-xl outline-none focus:border-[#EE6132] shadow-sm appearance-none cursor-pointer"
            >
              <option value="All">All Branches</option>
              {availableBranches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>

            <select 
              value={casteFilter} 
              onChange={(e) => handleFilterChange(setCasteFilter, e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-xs font-bold py-3 px-4 rounded-xl outline-none focus:border-[#EE6132] shadow-sm appearance-none cursor-pointer"
            >
              <option value="All">All Castes</option>
              <option value="SC/ST">SC / ST</option>
              <option value="OBC/UR">OBC / UR</option>
              <option value="General">General</option>
            </select>

            <select 
              value={genderFilter} 
              onChange={(e) => handleFilterChange(setGenderFilter, e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-xs font-bold py-3 px-4 rounded-xl outline-none focus:border-[#EE6132] shadow-sm appearance-none cursor-pointer"
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          
          <span className="px-4 py-2 bg-orange-50 text-[#EE6132] text-xs font-extrabold uppercase tracking-widest rounded-lg border border-orange-100 shrink-0 shadow-sm mt-4 xl:mt-0">
            {filteredData.length} Records
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Transaction Info</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Demographics</th>
                <th className="px-6 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Tuition</th>
                <th className="px-6 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Practical</th>
                <th className="px-6 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">PD / AF</th>
                <th className="px-6 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Other</th>
                <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Total Amount</th>
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
                    {/* Txn & Student */}
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-900 font-mono tracking-tight">{item.txnId}</span>
                        <span className="text-xs font-bold text-gray-900 mt-1">{item.studentName}</span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">{item.date}</span>
                      </div>
                    </td>

                    {/* Demographics */}
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-sm font-bold text-gray-700">{item.course}</span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.branch}</span>
                        <div className="flex gap-2 mt-1">
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded border border-gray-200">{item.caste}</span>
                          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${item.gender === 'Female' ? 'bg-pink-50 text-pink-600 border-pink-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                            {item.gender}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Tuition */}
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <span className="text-sm font-medium text-gray-700 font-mono">
                        {item.fees.tuition > 0 ? `₹${item.fees.tuition.toLocaleString('en-IN')}` : '-'}
                      </span>
                    </td>

                    {/* Practical */}
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <span className="text-sm font-medium text-gray-700 font-mono">
                        {item.fees.practical > 0 ? `₹${item.fees.practical.toLocaleString('en-IN')}` : '-'}
                      </span>
                    </td>

                    {/* PD / AF */}
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <span className="text-sm font-medium text-gray-700 font-mono">
                        {item.fees.pd_af > 0 ? `₹${item.fees.pd_af.toLocaleString('en-IN')}` : '-'}
                      </span>
                    </td>

                    {/* Other */}
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <span className="text-sm font-medium text-gray-700 font-mono">
                        {item.fees.other > 0 ? `₹${item.fees.other.toLocaleString('en-IN')}` : '-'}
                      </span>
                    </td>

                    {/* Total Amount */}
                    <td className="px-8 py-5 whitespace-nowrap text-right">
                      <span className="text-base font-black text-[#111111] font-mono tracking-tight">₹{item.total.toLocaleString('en-IN')}</span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {paginatedData.length === 0 && (
            <div className="py-20 text-center text-gray-400 bg-gray-50/50">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
              <p className="text-sm font-bold">No fee records found matching your filters.</p>
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