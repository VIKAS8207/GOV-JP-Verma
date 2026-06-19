// src/pages/Register.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  
  // Multi-step state
  const [step, setStep] = useState(1);
  
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
    electiveSubject: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1 -> Step 2
  const handleContinue = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2 -> Step 1
  const handleBack = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Final Submission
  const handleFinalSubmit = () => {
    console.log("Verified Registration Data:", formData);
    
    // Pass the selected year, course, and full profile to the Student Dashboard via state
    navigate('/student-dashboard', { 
      state: { 
        registeredYear: formData.year, 
        registeredCourse: formData.course,
        studentProfile: formData 
      } 
    }); 
  };

  // Animation variants for smooth sliding transitions
  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  // Helper component for the Review Screen (Fixed text wrapping issue)
  const ReviewItem = ({ label, value }) => (
    <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl w-full overflow-hidden flex flex-col">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 truncate">{label}</p>
      <p className="text-sm font-bold text-gray-900 break-all">{value || <span className="text-gray-300">Not Provided</span>}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5EC] via-[#FFE8D6] to-[#FAD4BA] text-[#111111] font-sans flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      
      {/* --- Ambient Background Grid Lines --- */}
      <div className="absolute inset-0 pointer-events-none flex justify-center w-full max-w-[1400px] mx-auto opacity-50 z-0">
         <div className="w-1/5 border-x border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
      </div>

      <div className="w-full max-w-[800px] relative z-10">
        
        {/* --- Header Section (Outside the card to remain static) --- */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 px-2">
          <div>
            <div className="flex items-center gap-2 text-[#EE6132] mb-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <span className="font-extrabold text-xl tracking-tight text-gray-900">Student Portal</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#111111] tracking-tight">
              {step === 1 ? 'Student Registration' : 'Verify Your Details'}
            </h1>
          </div>
          
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/60 backdrop-blur-md text-gray-700 font-bold text-sm rounded-xl hover:bg-white hover:text-[#EE6132] transition-colors border border-orange-200/50 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Login
          </Link>
        </div>

        <div className="bg-white rounded-[24px] shadow-[0_20px_50px_rgb(238,97,50,0.08)] border border-orange-100/50 overflow-hidden">
          
          {/* Progress Indicator */}
          <div className="flex bg-gray-50/80 border-b border-gray-100">
            <div className={`flex-1 text-center py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors duration-300 ${step === 1 ? 'border-[#EE6132] text-[#EE6132] bg-white' : 'border-transparent text-gray-400'}`}>
              1. Enter Details
            </div>
            <div className={`flex-1 text-center py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors duration-300 ${step === 2 ? 'border-[#EE6132] text-[#EE6132] bg-white' : 'border-transparent text-gray-400'}`}>
              2. Review & Submit
            </div>
          </div>

          <div className="p-8 sm:p-10 min-h-[500px]">
            <AnimatePresence mode="wait">
              
              {/* ========================================== */}
              {/* STEP 1: DATA ENTRY FORM                    */}
              {/* ========================================== */}
              {step === 1 && (
                <motion.form 
                  key="form-step"
                  variants={slideVariants} initial="hidden" animate="visible" exit="exit"
                  onSubmit={handleContinue} 
                  className="space-y-6"
                >
                  {/* Row 1: Names */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Aarav Sharma" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 placeholder-gray-400" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Father's Name <span className="text-red-500">*</span></label>
                      <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="e.g. Ramesh Sharma" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 placeholder-gray-400" required />
                    </div>
                  </div>

                  {/* Row 2: Contact (Adjusted grid so Email is wider) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1.5 md:col-span-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Mobile Number <span className="text-red-500">*</span></label>
                      <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="10-digit mobile number" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 placeholder-gray-400" required />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="student@example.com" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 placeholder-gray-400" required />
                    </div>
                  </div>

                  {/* Row 3: Location & Gender (Moved City here) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">City <span className="text-red-500">*</span></label>
                      <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Bilaspur" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 placeholder-gray-400" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Gender <span className="text-red-500">*</span></label>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 appearance-none cursor-pointer" required>
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Academic Details */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-3 space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Caste <span className="text-red-500">*</span></label>
                      <select name="caste" value={formData.caste} onChange={handleChange} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 appearance-none cursor-pointer" required>
                        <option value="" disabled>Select Caste</option>
                        <option value="General">General</option>
                        <option value="OBC">OBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                      </select>
                    </div>
                    <div className="md:col-span-4 space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Course <span className="text-red-500">*</span></label>
                      <select name="course" value={formData.course} onChange={handleChange} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 appearance-none cursor-pointer" required>
                        <option value="" disabled>Select Course</option>
                        <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                        <option value="BCA">BCA</option>
                        <option value="MBA">MBA</option>
                        <option value="B.A First Year">B.A First Year</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Year <span className="text-red-500">*</span></label>
                      <select name="year" value={formData.year} onChange={handleChange} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 appearance-none cursor-pointer" required>
                        <option value="" disabled>Year</option>
                        <option value="1">1st</option>
                        <option value="2">2nd</option>
                        <option value="3">3rd</option>
                        <option value="4">4th</option>
                      </select>
                    </div>
                    <div className="md:col-span-3 space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Semester <span className="text-red-500">*</span></label>
                      <select name="semester" value={formData.semester} onChange={handleChange} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 appearance-none cursor-pointer" required>
                        <option value="" disabled>Sem</option>
                        <option value="1">1st Sem</option>
                        <option value="2">2nd Sem</option>
                        <option value="3">3rd Sem</option>
                        <option value="4">4th Sem</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Elective */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Elective Subject <span className="text-red-500">*</span></label>
                    <select name="electiveSubject" value={formData.electiveSubject} onChange={handleChange} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 transition-all font-medium text-gray-900 appearance-none cursor-pointer" required>
                      <option value="" disabled>Select Elective Subject</option>
                      <option value="NA">NA (Not Applicable)</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Cyber Security">Cyber Security</option>
                      <option value="Data Science">Data Science</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6 border-t border-gray-100 flex justify-end">
                    <button type="submit" className="px-12 py-4 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-lg flex items-center gap-2 group">
                      Continue to Verification
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                  </div>
                </motion.form>
              )}

              {/* ========================================== */}
              {/* STEP 2: REVIEW & VERIFY FORM               */}
              {/* ========================================== */}
              {step === 2 && (
                <motion.div 
                  key="review-step"
                  variants={slideVariants} initial="hidden" animate="visible" exit="exit"
                  className="space-y-8"
                >
                  <div className="bg-orange-50 border border-orange-200 p-4 rounded-xl flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#EE6132] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <p className="text-sm font-medium text-gray-800">
                      Please verify that all the information below matches your official documents. Incorrect information may cause issues with your fee calculation and enrollment.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">Personal Information</h3>
                      {/* Changed to grid-cols-1 on mobile so they stack vertically */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <ReviewItem label="Full Name" value={formData.fullName} />
                        <ReviewItem label="Father's Name" value={formData.fatherName} />
                        <ReviewItem label="Gender" value={formData.gender} />
                      </div>
                    </div>

                    {/* Adjusted grid for Contact Details Review so email has space */}
                    <div>
                      <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">Contact Details</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-1"><ReviewItem label="Mobile Number" value={formData.mobile} /></div>
                        <div className="sm:col-span-1"><ReviewItem label="City" value={formData.city} /></div>
                        {/* Email spans full width on mobile, and spans 3 columns on small screens if necessary, but here we place it nicely */}
                        <div className="sm:col-span-3"><ReviewItem label="Email Address" value={formData.email} /></div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-2">Academic Registration</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="col-span-2"><ReviewItem label="Course" value={formData.course} /></div>
                        <ReviewItem label="Year" value={formData.year ? `Year ${formData.year}` : ''} />
                        <ReviewItem label="Semester" value={formData.semester ? `Sem ${formData.semester}` : ''} />
                        <ReviewItem label="Caste Category" value={formData.caste} />
                        <div className="col-span-2 sm:col-span-3"><ReviewItem label="Elective Subject" value={formData.electiveSubject} /></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-100 flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
                    <button 
                      onClick={handleBack}
                      className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      Go Back & Edit
                    </button>
                    
                    <button 
                      onClick={handleFinalSubmit}
                      className="w-full sm:w-auto px-10 py-4 bg-[#EE6132] text-white font-bold text-sm rounded-xl hover:bg-[#d9562a] transition-all shadow-lg hover:shadow-[#EE6132]/30 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                      Register & Calculate Fees
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}