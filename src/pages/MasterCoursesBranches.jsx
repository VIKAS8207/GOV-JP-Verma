// src/pages/MasterCoursesBranches.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data for Master Courses and their Branches
const initialMasterCourses = [
  { 
    id: 1, 
    courseName: 'Bachelor of Technology', 
    courseCode: 'BTECH', 
    courseType: 'UG', 
    branches: ['Computer Science', 'Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'IT'] 
  },
  { 
    id: 2, 
    courseName: 'Master of Business Administration', 
    courseCode: 'MBA', 
    courseType: 'PG', 
    branches: ['Marketing', 'Finance', 'Human Resources', 'Operations', 'International Business'] 
  },
  { 
    id: 3, 
    courseName: 'Bachelor of Arts', 
    courseCode: 'BA', 
    courseType: 'UG', 
    branches: ['History', 'Political Science', 'English Literature', 'Economics'] 
  },
  { 
    id: 4, 
    courseName: 'Diploma in Engineering', 
    courseCode: 'DIP-ENG', 
    courseType: 'Diploma', 
    branches: ['Computer Science', 'Civil', 'Electrical'] 
  }
];

export default function MasterCoursesBranches() {
  const [courses, setCourses] = useState(initialMasterCourses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // Search & Pagination States
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const defaultFormState = {
    courseName: '',
    courseCode: '',
    courseType: '',
    branches: [''] // Starts with one empty branch input
  };

  const [formData, setFormData] = useState(defaultFormState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- DYNAMIC BRANCH HANDLERS ---
  const handleBranchChange = (index, value) => {
    const newBranches = [...formData.branches];
    newBranches[index] = value;
    setFormData({ ...formData, branches: newBranches });
  };

  const addBranchField = () => {
    setFormData({ ...formData, branches: [...formData.branches, ''] });
  };

  const removeBranchField = (index) => {
    const newBranches = formData.branches.filter((_, i) => i !== index);
    setFormData({ ...formData, branches: newBranches });
  };

  // --- ACTIONS ---
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Clean up empty branches before saving
    const cleanedBranches = formData.branches
      .map(b => b.trim())
      .filter(b => b !== '');

    if (cleanedBranches.length === 0) {
      alert("Please add at least one valid branch/specialization.");
      return;
    }

    const finalData = { ...formData, branches: cleanedBranches };

    if (editId) {
      setCourses(courses.map(c => c.id === editId ? { ...finalData, id: editId } : c));
      setEditId(null);
    } else {
      const newCourse = { id: Date.now(), ...finalData };
      setCourses([newCourse, ...courses]);
    }
    resetForm();
  };

  const handleEdit = (courseItem) => {
    setFormData({
      courseName: courseItem.courseName || '',
      courseCode: courseItem.courseCode || '',
      courseType: courseItem.courseType || '',
      branches: courseItem.branches.length > 0 ? [...courseItem.branches] : ['']
    });
    setEditId(courseItem.id);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this master course and all its branches?")) {
      setCourses(courses.filter(c => c.id !== id));
      if (paginatedCourses.length === 1 && currentPage > 1) {
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
  const filteredCourses = useMemo(() => {
    return courses.filter(course => 
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.branches.some(b => b.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [courses, searchTerm]);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // --- KPIs ---
  const totalCourses = courses.length;
  const totalBranches = courses.reduce((sum, course) => sum + course.branches.length, 0);
  const totalUG = courses.filter(c => c.courseType === 'UG').length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[1600px] mx-auto relative space-y-8">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Master Courses & Branches</h2>
          <p className="text-gray-500 mt-1">Configure root academic programs and their internal specializations.</p>
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
            <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg> Create Master Course</>
          )}
        </button>
      </div>

      {/* --- KPI SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111111] p-6 rounded-2xl shadow-lg flex flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z"></path><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 relative z-10">Total Master Courses</p>
          <h3 className="text-4xl font-black text-white font-mono tracking-tight relative z-10">{totalCourses}</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Associated Branches</p>
          <div className="flex items-center gap-3">
            <h3 className="text-4xl font-black text-[#EE6132] font-mono tracking-tight">{totalBranches}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">UG Programs Active</p>
          <div className="flex items-center gap-3">
            <h3 className="text-4xl font-black text-blue-600 font-mono tracking-tight">{totalUG}</h3>
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
                {editId ? 'Update Master Course' : 'Configure New Master Course'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Basic Course Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1.5 md:col-span-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Course Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="courseName"
                      value={formData.courseName}
                      onChange={handleChange}
                      placeholder="e.g. Bachelor of Technology"
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-bold text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Course Code <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="courseCode"
                      value={formData.courseCode}
                      onChange={handleChange}
                      placeholder="e.g. BTECH"
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-bold text-gray-900 uppercase placeholder-gray-400"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Course Type <span className="text-red-500">*</span></label>
                    <select
                      name="courseType"
                      value={formData.courseType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-bold text-gray-900 appearance-none cursor-pointer"
                      required
                    >
                      <option value="" disabled>Select Type</option>
                      <option value="UG">UG (Undergraduate)</option>
                      <option value="PG">PG (Postgraduate)</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Certificate">Certificate</option>
                    </select>
                  </div>
                </div>

                {/* Dynamic Branches Section */}
                <div className="p-6 bg-orange-50/50 border border-orange-100 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center border-b border-orange-200 pb-3">
                    <h4 className="text-sm font-black text-[#EE6132] uppercase tracking-widest flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                      Associated Branches
                    </h4>
                    <button 
                      type="button" 
                      onClick={addBranchField}
                      className="px-4 py-2 bg-white text-[#EE6132] font-bold text-xs rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                      Add Branch
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formData.branches.map((branch, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={branch}
                          onChange={(e) => handleBranchChange(index, e.target.value)}
                          placeholder={`Branch ${index + 1} Name`}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] transition-colors font-medium text-gray-900 placeholder-gray-400 shadow-sm"
                          required
                        />
                        {formData.branches.length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => removeBranchField(index)}
                            className="p-2.5 bg-white text-red-500 hover:bg-red-50 hover:text-red-700 border border-gray-200 hover:border-red-200 rounded-lg transition-colors shadow-sm shrink-0"
                            title="Remove Branch"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-10 py-3.5 bg-[#EE6132] text-white font-bold text-sm rounded-xl hover:bg-[#d9562a] transition-colors shadow-md"
                  >
                    {editId ? 'Update Master Record' : 'Save Master Course'}
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
          <div className="relative w-full sm:w-[400px]">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input
              type="text"
              placeholder="Search Course Name, Code or Branch..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all text-sm font-bold text-gray-900 shadow-sm placeholder-gray-400"
            />
          </div>
          <span className="px-4 py-2 bg-orange-50 text-[#EE6132] text-xs font-extrabold uppercase tracking-widest rounded-lg border border-orange-100 shrink-0 shadow-sm">
            {filteredCourses.length} Master Records
          </span>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest w-16">S.No</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Course Info</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Type</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest w-[40%]">Associated Branches</th>
                <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <AnimatePresence>
                {paginatedCourses.map((course, index) => (
                  <motion.tr 
                    key={course.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -10 }}
                    className="hover:bg-orange-50/30 transition-colors group"
                  >
                    <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-gray-400">
                      {((currentPage - 1) * itemsPerPage + index + 1).toString().padStart(2, '0')}
                    </td>
                    
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-black text-gray-900">{course.courseName}</span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono bg-gray-100 px-2 py-0.5 rounded w-fit border border-gray-200">
                          Code: {course.courseCode}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded border border-blue-100">
                        {course.courseType}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-2">
                        {course.branches.map((branch, i) => (
                          <span key={i} className="px-2.5 py-1 bg-white border border-gray-200 text-gray-700 text-[10px] font-bold rounded shadow-sm">
                            {branch}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-8 py-5 whitespace-nowrap text-right align-top">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity mt-2">
                        <button onClick={() => handleEdit(course)} className="p-2 text-gray-400 hover:text-[#EE6132] bg-white hover:bg-orange-50 border border-transparent hover:border-orange-200 rounded-lg transition-all shadow-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                        <button onClick={() => handleDelete(course.id)} className="p-2 text-gray-400 hover:text-red-600 bg-white hover:bg-red-50 border border-transparent hover:border-red-200 rounded-lg transition-all shadow-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {paginatedCourses.length === 0 && (
            <div className="py-20 text-center text-gray-400 bg-gray-50/50">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              <p className="text-sm font-bold">No master records found.</p>
            </div>
          )}
        </div>

        {/* --- PAGINATION FOOTER --- */}
        {totalPages > 0 && (
          <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCourses.length)} of {filteredCourses.length}
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