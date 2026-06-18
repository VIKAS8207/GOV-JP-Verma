// src/pages/Register.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    mobile: '',
    email: '',
    city: '',
    gender: '',
    caste: '',
    course: '',
    year: '',
    semester: '',
    electiveSubject: '' // Added elective subject to initial state
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration Data:", formData);
    
    // Pass the selected year and course to the Student Dashboard via state
    navigate('/student-dashboard', { 
      state: { 
        registeredYear: formData.year, 
        registeredCourse: formData.course 
      } 
    }); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5EC] via-[#FFE8D6] to-[#FAD4BA] text-[#111111] font-sans flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      
      {/* --- Ambient Background Grid Lines --- */}
      <div className="absolute inset-0 pointer-events-none flex justify-center w-full max-w-[1400px] mx-auto opacity-50">
         <div className="w-1/5 border-x border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[800px] bg-white rounded-[24px] shadow-[0_20px_50px_rgb(238,97,50,0.08)] border border-orange-100/50 relative z-10 overflow-hidden"
      >
        <div className="p-8 sm:p-10">
          
          {/* --- Header Section --- */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-[#EE6132] mb-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                <span className="font-extrabold text-xl tracking-tight text-gray-900">Student Portal</span>
              </div>
              <h1 className="text-2xl font-bold text-[#111111]">Student Registration</h1>
            </div>
            
            <Link 
              to="/" 
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-orange-50 text-[#EE6132] font-bold text-sm rounded-lg hover:bg-orange-100 transition-colors border border-orange-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Back to Login
            </Link>
          </div>

          {/* --- Registration Form --- */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Row 1: Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 placeholder-gray-400 shadow-sm"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Father's Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Sharma"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 placeholder-gray-400 shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Row 2: Contact (Phone & Email) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 placeholder-gray-400 shadow-sm"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 placeholder-gray-400 shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Row 3: Location & Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">City <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Pune"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 placeholder-gray-400 shadow-sm"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Gender <span className="text-red-500">*</span></label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 appearance-none shadow-sm cursor-pointer"
                  required
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Row 4: Academic Details (Caste, Course, Year, Sem, Elective) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              <div className="md:col-span-3 space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Caste <span className="text-red-500">*</span></label>
                <select
                  name="caste"
                  value={formData.caste}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 appearance-none shadow-sm cursor-pointer"
                  required
                >
                  <option value="" disabled>Select Caste</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>

              <div className="md:col-span-4 space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Course <span className="text-red-500">*</span></label>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 appearance-none shadow-sm cursor-pointer"
                  required
                >
                  <option value="" disabled>Select Course</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="BCA">BCA</option>
                  <option value="MBA">MBA</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Year <span className="text-red-500">*</span></label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 appearance-none shadow-sm cursor-pointer"
                  required
                >
                  <option value="" disabled>Year</option>
                  <option value="1">1st</option>
                  <option value="2">2nd</option>
                  <option value="3">3rd</option>
                  <option value="4">4th</option>
                </select>
              </div>

              <div className="md:col-span-3 space-y-1.5">
                <label className="text-sm font-bold text-gray-700">Semester <span className="text-red-500">*</span></label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 appearance-none shadow-sm cursor-pointer"
                  required
                >
                  <option value="" disabled>Sem</option>
                  <option value="1">1st Sem</option>
                  <option value="2">2nd Sem</option>
                  <option value="3">3rd Sem</option>
                  <option value="4">4th Sem</option>
                </select>
              </div>

            </div>

            {/* Row 5: Elective Subject */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">Elective Subject <span className="text-red-500">*</span></label>
              <select
                name="electiveSubject"
                value={formData.electiveSubject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 appearance-none shadow-sm cursor-pointer"
                required
              >
                <option value="" disabled>Select Elective Subject</option>
                <option value="NA">NA (Not Applicable)</option>
                <option value="Subject 1">Subject 1</option>
                <option value="Subject 2">Subject 2</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 bg-[#EE6132] text-white font-bold text-[15px] rounded-xl hover:bg-[#d9562a] transition-all hover:shadow-[0_8px_25px_rgba(238,97,50,0.3)] flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                Register & Calculate Fees
              </button>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  );
}