// src/components/StudentList.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Mock data structured for Data Entry / Upload Logs
const initialLogs = [
  { id: 'LOG-99218', type: 'Bulk Upload', info: { success: 145, failed: 12 }, course: 'Multiple', branch: 'Multiple', semester: 'Multiple', status: 'Errors' },
  { id: 'LOG-88123', type: 'Manual Entry', info: { name: 'Aarav Sharma' }, course: 'B.Tech', branch: 'Computer Science', semester: '1st Sem', status: 'Uploaded' },
  { id: 'LOG-77234', type: 'Bulk Upload', info: { success: 320, failed: 0 }, course: 'B.Com', branch: 'General', semester: '2nd Sem', status: 'Uploaded' },
  { id: 'LOG-66345', type: 'Manual Entry', info: { name: 'Priya Patel' }, course: 'MBA', branch: 'Marketing', semester: '3rd Sem', status: 'Uploaded' },
  { id: 'LOG-55456', type: 'Manual Entry', info: { name: 'Rohan Verma' }, course: 'B.A', branch: 'Home Science', semester: '1st Sem', status: 'Uploaded' },
];

export default function StudentList() {
  const [logs, setLogs] = useState(initialLogs);
  
  // UI States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  
  // Bulk Upload Interactive States
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error

  // Search & Pagination States
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form State (Updated with Gender, Branch, and Elective Subject)
  const [formData, setFormData] = useState({
    name: '', fatherName: '', phone: '', email: '', city: '',
    category: '', gender: '', course: '', branch: '', year: '', semester: '', elective: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- MANUAL ENTRY SUBMIT ---
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a manual log entry
    const newLog = {
      id: `LOG-${Math.floor(10000 + Math.random() * 90000)}`,
      type: 'Manual Entry',
      info: { name: formData.name },
      course: formData.course,
      branch: formData.branch,
      semester: formData.semester,
      status: 'Uploaded'
    };
    
    setLogs([newLog, ...logs]);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', fatherName: '', phone: '', email: '', city: '', category: '', gender: '', course: '', branch: '', year: '', semester: '', elective: '' });
    setIsFormOpen(false);
  };

  // --- BULK UPLOAD ACTIONS ---
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadStatus('idle');
    }
  };

  const handleBulkSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
    
    setUploadStatus('uploading');

    // Simulate API upload & processing time
    setTimeout(() => {
      // 30% chance to fail just to demonstrate the error log UI
      const isError = Math.random() < 0.3; 
      
      setUploadStatus(isError ? 'error' : 'success');

      // Create a bulk log entry
      const successCount = Math.floor(50 + Math.random() * 200);
      const failedCount = isError ? Math.floor(1 + Math.random() * 25) : 0;

      const newLog = {
        id: `LOG-${Math.floor(10000 + Math.random() * 90000)}`,
        type: 'Bulk Upload',
        info: { success: successCount, failed: failedCount },
        course: 'Mixed Selection',
        branch: 'Multiple',
        semester: 'Multiple',
        status: isError ? 'Errors' : 'Uploaded'
      };

      setLogs(prev => [newLog, ...prev]);
    }, 2000);
  };

  const resetBulkUpload = () => {
    setUploadStatus('idle');
    setSelectedFile(null);
    setIsBulkUploadOpen(false);
  };

  // --- SEARCH & PAGINATION LOGIC ---
  const filteredLogs = logs.filter(log => 
    log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.type === 'Manual Entry' && log.info.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    log.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[1600px] mx-auto relative">
      
      {/* --- BULK UPLOAD MODAL --- */}
      <AnimatePresence>
        {isBulkUploadOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={uploadStatus === 'uploading' ? null : resetBulkUpload}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg z-10 border border-gray-100 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#EE6132]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                  Bulk Upload Students
                </h3>
                {uploadStatus !== 'uploading' && (
                  <button onClick={resetBulkUpload} className="text-gray-400 hover:text-gray-900 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                )}
              </div>

              {/* IDLE STATE: 2-Step Form Selection */}
              {uploadStatus === 'idle' && (
                <div className="p-8 space-y-6">
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1">Step 1: Download Format</p>
                      <p className="text-[11px] text-gray-500 font-medium">Get the required Excel template.</p>
                    </div>
                    <a href="/formats/Student_Bulk_Format.xlsx" download className="px-4 py-2 bg-white border border-[#EE6132] text-[#EE6132] text-xs font-bold rounded-lg hover:bg-orange-100 transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      Download .xlsx
                    </a>
                  </div>

                  <form onSubmit={handleBulkSubmit}>
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">Step 2: Upload Filled File</p>
                    <label className="w-full flex flex-col items-center justify-center p-8 bg-[#F8F9FA] border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 hover:border-[#EE6132] transition-colors group mb-6">
                      <div className={`w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 mb-3 group-hover:scale-110 transition-transform ${selectedFile ? 'text-[#EE6132]' : 'text-gray-400 group-hover:text-[#EE6132]'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                      </div>
                      
                      {selectedFile ? (
                        <div className="text-center">
                          <span className="text-sm font-bold text-gray-900 truncate px-4 block">{selectedFile.name}</span>
                          <span className="text-xs text-[#EE6132] mt-1 font-medium block">Ready to process</span>
                        </div>
                      ) : (
                        <div className="text-center">
                          <span className="text-sm font-bold text-gray-700 block">Click to browse or drag & drop</span>
                          <span className="text-xs text-gray-400 mt-1 font-medium block">Supports .xlsx, .xls, .csv</span>
                        </div>
                      )}
                      
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
                        onChange={handleFileChange} 
                      />
                    </label>

                    <div className="flex justify-end gap-3 pt-2">
                      <button type="button" onClick={resetBulkUpload} className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
                        Cancel
                      </button>
                      <button type="submit" disabled={!selectedFile} className="px-8 py-2.5 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-md disabled:opacity-50 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                        Process Upload
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* UPLOADING STATE: Spinner */}
              {uploadStatus === 'uploading' && (
                <div className="py-16 text-center flex flex-col items-center">
                  <svg className="animate-spin h-12 w-12 text-[#EE6132] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-base font-bold text-gray-900">Processing file...</p>
                  <p className="text-sm text-gray-500 mt-1">Validating student records</p>
                </div>
              )}

              {/* SUCCESS STATE */}
              {uploadStatus === 'success' && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-8 sm:p-10">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5 border-4 border-green-100">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2">Upload Successful!</h3>
                  <p className="text-sm text-gray-500 mb-8">Student records have been securely added to the system and logged in the table.</p>
                  <button onClick={resetBulkUpload} className="w-full py-4 bg-[#111111] text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-colors shadow-md">Done</button>
                </motion.div>
              )}

              {/* ERROR STATE */}
              {uploadStatus === 'error' && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-8 sm:p-10">
                  <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-5 border-4 border-amber-100">
                    <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2">Processed with Errors</h3>
                  <p className="text-sm text-amber-600 font-medium mb-8 bg-amber-50 py-3 rounded-lg mt-2 mx-4 border border-amber-100">Some rows failed validation. Check the log table to download the error report.</p>
                  <div className="flex gap-3">
                    <button onClick={resetBulkUpload} className="w-full py-3.5 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors shadow-sm">Close</button>
                    <button onClick={() => setUploadStatus('idle')} className="w-full py-3.5 bg-[#EE6132] text-white font-bold text-sm rounded-xl hover:bg-[#d9562a] transition-colors shadow-md">Try Again</button>
                  </div>
                </motion.div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Upload & Entry Logs</h2>
          <p className="text-gray-500 mt-1">Track manual registrations and bulk data uploads into the system.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setIsBulkUploadOpen(true)}
            className="flex items-center gap-2 px-5 py-3 font-bold text-sm rounded-xl transition-all shadow-sm border bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
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
              <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg> Register New Student</>
            )}
          </button>
        </div>
      </div>

      {/* --- EXPANDABLE FORM SECTION --- */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-[#EE6132] rounded-full"></span>
                Register New Student (Manual Entry)
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Row 1: Names */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Student Name <span className="text-red-500">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Aarav Sharma" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Father's Name <span className="text-red-500">*</span></label>
                    <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="e.g. Ramesh Sharma" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" required />
                  </div>
                </div>

                {/* Row 2: Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mobile Number <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit mobile number" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="student@example.com" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" required />
                  </div>
                </div>

                {/* Row 3: Demographics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">City <span className="text-red-500">*</span></label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Pune" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Caste / Category <span className="text-red-500">*</span></label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none cursor-pointer" required>
                      <option value="" disabled>Select Category</option>
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Gender <span className="text-red-500">*</span></label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none cursor-pointer" required>
                      <option value="" disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Academic Details */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Course <span className="text-red-500">*</span></label>
                    <select name="course" value={formData.course} onChange={handleChange} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none cursor-pointer" required>
                      <option value="" disabled>Select Course</option>
                      <option value="B.Tech">B.Tech</option>
                      <option value="BCA">BCA</option>
                      <option value="MBA">MBA</option>
                      <option value="B.A">B.A</option>
                      <option value="B.Com">B.Com</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Branch / Spec <span className="text-red-500">*</span></label>
                    <input type="text" name="branch" value={formData.branch} onChange={handleChange} placeholder="e.g. Computer Science" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Year <span className="text-red-500">*</span></label>
                    <select name="year" value={formData.year} onChange={handleChange} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none cursor-pointer" required>
                      <option value="" disabled>Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Semester <span className="text-red-500">*</span></label>
                    <select name="semester" value={formData.semester} onChange={handleChange} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none cursor-pointer" required>
                      <option value="" disabled>Select Sem</option>
                      <option value="1st Sem">1st Sem</option>
                      <option value="2nd Sem">2nd Sem</option>
                      <option value="3rd Sem">3rd Sem</option>
                      <option value="4th Sem">4th Sem</option>
                    </select>
                  </div>
                </div>

                {/* Row 5: Elective (Optional) */}
                <div className="space-y-1.5 max-w-sm">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Elective Subject <span className="text-gray-400 font-normal lowercase tracking-normal">(Optional)</span></label>
                  <input type="text" name="elective" value={formData.elective} onChange={handleChange} placeholder="e.g. Artificial Intelligence" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" />
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button type="submit" className="px-10 py-3.5 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                    Save Student Entry
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
          
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-4">
            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input
                type="text"
                placeholder="Search Log ID or Name..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all text-sm font-bold text-gray-900 placeholder-gray-400 shadow-sm"
              />
            </div>
            
            {/* New Student List Redirect Button */}
            <Link to="/admin-dashboard/students/all" className="flex items-center gap-2 px-5 py-3 bg-white text-[#111111] font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors shadow-sm border border-gray-200 w-full sm:w-auto justify-center">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              View Full Student Database
            </Link>
          </div>

          <span className="px-4 py-2 bg-orange-50 text-[#EE6132] text-xs font-extrabold uppercase tracking-widest rounded-lg border border-orange-100 shrink-0 shadow-sm">
            {filteredLogs.length} Records
          </span>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest w-16">S.No</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Upload Type</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Student Info / Stats</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Course Name</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Semester</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Branch Name</th>
                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <AnimatePresence>
                {paginatedLogs.map((log, index) => (
                  <motion.tr 
                    key={log.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -10 }}
                    className="hover:bg-orange-50/30 transition-colors group"
                  >
                    <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-gray-400">
                      {((currentPage - 1) * itemsPerPage + index + 1).toString().padStart(2, '0')}
                    </td>
                    
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex flex-col items-start gap-1">
                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded border ${
                          log.type === 'Bulk Upload' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                        }`}>
                          {log.type}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 font-mono mt-0.5">{log.id}</span>
                      </div>
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap">
                      {log.type === 'Manual Entry' ? (
                        <span className="text-sm font-bold text-gray-900">{log.info.name}</span>
                      ) : (
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-black text-green-600 flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded border border-green-100">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                            {log.info.success}
                          </span>
                          <span className="text-sm font-black text-red-500 flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                            {log.info.failed}
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-800">
                      {log.course}
                    </td>
                    
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-500">
                      {log.semester}
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-600">
                      {log.branch}
                    </td>

                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex flex-col items-start gap-1">
                        {log.status === 'Uploading' ? (
                           <span className="text-[11px] font-black text-[#EE6132] uppercase tracking-widest flex items-center gap-1.5">
                             <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                             Processing...
                           </span>
                        ) : log.status === 'Uploaded' ? (
                           <span className="text-[11px] font-black text-green-600 uppercase tracking-widest flex items-center gap-1">
                             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                             Success
                           </span>
                        ) : (
                           <>
                             <span className="text-[11px] font-black text-red-500 uppercase tracking-widest flex items-center gap-1">
                               <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                               Errors Found
                             </span>
                             <button className="text-[10px] font-bold text-[#EE6132] hover:text-[#d9562a] underline transition-colors flex items-center gap-1 mt-0.5">
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                               Download Error Log
                             </button>
                           </>
                        )}
                      </div>
                    </td>

                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {paginatedLogs.length === 0 && (
            <div className="py-20 text-center text-gray-400 bg-gray-50/50">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <p className="text-sm font-bold">No log entries found matching your search.</p>
            </div>
          )}
        </div>

        {/* --- PAGINATION FOOTER --- */}
        {totalPages > 0 && (
          <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} logs
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