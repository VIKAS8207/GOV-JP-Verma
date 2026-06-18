// src/pages/CourseFeeCreation.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data structured to match the new detailed breakdown
const initialFees = [
  { 
    id: 1, course: 'B.A First Year', gender: 'Male / Female Both', caste: 'OBC/UR',
    fees: {
      govt: { addFee: 500, sta: 300, practical: 0, tuition: 15000 },
      nonGovt: { pd_af: 1200, cm: 800, reentry: 0 },
      others: { jb: 400, sf: 200 }
    }
  },
  { 
    id: 2, course: 'B.SC .B.C.A first year', gender: 'Female', caste: 'SC/ST',
    fees: {
      govt: { addFee: 500, sta: 300, practical: 2000, tuition: 0 },
      nonGovt: { pd_af: 1200, cm: 800, reentry: 0 },
      others: { jb: 400, sf: 200 }
    }
  }
];

// Helper to calculate total for a specific fee record
const getFeeTotal = (feesObj) => {
  let total = 0;
  ['govt', 'nonGovt', 'others'].forEach(sec => {
    Object.values(feesObj[sec]).forEach(val => {
      total += Number(val) || 0;
    });
  });
  return total;
};

export default function CourseFeeCreation() {
  const [fees, setFees] = useState(initialFees);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false); // Bulk Upload State
  const [editId, setEditId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // File state
  
  // Search & Pagination States
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Initial Empty State
  const defaultFormState = {
    course: '',
    caste: '',
    gender: '',
    fees: {
      govt: { addFee: '', sta: '', practical: '', tuition: '' },
      nonGovt: { pd_af: '', cm: '', reentry: '' },
      others: { jb: '', sf: '' }
    }
  };

  const [formData, setFormData] = useState(defaultFormState);

  // --- HANDLERS ---
  const handleTopLevelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFeeChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      fees: {
        ...prev.fees,
        [section]: {
          ...prev.fees[section],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process form data to ensure empty fields become 0
    const processedFees = {
      govt: {
        addFee: Number(formData.fees.govt.addFee) || 0,
        sta: Number(formData.fees.govt.sta) || 0,
        practical: Number(formData.fees.govt.practical) || 0,
        tuition: Number(formData.fees.govt.tuition) || 0,
      },
      nonGovt: {
        pd_af: Number(formData.fees.nonGovt.pd_af) || 0,
        cm: Number(formData.fees.nonGovt.cm) || 0,
        reentry: Number(formData.fees.nonGovt.reentry) || 0,
      },
      others: {
        jb: Number(formData.fees.others.jb) || 0,
        sf: Number(formData.fees.others.sf) || 0,
      }
    };

    const finalData = { ...formData, fees: processedFees };

    if (editId) {
      setFees(fees.map(f => f.id === editId ? { ...finalData, id: editId } : f));
      setEditId(null);
    } else {
      setFees([{ id: Date.now(), ...finalData }, ...fees]);
    }
    resetForm();
  };

  const handleEdit = (feeItem) => {
    setFormData({
      course: feeItem.course,
      caste: feeItem.caste,
      gender: feeItem.gender,
      fees: {
        govt: { ...feeItem.fees.govt },
        nonGovt: { ...feeItem.fees.nonGovt },
        others: { ...feeItem.fees.others }
      }
    });
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

  const handleBulkUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
    alert(`File "${selectedFile.name}" uploaded successfully! Processing fee structures...`);
    setIsBulkOpen(false);
    setSelectedFile(null);
  };

  const resetForm = () => {
    setFormData(defaultFormState);
    setIsFormOpen(false);
    setEditId(null);
  };

  // --- SEARCH & PAGINATION LOGIC ---
  const filteredFees = fees.filter(fee => 
    fee.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fee.caste.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFees.length / itemsPerPage);
  const paginatedFees = filteredFees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reusable Input Component for Fees
  const FeeInput = ({ section, field, label }) => (
    <div className="space-y-1.5">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{label}</label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
        <input
          type="number"
          min="0"
          placeholder="0"
          value={formData.fees[section][field]}
          onChange={(e) => handleFeeChange(section, field, e.target.value)}
          className="w-full pl-8 pr-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 focus:bg-white transition-all font-medium text-gray-900"
        />
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[1600px] mx-auto relative">
      
      {/* --- BULK UPLOAD MODAL --- */}
      <AnimatePresence>
        {isBulkOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsBulkOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#EE6132]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                  Bulk Upload Fee Structures
                </h3>
                <button onClick={() => setIsBulkOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              <div className="p-8 space-y-6">
                {/* Download Format Section */}
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1">Step 1: Download Format</p>
                    <p className="text-[11px] text-gray-500 font-medium">Get the required Excel template.</p>
                  </div>
                  {/* Assumes file is at public/formats/Fee_Structure_Bulk_Format.xlsx */}
                  <a href="/formats/Fee_Structure_Bulk_Format.xlsx" download className="px-4 py-2 bg-white border border-[#EE6132] text-[#EE6132] text-xs font-bold rounded-lg hover:bg-orange-100 transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-sm">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Download .xlsx
                  </a>
                </div>

                {/* Upload Section */}
                <div>
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">Step 2: Upload Filled File</p>
                  <label className="w-full flex flex-col items-center justify-center p-8 bg-[#F8F9FA] border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 hover:border-[#EE6132] transition-colors group">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 mb-3 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-[#EE6132]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    </div>
                    <span className="text-sm font-bold text-gray-700">{selectedFile ? selectedFile.name : "Click to browse or drag & drop"}</span>
                    <span className="text-xs text-gray-400 mt-1 font-medium">Supports .xlsx, .xls, .csv</span>
                    <input type="file" className="hidden" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={(e) => setSelectedFile(e.target.files[0])} />
                  </label>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button onClick={() => setIsBulkOpen(false)} className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                  Cancel
                </button>
                <button onClick={handleBulkUpload} disabled={!selectedFile} className="px-8 py-2.5 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-md disabled:opacity-50 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                  Process Upload
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Fee Structure Master</h2>
          <p className="text-gray-500 mt-1">Configure highly detailed pricing rules for academic courses.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setIsBulkOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            Bulk Upload
          </button>
          
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
      </div>

      {/* --- EXPANDABLE PROGRESSIVE FORM SECTION --- */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-8 flex items-center gap-2">
                <span className="w-2 h-6 bg-[#EE6132] rounded-full"></span>
                {editId ? 'Update Fee Structure' : 'Create New Fee Structure'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Initial Step: Course Selection */}
                <div className="max-w-xl">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Target Course <span className="text-red-500">*</span></label>
                  <select
                    name="course" value={formData.course} onChange={handleTopLevelChange} required
                    className="w-full px-4 py-3.5 mt-1.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-bold text-gray-900 appearance-none shadow-sm cursor-pointer"
                  >
                    <option value="" disabled>Select Target Course First...</option>
                    <option value="B.A First Year">B.A First Year</option>
                    <option value="BA FIRST YEAR HOME SCIENCE">BA FIRST YEAR HOME SCIENCE</option>
                    <option value="B.SC .B.C.A first year">B.SC .B.C.A first year</option>
                    <option value="B.Sc. B.C.A Secound / Third Renewal">B.Sc. B.C.A Secound / Third Renewal</option>
                    <option value="B.com First year">B.com First year</option>
                    <option value="B.com Second / Third Renewal">B.com Second / Third Renewal</option>
                  </select>
                </div>

                {/* Progressive Expansion: Only show details if course is selected */}
                <AnimatePresence>
                  {formData.course && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="space-y-10 border-t border-gray-100 pt-8"
                    >
                      
                      {/* Demographics */}
                      <div>
                        <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">1. Apply Demographics</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Caste Category <span className="text-red-500">*</span></label>
                            <select name="caste" value={formData.caste} onChange={handleTopLevelChange} required className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 appearance-none cursor-pointer">
                              <option value="" disabled>Select Caste</option>
                              <option value="SC/ST">SC / ST</option>
                              <option value="OBC/UR">OBC / UR</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Gender Rule <span className="text-red-500">*</span></label>
                            <select name="gender" value={formData.gender} onChange={handleTopLevelChange} required className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 appearance-none cursor-pointer">
                              <option value="" disabled>Select Gender</option>
                              <option value="Male">Male Only</option>
                              <option value="Female">Female Only</option>
                              <option value="Male / Female Both">Male / Female Both</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Government Fees */}
                      <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
                        <h4 className="text-sm font-black text-[#EE6132] uppercase tracking-widest mb-4 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                          Government Section
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          <FeeInput section="govt" field="addFee" label="Add. Fee" />
                          <FeeInput section="govt" field="sta" label="STA" />
                          <FeeInput section="govt" field="practical" label="Practical" />
                          <FeeInput section="govt" field="tuition" label="Tuition Fee" />
                        </div>
                      </div>

                      {/* Non-Government Fees */}
                      <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
                        <h4 className="text-sm font-black text-gray-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                          Non-Government Section
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <FeeInput section="nonGovt" field="pd_af" label="PD / AF" />
                          <FeeInput section="nonGovt" field="cm" label="CM" />
                          <FeeInput section="nonGovt" field="reentry" label="Re-entry" />
                        </div>
                      </div>

                      {/* Other Fees & Submission */}
                      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="w-full md:w-1/2 p-6 bg-gray-50 border border-gray-200 rounded-2xl">
                          <h4 className="text-sm font-black text-gray-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                            Other Section
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FeeInput section="others" field="jb" label="JB" />
                            <FeeInput section="others" field="sf" label="SF" />
                          </div>
                        </div>

                        <div className="w-full md:w-auto shrink-0 pb-2">
                          <div className="text-right mb-4">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Computed Total</p>
                            <p className="text-4xl font-extrabold text-[#111111] font-mono tracking-tight">₹{getFeeTotal(formData.fees).toLocaleString()}</p>
                          </div>
                          <button type="submit" className="w-full px-12 py-4 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-lg flex justify-center items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                            {editId ? 'Update Fee Structure' : 'Save Structure to Database'}
                          </button>
                        </div>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TABLE LIST SECTION --- */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        
        {/* Table Toolbar */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="text"
              placeholder="Search by course or caste..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all text-sm font-medium text-gray-900 shadow-sm"
            />
          </div>
          <span className="px-4 py-2 bg-orange-50 text-[#EE6132] text-xs font-extrabold uppercase tracking-widest rounded-lg border border-orange-100 shrink-0 shadow-sm">
            {filteredFees.length} Master Records
          </span>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest w-16">S.No</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Course Focus</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Target Demographics</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Fee Aggregation</th>
                <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <AnimatePresence>
                {paginatedFees.map((fee, index) => {
                  const total = getFeeTotal(fee.fees);
                  return (
                    <motion.tr 
                      key={fee.id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -10 }}
                      className="hover:bg-orange-50/30 transition-colors group"
                    >
                      <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-gray-400">
                        {((currentPage - 1) * itemsPerPage + index + 1).toString().padStart(2, '0')}
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-gray-900">{fee.course}</p>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex gap-2">
                           <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-wider rounded border border-gray-200">{fee.caste}</span>
                           <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-[10px] font-bold uppercase tracking-wider rounded border border-gray-200">{fee.gender}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <p className="text-base font-black text-[#EE6132] font-mono tracking-tight">₹{total.toLocaleString('en-IN')}</p>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Base Total</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(fee)} className="p-2 text-gray-400 hover:text-[#EE6132] bg-white hover:bg-orange-50 border border-transparent hover:border-orange-200 rounded-lg transition-all shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                          </button>
                          <button onClick={() => handleDelete(fee.id)} className="p-2 text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 border border-transparent hover:border-red-200 rounded-lg transition-all shadow-sm">
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
          
          {paginatedFees.length === 0 && (
            <div className="py-20 text-center text-gray-400 bg-gray-50/50">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <p className="text-sm font-bold">No fee structures found matching your search.</p>
            </div>
          )}
        </div>

        {/* --- PAGINATION FOOTER --- */}
        {totalPages > 0 && (
          <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredFees.length)} of {filteredFees.length}
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