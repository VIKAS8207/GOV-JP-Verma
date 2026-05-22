// src/pages/CourseFeeCreation.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded mock data to fit the new table structure
const initialFees = [
  { 
    id: 1, course: 'B.Tech Computer Science', year: '1st Year', semester: '1st Sem', gender: 'All', category: 'General',
    feeHeads: [{ id: 101, name: 'Tuition Fee', amount: 45000 }, { id: 102, name: 'Exam Fee', amount: 2500 }] 
  },
  { 
    id: 2, course: 'B.Tech Computer Science', year: '1st Year', semester: '1st Sem', gender: 'All', category: 'SC/ST',
    feeHeads: [{ id: 103, name: 'Tuition Fee', amount: 15000 }, { id: 104, name: 'Exam Fee', amount: 2500 }] 
  },
  { 
    id: 3, course: 'MBA', year: '1st Year', semester: '1st Sem', gender: 'Female', category: 'All',
    feeHeads: [{ id: 105, name: 'Tuition Fee', amount: 35000 }, { id: 106, name: 'Library Fee', amount: 1000 }] 
  },
];

export default function CourseFeeCreation() {
  const [fees, setFees] = useState(initialFees);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // Search & Pagination States
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form States
  const [formData, setFormData] = useState({
    course: '',
    year: '',
    semester: '',
    gender: 'All',
    category: 'All'
  });

  // Dynamic Fee Heads State
  const [feeHeads, setFeeHeads] = useState([
    { id: Date.now(), name: '', amount: '' }
  ]);

  // Calculate dynamic total
  const currentTotal = feeHeads.reduce((sum, head) => sum + (Number(head.amount) || 0), 0);

  // --- HANDLERS ---
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFeeHeadChange = (id, field, value) => {
    setFeeHeads(feeHeads.map(head => 
      head.id === id ? { ...head, [field]: value } : head
    ));
  };

  const addFeeHead = () => {
    setFeeHeads([...feeHeads, { id: Date.now(), name: '', amount: '' }]);
  };

  const removeFeeHead = (id) => {
    if (feeHeads.length > 1) {
      setFeeHeads(feeHeads.filter(head => head.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Filter out completely empty fee heads before saving
    const validFeeHeads = feeHeads.filter(head => head.name.trim() !== '' && head.amount !== '');
    
    if (validFeeHeads.length === 0) {
      alert("Please add at least one valid fee component with an amount.");
      return;
    }

    if (editId) {
      setFees(fees.map(f => f.id === editId ? { ...formData, feeHeads: validFeeHeads, id: editId } : f));
      setEditId(null);
    } else {
      const newFee = { id: Date.now(), ...formData, feeHeads: validFeeHeads };
      setFees([newFee, ...fees]);
    }
    resetForm();
  };

  const handleEdit = (feeItem) => {
    setFormData({
      course: feeItem.course,
      year: feeItem.year,
      semester: feeItem.semester,
      gender: feeItem.gender || 'All',
      category: feeItem.category || 'All'
    });
    setFeeHeads(feeItem.feeHeads.length > 0 ? feeItem.feeHeads : [{ id: Date.now(), name: '', amount: '' }]);
    setEditId(feeItem.id);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this fee structure?")) {
      setFees(fees.filter(f => f.id !== id));
      if (paginatedFees.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
    }
  };

  const resetForm = () => {
    setFormData({ course: '', year: '', semester: '', gender: 'All', category: 'All' });
    setFeeHeads([{ id: Date.now(), name: '', amount: '' }]);
    setIsFormOpen(false);
    setEditId(null);
  };

  // --- SEARCH & PAGINATION LOGIC ---
  const filteredFees = fees.filter(fee => 
    fee.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFees.length / itemsPerPage);
  const paginatedFees = filteredFees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-[1600px] mx-auto"
    >
      {/* --- HEADER SECTION --- */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Fee Structure</h2>
          <p className="text-gray-500 mt-1">Define pricing rules and fee breakdowns for academic courses.</p>
        </div>
        
        <button 
          onClick={() => { if(isFormOpen) resetForm(); else setIsFormOpen(true); }}
          className={`flex items-center gap-2 px-6 py-3 font-bold text-sm rounded-xl transition-all shadow-sm border ${
            isFormOpen 
              ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50' 
              : 'bg-[#EE6132] border-[#EE6132] text-white hover:bg-[#d9562a]'
          }`}
        >
          {isFormOpen ? (
            <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg> Cancel Entry</>
          ) : (
            <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg> Add Fee Structure</>
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
            className="overflow-hidden mb-8"
          >
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-[#EE6132] rounded-full"></span>
                {editId ? 'Update Fee Structure' : 'Create New Fee Structure'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Academic Target Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Course <span className="text-red-500">*</span></label>
                    <select
                      name="course" value={formData.course} onChange={handleFormChange} required
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select Course</option>
                      <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                      <option value="B.Tech Civil">B.Tech Civil</option>
                      <option value="MBA">MBA</option>
                      <option value="BCA">BCA</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Year <span className="text-red-500">*</span></label>
                    <select
                      name="year" value={formData.year} onChange={handleFormChange} required
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Semester <span className="text-red-500">*</span></label>
                    <select
                      name="semester" value={formData.semester} onChange={handleFormChange} required
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select Semester</option>
                      <option value="1st Sem">1st Sem</option>
                      <option value="2nd Sem">2nd Sem</option>
                      <option value="Both (Yearly)">Both (Yearly)</option>
                    </select>
                  </div>
                </div>

                {/* Demographic Filters (Optional) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Gender Applied (Optional)</label>
                    <select
                      name="gender" value={formData.gender} onChange={handleFormChange}
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none cursor-pointer"
                    >
                      <option value="All">All Genders</option>
                      <option value="Male">Male Only</option>
                      <option value="Female">Female Only</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Category Applied (Optional)</label>
                    <select
                      name="category" value={formData.category} onChange={handleFormChange}
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none cursor-pointer"
                    >
                      <option value="All">All Categories</option>
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC/ST">SC/ST</option>
                    </select>
                  </div>
                </div>

                {/* Dynamic Fee Heads Section */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Fee Component Breakdown</h4>
                    <button 
                      type="button" 
                      onClick={addFeeHead}
                      className="text-[#EE6132] text-sm font-bold hover:text-[#d9562a] flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-orange-100"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
                      Add Component
                    </button>
                  </div>

                  <div className="space-y-3">
                    <AnimatePresence>
                      {feeHeads.map((head, index) => (
                        <motion.div 
                          key={head.id}
                          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-4"
                        >
                          <input
                            type="text"
                            placeholder="Fee Name (e.g. Tuition Fee)"
                            value={head.name}
                            onChange={(e) => handleFeeHeadChange(head.id, 'name', e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-[#EE6132] transition-colors font-medium text-gray-900 placeholder-gray-400"
                            required
                          />
                          <div className="relative w-1/3 min-w-[150px]">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                            <input
                              type="number"
                              placeholder="0.00"
                              value={head.amount}
                              onChange={(e) => handleFeeHeadChange(head.id, 'amount', e.target.value)}
                              className="w-full pl-8 pr-4 py-3 bg-white border border-gray-200 rounded-lg outline-none focus:border-[#EE6132] transition-colors font-medium text-gray-900 placeholder-gray-400"
                              required
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFeeHead(head.id)}
                            disabled={feeHeads.length === 1}
                            className="shrink-0 p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Footer / Total / Submit */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4 border-t border-gray-100">
                  <div className="text-left w-full sm:w-auto">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Total Computed Fee</p>
                    <p className="text-3xl font-extrabold text-[#111111]">₹{currentTotal.toLocaleString('en-IN')}</p>
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-3.5 bg-[#111111] text-white font-bold text-sm rounded-lg hover:bg-gray-800 transition-colors shadow-md"
                  >
                    {editId ? 'Update Structure' : 'Save Structure'}
                  </button>
                </div>

              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TABLE LIST SECTION --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col">
        
        {/* Table Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="text"
              placeholder="Search by course or category..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors text-sm font-medium text-gray-900 placeholder-gray-400"
            />
          </div>
          <span className="px-4 py-1.5 bg-orange-50 text-[#EE6132] text-xs font-bold rounded-lg border border-orange-100 shrink-0">
            {filteredFees.length} Structures
          </span>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest w-16">S.No</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Course Targets</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Demographics</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Breakdown & Total</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <AnimatePresence>
                {paginatedFees.map((fee, index) => {
                  const itemTotal = fee.feeHeads.reduce((sum, h) => sum + Number(h.amount), 0);
                  return (
                    <motion.tr 
                      key={fee.id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -10 }}
                      className="hover:bg-orange-50/40 transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-400">
                        {((currentPage - 1) * itemsPerPage + index + 1).toString().padStart(2, '0')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-bold text-gray-900">{fee.course}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{fee.year} • {fee.semester}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                           <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded border border-gray-200">{fee.category}</span>
                           <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded border border-gray-200">{fee.gender}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5 mb-2 max-w-[300px]">
                          {fee.feeHeads.map(head => (
                            <span key={head.id} className="px-2 py-0.5 bg-gray-50 border border-gray-200 text-gray-500 text-[11px] font-semibold rounded whitespace-nowrap">
                              {head.name}: ₹{Number(head.amount).toLocaleString('en-IN')}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm font-bold text-[#EE6132]">Total: ₹{itemTotal.toLocaleString('en-IN')}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleEdit(fee)}
                            className="p-1.5 text-gray-400 hover:text-[#EE6132] bg-white hover:bg-orange-50 border border-transparent hover:border-orange-200 rounded-md transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(fee.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 border border-transparent hover:border-red-200 rounded-md transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
          
          {paginatedFees.length === 0 && (
            <div className="py-16 text-center text-gray-400 bg-gray-50/50">
              <svg className="w-10 h-10 mx-auto mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <p className="text-sm font-medium">No fee structures found matching your search.</p>
            </div>
          )}
        </div>

        {/* --- PAGINATION FOOTER --- */}
        {totalPages > 0 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredFees.length)} of {filteredFees.length} entries
            </span>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                className="px-3 py-1.5 border border-gray-200 rounded-md text-xs font-bold text-gray-600 hover:bg-white hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx + 1} onClick={() => setCurrentPage(idx + 1)}
                    className={`w-8 h-8 rounded-md text-xs font-bold transition-all ${currentPage === idx + 1 ? 'bg-[#111111] text-white' : 'text-gray-500 hover:bg-white border border-transparent hover:border-gray-200'}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-gray-200 rounded-md text-xs font-bold text-gray-600 hover:bg-white hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
              >
                Next
              </button>
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}