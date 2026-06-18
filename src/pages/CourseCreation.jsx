// src/pages/CourseCreation.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialCourses = [
  { id: 1, title: 'Civil Engineering', code: 'CIVIL-01', duration: '4 Years', year: '2026-2027' },
  { id: 2, title: 'Computer Science', code: 'CS-12', duration: '4 Years', year: '2026-2027' },
  { id: 3, title: 'Master of Business Admin', code: 'MBA-01', duration: '2 Years', year: '2026-2027' },
  { id: 4, title: 'Mechanical Engineering', code: 'ME-123', duration: '4 Years', year: '2026-2027' },
  { id: 5, title: 'Electrical Engineering', code: 'EE-44', duration: '4 Years', year: '2026-2027' },
  { id: 6, title: 'Bachelor of Arts', code: 'BA-01', duration: '3 Years', year: '2026-2027' },
];

export default function CourseCreation() {
  const [courses, setCourses] = useState(initialCourses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isBulkOpen, setIsBulkOpen] = useState(false); // New state for bulk upload modal
  const [editId, setEditId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // State for the uploaded file
  
  // Search & Pagination States
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    title: '',
    code: '',
    duration: '',
    year: '2026-2027'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- ACTIONS ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setCourses(courses.map(c => c.id === editId ? { ...formData, id: editId } : c));
      setEditId(null);
    } else {
      const newCourse = { id: Date.now(), ...formData };
      setCourses([newCourse, ...courses]);
    }
    resetForm();
  };

  const handleEdit = (course) => {
    setFormData({
      title: course.title,
      code: course.code,
      duration: course.duration,
      year: course.year
    });
    setEditId(course.id);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(c => c.id !== id));
      // Adjust pagination if deleting the last item on a page
      if (paginatedCourses.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleBulkUpload = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
    // Future logic: Send file to backend to parse and add courses
    alert(`File "${selectedFile.name}" uploaded successfully! Processing records...`);
    setIsBulkOpen(false);
    setSelectedFile(null);
  };

  const resetForm = () => {
    setFormData({ title: '', code: '', duration: '', year: '2026-2027' });
    setIsFormOpen(false);
    setEditId(null);
  };

  // --- SEARCH & PAGINATION LOGIC ---
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-[1600px] mx-auto relative"
    >
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
                  Bulk Upload Courses
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
                  {/* Make sure the file exists at public/formats/Course_Bulk_Format.xlsx */}
                  <a href="/formats/Course_Bulk_Format.xlsx" download className="px-4 py-2 bg-white border border-[#EE6132] text-[#EE6132] text-xs font-bold rounded-lg hover:bg-orange-100 transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-sm">
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
          <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Course Management</h2>
          <p className="text-gray-500 mt-1">Manage academic curriculum and batch durations.</p>
        </div>
        
        <div className="flex gap-3">
          {/* New Bulk Upload Button */}
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
              <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg> Add New Course</>
            )}
          </button>
        </div>
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
                {editId ? 'Update Existing Course' : 'Create New Course'}
              </h3>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Row 1: Full Width Course Name */}
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Course Name</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Civil Engineering"
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>

                  {/* Row 2: Code & Duration */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Course Code</label>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      placeholder="e.g. CE-01"
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium uppercase text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Duration</label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none cursor-pointer"
                      required
                    >
                      <option value="" disabled>Select Duration</option>
                      <option value="1 Year">1 Year</option>
                      <option value="2 Years">2 Years</option>
                      <option value="3 Years">3 Years</option>
                      <option value="4 Years">4 Years</option>
                    </select>
                  </div>

                  {/* Row 3: Batch & Button perfectly aligned */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Academic Batch</label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none cursor-pointer"
                      required
                    >
                      <option value="2025-2026">2025-2026</option>
                      <option value="2026-2027">2026-2027</option>
                      <option value="2027-2028">2027-2028</option>
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full h-[46px] bg-[#111111] text-white font-bold text-sm rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
                    >
                      {editId ? 'Update Course Details' : 'Save New Course'}
                    </button>
                  </div>

                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- TABLE LIST SECTION --- */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col">
        
        {/* Table Toolbar (Search & Count) */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="text"
              placeholder="Search by course name or code..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors text-sm font-medium text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Badge */}
          <div className="shrink-0">
            <span className="px-4 py-1.5 bg-orange-50 text-[#EE6132] text-xs font-bold rounded-lg border border-orange-100">
              {filteredCourses.length} Courses Found
            </span>
          </div>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="px-8 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest w-20">S.No</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Course Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Code</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Duration</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-widest">Batch</th>
                <th className="px-8 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <AnimatePresence>
                {paginatedCourses.map((course, index) => (
                  <motion.tr 
                    key={course.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="hover:bg-orange-50/40 transition-colors group"
                  >
                    <td className="px-8 py-4 whitespace-nowrap text-sm font-bold text-gray-400">
                      {((currentPage - 1) * itemsPerPage + index + 1).toString().padStart(2, '0')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {course.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded flex-inline items-center border border-gray-200">
                        {course.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                      {course.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                      {course.year}
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(course)}
                          className="p-1.5 text-gray-400 hover:text-[#EE6132] bg-white hover:bg-orange-50 border border-transparent hover:border-orange-200 rounded-md transition-all"
                          title="Edit Course"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                        <button 
                          onClick={() => handleDelete(course.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 border border-transparent hover:border-red-200 rounded-md transition-all"
                          title="Delete Course"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {paginatedCourses.length === 0 && (
            <div className="py-16 text-center text-gray-400 bg-gray-50/50">
              <svg className="w-10 h-10 mx-auto mb-3 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <p className="text-sm font-medium">No courses found matching your search.</p>
            </div>
          )}
        </div>

        {/* --- PAGINATION FOOTER --- */}
        {totalPages > 0 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCourses.length)} of {filteredCourses.length} entries
            </span>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-gray-200 rounded-md text-xs font-bold text-gray-600 hover:bg-white hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-transparent"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNumber = idx + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-8 h-8 rounded-md text-xs font-bold transition-all ${
                        currentPage === pageNumber 
                          ? 'bg-[#111111] text-white border border-[#111111]' 
                          : 'bg-transparent text-gray-500 hover:bg-white border border-transparent hover:border-gray-200'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-gray-200 rounded-md text-xs font-bold text-gray-600 hover:bg-white hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-transparent"
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