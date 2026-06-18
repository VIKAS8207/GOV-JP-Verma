// src/components/StudentList.jsx
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data updated with emails
const initialStudents = [
  { id: 'STU776031', name: 'Raj', fatherName: 'Amit', phone: '7854818155', email: 'raj@example.com', city: 'Pune', course: 'B.Tech', year: '1st Year', semester: '1st Sem', category: 'SC' },
  { id: 'STU666412', name: 'Rohit', fatherName: 'Amit', phone: '7854818155', email: 'rohit@example.com', city: 'Pune', course: 'B.Tech', year: '1st Year', semester: '1st Sem', category: 'General' },
  { id: 'STU351137', name: 'Samkit Jain', fatherName: 'Saurbh', phone: '9876543211', email: 'samkit@example.com', city: 'Mumbai', course: 'BCA', year: '2nd Year', semester: '3rd Sem', category: 'General' },
  { id: 'STU934863', name: 'Sandeep', fatherName: 'Sunil', phone: '9999999999', email: 'sandeep@example.com', city: 'Pune', course: 'MBA', year: '1st Year', semester: '1st Sem', category: 'General' },
  { id: 'STU112233', name: 'Priya Sharma', fatherName: 'Rajesh', phone: '9876123456', email: 'priya@example.com', city: 'Delhi', course: 'B.Tech', year: '3rd Year', semester: '5th Sem', category: 'OBC' },
];

export default function StudentList() {
  const [students, setStudents] = useState(initialStudents);
  
  // UI States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // Bulk Upload Interactive States
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error

  // Search & Pagination States
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form State
  const [formData, setFormData] = useState({
    name: '', fatherName: '', phone: '', email: '', city: '',
    category: '', course: '', year: '', semester: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- STUDENT CRUD ACTIONS ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setStudents(students.map(s => s.id === editId ? { ...formData, id: editId } : s));
      setEditId(null);
    } else {
      const newId = `STU${Math.floor(100000 + Math.random() * 900000)}`;
      const newStudent = { id: newId, ...formData };
      setStudents([newStudent, ...students]);
    }
    resetForm();
  };

  const handleEdit = (student) => {
    setFormData({
      name: student.name, fatherName: student.fatherName, phone: student.phone, email: student.email || '', city: student.city,
      category: student.category, course: student.course, year: student.year, semester: student.semester
    });
    setEditId(student.id);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student record?")) {
      setStudents(students.filter(s => s.id !== id));
      if (paginatedStudents.length === 1 && currentPage > 1) setCurrentPage(currentPage - 1);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', fatherName: '', phone: '', email: '', city: '', category: '', course: '', year: '', semester: '' });
    setIsFormOpen(false);
    setEditId(null);
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
      // 10% chance to fail just to demonstrate the error UI
      const isError = Math.random() < 0.1; 
      
      if (isError) {
        setUploadStatus('error');
      } else {
        setUploadStatus('success');
      }
    }, 2000);
  };

  const resetBulkUpload = () => {
    setUploadStatus('idle');
    setSelectedFile(null);
    setIsBulkUploadOpen(false);
  };

  // --- SEARCH & PAGINATION LOGIC ---
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.phone.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
                  {/* Step 1: Download Format */}
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-1">Step 1: Download Format</p>
                      <p className="text-[11px] text-gray-500 font-medium">Get the required Excel template.</p>
                    </div>
                    {/* Make sure the file exists at public/formats/Student_Bulk_Format.xlsx */}
                    <a href="/formats/Student_Bulk_Format.xlsx" download className="px-4 py-2 bg-white border border-[#EE6132] text-[#EE6132] text-xs font-bold rounded-lg hover:bg-orange-100 transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-sm">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      Download .xlsx
                    </a>
                  </div>

                  {/* Step 2: Upload Filled File */}
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
                  <p className="text-sm text-gray-500 mb-8">Student records have been securely added to the system.</p>
                  <button onClick={resetBulkUpload} className="w-full py-4 bg-[#111111] text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-colors shadow-md">Done</button>
                </motion.div>
              )}

              {/* ERROR STATE */}
              {uploadStatus === 'error' && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-8 sm:p-10">
                  <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 border-4 border-red-100">
                    <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2">Upload Rejected</h3>
                  <p className="text-sm text-red-500 font-medium mb-8 bg-red-50 py-3 rounded-lg mt-2 mx-4 border border-red-100">Error: Invalid format or missing required fields in rows 4-9.</p>
                  <div className="flex gap-3">
                    <button onClick={resetBulkUpload} className="w-full py-3.5 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors shadow-sm">Cancel</button>
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
          <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Student Management</h2>
          <p className="text-gray-500 mt-1">View, add, and manage student enrollment records.</p>
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
              <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg> Cancel</>
            ) : (
              <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg> Add Student</>
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
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-[#EE6132] rounded-full"></span>
                {editId ? 'Update Student Record' : 'Register New Student'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Row 1: Names */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Student Name <span className="text-red-500">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Aarav Sharma" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Father's Name <span className="text-red-500">*</span></label>
                    <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="e.g. Ramesh Sharma" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" required />
                  </div>
                </div>

                {/* Row 2: Contact (Phone & Email) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mobile Number <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit mobile number" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="student@example.com" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" required />
                  </div>
                </div>

                {/* Row 3: City & Caste */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">City <span className="text-red-500">*</span></label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Pune" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Caste / Category <span className="text-red-500">*</span></label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none cursor-pointer" required>
                      <option value="" disabled>Select Category</option>
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Academic Details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-6 space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Course <span className="text-red-500">*</span></label>
                    <select name="course" value={formData.course} onChange={handleChange} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none cursor-pointer" required>
                      <option value="" disabled>Select Course</option>
                      <option value="B.Tech">B.Tech</option>
                      <option value="BCA">BCA</option>
                      <option value="MBA">MBA</option>
                    </select>
                  </div>
                  <div className="md:col-span-3 space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Year <span className="text-red-500">*</span></label>
                    <select name="year" value={formData.year} onChange={handleChange} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none cursor-pointer" required>
                      <option value="" disabled>Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                  <div className="md:col-span-3 space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Semester <span className="text-red-500">*</span></label>
                    <select name="semester" value={formData.semester} onChange={handleChange} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none cursor-pointer" required>
                      <option value="" disabled>Sem</option>
                      <option value="1st Sem">1st Sem</option>
                      <option value="2nd Sem">2nd Sem</option>
                      <option value="3rd Sem">3rd Sem</option>
                      <option value="4th Sem">4th Sem</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                  <button type="submit" className="px-10 py-3.5 bg-[#111111] text-white font-bold text-sm rounded-lg hover:bg-gray-800 transition-colors shadow-sm">
                    {editId ? 'Update Student' : 'Save Student'}
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
              placeholder="Search name, ID, or mobile..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors text-sm font-medium text-gray-900 placeholder-gray-400"
            />
          </div>
          <span className="px-4 py-1.5 bg-orange-50 text-[#EE6132] text-xs font-bold rounded-lg border border-orange-100 shrink-0">
            {filteredStudents.length} Students
          </span>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest w-20">S.No</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Student Info</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Course Details</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Caste</th>
                <th className="px-8 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <AnimatePresence>
                {paginatedStudents.map((student, index) => (
                  <motion.tr 
                    key={student.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -10 }}
                    className="hover:bg-orange-50/40 transition-colors group"
                  >
                    <td className="px-8 py-4 whitespace-nowrap text-sm font-bold text-gray-400">
                      {((currentPage - 1) * itemsPerPage + index + 1).toString().padStart(2, '0')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{student.name}</div>
                      <div className="text-xs text-gray-500 font-mono mt-0.5">{student.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{student.course}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{student.year}, {student.semester}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-1.5 font-medium">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        {student.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[11px] font-bold rounded uppercase border border-blue-100">
                         {student.category}
                       </span>
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(student)} className="p-1.5 text-gray-400 hover:text-[#EE6132] bg-white hover:bg-orange-50 border border-transparent hover:border-orange-200 rounded-md transition-all">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                        <button onClick={() => handleDelete(student.id)} className="p-1.5 text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 border border-transparent hover:border-red-200 rounded-md transition-all">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {paginatedStudents.length === 0 && (
            <div className="py-16 text-center text-gray-400 bg-gray-50/50">
              <svg className="w-10 h-10 mx-auto mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <p className="text-sm font-medium">No students found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* --- PAGINATION FOOTER --- */}
        {totalPages > 0 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} entries
            </span>
            <div className="flex gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1.5 border border-gray-200 rounded-md text-xs font-bold text-gray-600 hover:bg-white hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent">Previous</button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button key={idx + 1} onClick={() => setCurrentPage(idx + 1)} className={`w-8 h-8 rounded-md text-xs font-bold transition-all ${currentPage === idx + 1 ? 'bg-[#111111] text-white' : 'text-gray-500 hover:bg-white border border-transparent hover:border-gray-200'}`}>{idx + 1}</button>
                ))}
              </div>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1.5 border border-gray-200 rounded-md text-xs font-bold text-gray-600 hover:bg-white hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent">Next</button>
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}