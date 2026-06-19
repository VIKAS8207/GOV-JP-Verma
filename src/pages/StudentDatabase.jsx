// src/pages/StudentDatabase.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Mock Data for the Full Student Database
const initialStudents = [
  { id: 'STU-10001', name: 'Aarav Sharma', gender: 'Male', course: 'B.Tech', branch: 'Computer Science', semester: '1st Sem', caste: 'General', city: 'Pune' },
  { id: 'STU-10002', name: 'Priya Patel', gender: 'Female', course: 'MBA', branch: 'Marketing', semester: '3rd Sem', caste: 'OBC/UR', city: 'Mumbai' },
  { id: 'STU-10003', name: 'Rohan Verma', gender: 'Male', course: 'B.A', branch: 'History', semester: '1st Sem', caste: 'SC/ST', city: 'Delhi' },
  { id: 'STU-10004', name: 'Sneha Gupta', gender: 'Female', course: 'B.Com', branch: 'Accounting', semester: '2nd Sem', caste: 'General', city: 'Indore' },
  { id: 'STU-10005', name: 'Kabir Singh', gender: 'Male', course: 'BCA', branch: 'Computer Science', semester: '4th Sem', caste: 'OBC/UR', city: 'Bhopal' },
  { id: 'STU-10006', name: 'Meera Rajput', gender: 'Female', course: 'B.Tech', branch: 'Civil Engineering', semester: '5th Sem', caste: 'General', city: 'Pune' },
  { id: 'STU-10007', name: 'Karan Johar', gender: 'Male', course: 'B.Sc', branch: 'Physics', semester: '1st Sem', caste: 'SC/ST', city: 'Jaipur' },
  { id: 'STU-10008', name: 'Ananya Pandey', gender: 'Female', course: 'MBA', branch: 'Finance', semester: '1st Sem', caste: 'General', city: 'Mumbai' },
  { id: 'STU-10009', name: 'Rahul Dravid', gender: 'Male', course: 'B.Tech', branch: 'Mechanical', semester: '3rd Sem', caste: 'OBC/UR', city: 'Bangalore' },
  { id: 'STU-10010', name: 'Smriti Mandhana', gender: 'Female', course: 'B.Com', branch: 'General', semester: '4th Sem', caste: 'SC/ST', city: 'Pune' },
  { id: 'STU-10011', name: 'Virat Kohli', gender: 'Male', course: 'B.A', branch: 'Political Science', semester: '2nd Sem', caste: 'General', city: 'Delhi' },
];

export default function StudentDatabase() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Advanced Filters
  const [genderFilter, setGenderFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [branchFilter, setBranchFilter] = useState('All');
  const [semesterFilter, setSemesterFilter] = useState('All');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Showing 8 per page to display more records

  // Extract unique options for dropdowns dynamically from data
  const availableCourses = [...new Set(initialStudents.map(s => s.course))];
  const availableBranches = [...new Set(initialStudents.map(s => s.branch))];
  const availableSemesters = [...new Set(initialStudents.map(s => s.semester))];

  // Filter Logic
  const filteredData = useMemo(() => {
    return initialStudents.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.city.toLowerCase().includes(searchTerm.toLowerCase());
                          
      const matchGender = genderFilter === 'All' || item.gender === genderFilter;
      const matchCourse = courseFilter === 'All' || item.course === courseFilter;
      const matchBranch = branchFilter === 'All' || item.branch === branchFilter;
      const matchSemester = semesterFilter === 'All' || item.semester === semesterFilter;
      
      return matchSearch && matchGender && matchCourse && matchBranch && matchSemester;
    });
  }, [searchTerm, genderFilter, courseFilter, branchFilter, semesterFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Aggregated KPIs based on filtered data
  const totalStudents = filteredData.length;
  const totalMale = filteredData.filter(s => s.gender === 'Male').length;
  const totalFemale = filteredData.filter(s => s.gender === 'Female').length;

  // Reset pagination when filters change
  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  // --- PDF EXPORT FUNCTION ---
  const handleExportPDF = () => {
    const doc = new jsPDF('landscape'); // Landscape format is better for many columns
    
    // Add Report Title
    doc.setFontSize(18);
    doc.setTextColor(17, 17, 17);
    doc.text('Student Database Report', 14, 22);
    
    // Add Timestamp & Filter Details
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleString()} | Total Records: ${filteredData.length}`, 14, 30);

    // Define Table Columns and Rows
    const tableColumn = ["S.No", "Student ID", "Student Name", "Gender", "Course", "Branch", "Semester", "Caste", "City"];
    const tableRows = [];

    filteredData.forEach((item, index) => {
      const rowData = [
        index + 1,
        item.id,
        item.name,
        item.gender,
        item.course,
        item.branch,
        item.semester,
        item.caste,
        item.city
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
    doc.save(`Student_Database_Report_${new Date().getTime()}.pdf`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[1600px] mx-auto space-y-8">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Full Student Database</h2>
          <p className="text-gray-500 mt-1">Comprehensive directory of all registered students with advanced filtering.</p>
        </div>
        
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back
          </button>
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            Export PDF Report
          </button>
        </div>
      </div>

      {/* --- KPI SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111111] p-6 rounded-2xl shadow-lg flex flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 relative z-10">Total Filtered Students</p>
          <h3 className="text-4xl font-black text-white font-mono tracking-tight relative z-10">{totalStudents}</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Male Students</p>
          <div className="flex items-center gap-3">
            <h3 className="text-4xl font-black text-blue-600 font-mono tracking-tight">{totalMale}</h3>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Female Students</p>
          <div className="flex items-center gap-3">
            <h3 className="text-4xl font-black text-pink-500 font-mono tracking-tight">{totalFemale}</h3>
            <div className="w-8 h-8 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
            </div>
          </div>
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
                placeholder="Search Name, ID, or City..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all text-sm font-bold text-gray-900 shadow-sm placeholder-gray-400"
              />
            </div>

            {/* Gender Filter */}
            <select 
              value={genderFilter} 
              onChange={(e) => handleFilterChange(setGenderFilter, e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-xs font-bold py-3 px-4 rounded-xl outline-none focus:border-[#EE6132] shadow-sm appearance-none cursor-pointer"
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            {/* Course Filter */}
            <select 
              value={courseFilter} 
              onChange={(e) => handleFilterChange(setCourseFilter, e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-xs font-bold py-3 px-4 rounded-xl outline-none focus:border-[#EE6132] shadow-sm appearance-none cursor-pointer"
            >
              <option value="All">All Courses</option>
              {availableCourses.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Branch Filter */}
            <select 
              value={branchFilter} 
              onChange={(e) => handleFilterChange(setBranchFilter, e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-xs font-bold py-3 px-4 rounded-xl outline-none focus:border-[#EE6132] shadow-sm appearance-none cursor-pointer"
            >
              <option value="All">All Branches</option>
              {availableBranches.map(b => <option key={b} value={b}>{b}</option>)}
            </select>

            {/* Semester Filter */}
            <select 
              value={semesterFilter} 
              onChange={(e) => handleFilterChange(setSemesterFilter, e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-xs font-bold py-3 px-4 rounded-xl outline-none focus:border-[#EE6132] shadow-sm appearance-none cursor-pointer"
            >
              <option value="All">All Semesters</option>
              {availableSemesters.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest w-16">S.No</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Student Name</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Gender</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Course</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Branch</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Semester</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Caste</th>
                <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">City</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <AnimatePresence>
                {paginatedData.map((item, index) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -10 }}
                    className="hover:bg-orange-50/30 transition-colors group"
                  >
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-400">
                      {((currentPage - 1) * itemsPerPage + index + 1).toString().padStart(2, '0')}
                    </td>
                    
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">{item.name}</span>
                        <span className="text-[10px] font-bold text-gray-400 font-mono mt-0.5">{item.id}</span>
                      </div>
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border ${item.gender === 'Female' ? 'bg-pink-50 text-pink-600 border-pink-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                        {item.gender}
                      </span>
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-800">
                      {item.course}
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-600">
                      {item.branch}
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="px-3 py-1 bg-gray-50 text-gray-700 text-[10px] uppercase tracking-wider font-bold rounded-lg border border-gray-200">
                        {item.semester}
                      </span>
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-600">{item.caste}</span>
                    </td>

                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-500">
                      {item.city}
                    </td>

                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {paginatedData.length === 0 && (
            <div className="py-20 text-center text-gray-400 bg-gray-50/50">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              <p className="text-sm font-bold">No students found matching your filters.</p>
            </div>
          )}
        </div>

        {/* --- PAGINATION FOOTER --- */}
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