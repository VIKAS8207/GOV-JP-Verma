// src/pages/MasterElectives.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Mock Data for Elective Subjects
const initialElectives = [
  { id: 1, subjectName: 'Artificial Intelligence', addedOn: '2026-05-20', status: 'Active' },
  { id: 2, subjectName: 'Cyber Security & Forensics', addedOn: '2026-05-21', status: 'Active' },
  { id: 3, subjectName: 'Digital Marketing', addedOn: '2026-05-22', status: 'Active' },
  { id: 4, subjectName: 'Internet of Things (IoT)', addedOn: '2026-05-23', status: 'Active' },
  { id: 5, subjectName: 'Business Analytics', addedOn: '2026-05-24', status: 'Active' },
];

export default function MasterElectives() {
  const [electives, setElectives] = useState(initialElectives);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // Search & Pagination States
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const defaultFormState = {
    subjectName: '',
    status: 'Active'
  };

  const [formData, setFormData] = useState(defaultFormState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- ACTIONS ---
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editId) {
      setElectives(electives.map(item => item.id === editId ? { ...formData, id: editId, addedOn: item.addedOn } : item));
      setEditId(null);
    } else {
      const newElective = { 
        id: Date.now(), 
        ...formData, 
        addedOn: new Date().toISOString().split('T')[0] // Sets today's date
      };
      setElectives([newElective, ...electives]);
    }
    resetForm();
  };

  const handleEdit = (item) => {
    setFormData({
      subjectName: item.subjectName || '',
      status: item.status || 'Active'
    });
    setEditId(item.id);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this elective subject?")) {
      setElectives(electives.filter(item => item.id !== id));
      if (paginatedElectives.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const resetForm = () => {
    setFormData(defaultFormState);
    setIsFormOpen(false);
    setEditId(null);
  };

  // --- SEARCH & PAGINATION LOGIC ---
  const filteredElectives = useMemo(() => {
    return electives.filter(item => 
      item.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [electives, searchTerm]);

  const totalPages = Math.ceil(filteredElectives.length / itemsPerPage);
  const paginatedElectives = filteredElectives.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // --- PDF EXPORT FUNCTION ---
  const handleExportPDF = () => {
    const doc = new jsPDF(); 
    
    doc.setFontSize(18);
    doc.setTextColor(17, 17, 17);
    doc.text('Master Elective Subjects', 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleString()} | Total Records: ${filteredElectives.length}`, 14, 30);

    const tableColumn = ["S.No", "Subject Name", "Added On", "Status"];
    const tableRows = [];

    filteredElectives.forEach((item, index) => {
      const rowData = [
        index + 1,
        item.subjectName,
        item.addedOn,
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
      styles: { fontSize: 10, cellPadding: 4 },
      alternateRowStyles: { fillColor: [253, 248, 245] },
    });

    doc.save(`Master_Electives_${new Date().getTime()}.pdf`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[1600px] mx-auto relative space-y-8">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Master Elective Subjects</h2>
          <p className="text-gray-500 mt-1">Manage global elective subjects available for student enrollment.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-[#111111] font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors shadow-sm shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Export PDF
          </button>

          <button 
            onClick={() => { if(isFormOpen) resetForm(); else setIsFormOpen(true); }}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm rounded-xl transition-all shadow-sm border shrink-0 ${
              isFormOpen 
                ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50' 
                : 'bg-[#111111] border-[#111111] text-white hover:bg-gray-800'
            }`}
          >
            {isFormOpen ? (
              <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg> Cancel</>
            ) : (
              <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg> Add Elective</>
            )}
          </button>
        </div>
      </div>

      {/* --- KPI SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#111111] p-6 rounded-2xl shadow-lg flex flex-col justify-center text-white relative overflow-hidden">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 relative z-10">Total Elective Subjects</p>
          <h3 className="text-4xl font-black text-white font-mono tracking-tight relative z-10">{electives.length}</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Active Subjects</p>
          <div className="flex items-center gap-3">
            <h3 className="text-4xl font-black text-[#EE6132] font-mono tracking-tight">
              {electives.filter(e => e.status === 'Active').length}
            </h3>
          </div>
        </div>
      </div>

      {/* --- EXPANDABLE FORM SECTION --- */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-[#EE6132] rounded-full"></span>
                {editId ? 'Update Elective Subject' : 'Add New Elective Subject'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                  
                  {/* Subject Name */}
                  <div className="md:col-span-6 space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subject Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="subjectName"
                      value={formData.subjectName}
                      onChange={handleChange}
                      placeholder="e.g. Artificial Intelligence"
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-bold text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>

                  {/* Status */}
                  <div className="md:col-span-3 space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status <span className="text-red-500">*</span></label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-bold text-gray-900 appearance-none cursor-pointer"
                      required
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="md:col-span-3">
                    <button
                      type="submit"
                      className="w-full h-[46px] bg-[#EE6132] text-white font-bold text-sm rounded-xl hover:bg-[#d9562a] transition-colors shadow-sm"
                    >
                      {editId ? 'Update Master' : 'Save Subject'}
                    </button>
                  </div>

                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TABLE LIST SECTION --- */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
          <div className="relative w-full sm:w-[400px]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="text"
              placeholder="Search Subject Name..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all text-sm font-bold text-gray-900 shadow-sm placeholder-gray-400"
            />
          </div>
          <span className="px-4 py-2 bg-orange-50 text-[#EE6132] text-xs font-extrabold uppercase tracking-widest rounded-lg border border-orange-100 shrink-0 shadow-sm">
            {filteredElectives.length} Records Found
          </span>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest w-16">S.No</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Subject Name</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Added On</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <AnimatePresence>
                {paginatedElectives.map((item, index) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -10 }}
                    className="hover:bg-orange-50/30 transition-colors group"
                  >
                    <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-gray-400">
                      {((currentPage - 1) * itemsPerPage + index + 1).toString().padStart(2, '0')}
                    </td>
                    
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-base font-black text-gray-900 tracking-tight">{item.subjectName}</span>
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-500 font-mono tracking-tight">{item.addedOn}</span>
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md border ${
                        item.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>

                    <td className="px-8 py-5 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(item)} className="p-2 text-gray-400 hover:text-[#EE6132] bg-white hover:bg-orange-50 border border-transparent hover:border-orange-200 rounded-lg transition-all shadow-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 border border-transparent hover:border-red-200 rounded-lg transition-all shadow-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {paginatedElectives.length === 0 && (
            <div className="py-20 text-center text-gray-400 bg-gray-50/50">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              <p className="text-sm font-bold">No elective subjects found.</p>
            </div>
          )}
        </div>

        {/* --- PAGINATION FOOTER --- */}
        {totalPages > 0 && (
          <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredElectives.length)} of {filteredElectives.length}
            </span>
            
            <div className="flex gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-white disabled:opacity-50 transition-colors bg-transparent shadow-sm">Previous</button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button key={idx + 1} onClick={() => setCurrentPage(idx + 1)} className={`w-9 h-9 rounded-lg text-xs font-bold transition-all shadow-sm ${currentPage === idx + 1 ? 'bg-[#111111] text-white' : 'text-gray-700 hover:bg-white border border-gray-200'}`}>{idx + 1}</button>
                ))}
              </div>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-white disabled:opacity-50 transition-colors bg-transparent shadow-sm">Next</button>
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}