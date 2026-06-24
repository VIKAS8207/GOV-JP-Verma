// src/pages/MasterAcademicYear.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data for Academic Years
const initialYears = [
  { id: 1, label: '2026-2027', startDate: '2026-07-01', endDate: '2027-06-30', status: 'Active' },
  { id: 2, label: '2025-2026', startDate: '2025-07-01', endDate: '2026-06-30', status: 'Inactive' },
  { id: 3, label: '2024-2025', startDate: '2024-07-01', endDate: '2025-06-30', status: 'Inactive' },
];

export default function MasterAcademicYear() {
  const [years, setYears] = useState(initialYears);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // Search & Pagination States
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const defaultFormState = {
    label: '',
    startDate: '',
    endDate: '',
    status: 'Active'
  };

  const [formData, setFormData] = useState(defaultFormState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- ACTIONS ---
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate Dates
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    if (end <= start) {
      alert("Invalid Configuration: The End Date must be after the Start Date.");
      return;
    }

    if (editId) {
      setYears(years.map(y => y.id === editId ? { ...formData, id: editId } : y));
      setEditId(null);
    } else {
      const newYear = { id: Date.now(), ...formData };
      setYears([newYear, ...years]);
    }
    resetForm();
  };

  const handleEdit = (yearItem) => {
    setFormData({
      label: yearItem.label || '',
      startDate: yearItem.startDate || '',
      endDate: yearItem.endDate || '',
      status: yearItem.status || 'Active'
    });
    setEditId(yearItem.id);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this academic year?")) {
      setYears(years.filter(y => y.id !== id));
      if (paginatedYears.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const resetForm = () => {
    setFormData(defaultFormState);
    setIsFormOpen(false);
    setEditId(null);
  };

  // --- HELPER: CHECK SYSTEM STATUS ---
  const getSystemStatus = (startDate, endDate, manualStatus) => {
    if (manualStatus === 'Inactive') return { text: 'Forced Inactive', color: 'text-red-600 bg-red-50 border-red-100' };
    
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (today >= start && today <= end) {
      return { text: 'Currently Running', color: 'text-green-700 bg-green-50 border-green-200' };
    } else if (today < start) {
      return { text: 'Scheduled (Future)', color: 'text-blue-600 bg-blue-50 border-blue-100' };
    } else {
      return { text: 'Expired (Past)', color: 'text-gray-500 bg-gray-100 border-gray-200' };
    }
  };

  // --- SEARCH & PAGINATION LOGIC ---
  const filteredYears = useMemo(() => {
    return years.filter(year => 
      year.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [years, searchTerm]);

  const totalPages = Math.ceil(filteredYears.length / itemsPerPage);
  const paginatedYears = filteredYears.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[1600px] mx-auto relative space-y-8">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Master Academic Year</h2>
          <p className="text-gray-500 mt-1">Configure global timeline boundaries and session statuses.</p>
        </div>
        
        <button 
          onClick={() => { if(isFormOpen) resetForm(); else setIsFormOpen(true); }}
          className={`flex items-center gap-2 px-6 py-3 font-bold text-sm rounded-xl transition-all shadow-sm border shrink-0 ${
            isFormOpen 
              ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50' 
              : 'bg-[#111111] border-[#111111] text-white hover:bg-gray-800'
          }`}
        >
          {isFormOpen ? (
            <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg> Cancel Entry</>
          ) : (
            <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg> Create Academic Year</>
          )}
        </button>
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
                {editId ? 'Update Academic Year' : 'Configure New Academic Year'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Label */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Year Label <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="label"
                      value={formData.label}
                      onChange={handleChange}
                      placeholder="e.g. 2026-2027"
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-black text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>

                  {/* Start Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Start Date <span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 cursor-pointer"
                      required
                    />
                  </div>

                  {/* End Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">End Date <span className="text-red-500">*</span></label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 cursor-pointer"
                      required
                    />
                  </div>

                  {/* Status Override */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Manual Status <span className="text-red-500">*</span></label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-bold text-gray-900 appearance-none cursor-pointer"
                      required
                    >
                      <option value="Active">Active (Auto-manage by Date)</option>
                      <option value="Inactive">Force Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-100 rounded-xl">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#EE6132] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Automation Note</p>
                      <p className="text-xs text-gray-600 mt-0.5">If set to "Active", the system will automatically open and close portals based strictly on the Start and End dates provided above.</p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#EE6132] text-white font-bold text-sm rounded-lg hover:bg-[#d9562a] transition-colors shadow-sm shrink-0"
                  >
                    {editId ? 'Update Master Year' : 'Initialize Year'}
                  </button>
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
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="text"
              placeholder="Search Academic Year..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all text-sm font-bold text-gray-900 shadow-sm placeholder-gray-400"
            />
          </div>
          <span className="px-4 py-2 bg-orange-50 text-[#EE6132] text-xs font-extrabold uppercase tracking-widest rounded-lg border border-orange-100 shrink-0 shadow-sm">
            {filteredYears.length} Master Records
          </span>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest w-16">S.No</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Academic Year</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Boundary Dates</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Manual Status</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Live System Status</th>
                <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <AnimatePresence>
                {paginatedYears.map((year, index) => {
                  const sysStatus = getSystemStatus(year.startDate, year.endDate, year.status);
                  return (
                    <motion.tr 
                      key={year.id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -10 }}
                      className="hover:bg-orange-50/30 transition-colors group"
                    >
                      <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-gray-400">
                        {((currentPage - 1) * itemsPerPage + index + 1).toString().padStart(2, '0')}
                      </td>
                      
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="text-base font-black text-gray-900 tracking-tight">{year.label}</span>
                      </td>

                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold text-gray-600 flex items-center gap-2">
                            <span className="w-8 text-[10px] uppercase text-gray-400 tracking-widest">Start</span>
                            {new Date(year.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                          <span className="text-xs font-bold text-gray-600 flex items-center gap-2">
                            <span className="w-8 text-[10px] uppercase text-gray-400 tracking-widest">End</span>
                            {new Date(year.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-wider rounded border border-gray-200">
                          {year.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md border ${sysStatus.color}`}>
                          {sysStatus.text}
                        </span>
                      </td>

                      <td className="px-8 py-5 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(year)} className="p-2 text-gray-400 hover:text-[#EE6132] bg-white hover:bg-orange-50 border border-transparent hover:border-orange-200 rounded-lg transition-all shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                          </button>
                          <button onClick={() => handleDelete(year.id)} className="p-2 text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 border border-transparent hover:border-red-200 rounded-lg transition-all shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
          
          {paginatedYears.length === 0 && (
            <div className="py-20 text-center text-gray-400 bg-gray-50/50">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <p className="text-sm font-bold">No academic years found.</p>
            </div>
          )}
        </div>

        {/* --- PAGINATION FOOTER --- */}
        {totalPages > 0 && (
          <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredYears.length)} of {filteredYears.length}
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