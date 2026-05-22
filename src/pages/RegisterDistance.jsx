// src/pages/RegisterDistance.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterDistance() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    // Step 1: Personal
    fullName: '', fatherName: '', mobile: '', email: '', city: '', gender: '',
    // Step 2: Education
    highestQualification: '', institution: '', passingYear: '', percentage: '',
    // Step 3: Course Selection
    course: '', specialization: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePaymentSubmit = () => {
    alert("Payment successful! Welcome to the Distance Education Portal.");
    navigate('/student-dashboard');
  };

  // Animation variants for smooth sliding
  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5EC] via-[#FFE8D6] to-[#FAD4BA] text-[#111111] font-sans flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 pointer-events-none flex justify-center w-full max-w-[1400px] mx-auto opacity-50">
         <div className="w-1/5 border-x border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
      </div>

      <div className="w-full max-w-[850px] relative z-10">
        
        {/* --- Header & Back Link --- */}
        <div className="flex justify-between items-end mb-6 px-2">
          <div>
            <div className="flex items-center gap-2 text-[#EE6132] mb-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
              <span className="font-extrabold text-xl tracking-tight text-gray-900">Distance Portal</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#111111] tracking-tight">Private Registration</h1>
          </div>
          <Link to="/" className="text-sm font-bold text-gray-500 hover:text-[#EE6132] transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Cancel
          </Link>
        </div>

        <div className="bg-white rounded-[24px] shadow-[0_20px_50px_rgb(238,97,50,0.08)] border border-orange-100/50 overflow-hidden">
          
          {/* --- Progress Stepper --- */}
          <div className="bg-gray-50/80 border-b border-gray-100 p-6 sm:px-10 flex justify-between items-center relative">
            <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-gray-200 -z-10 rounded-full"></div>
            <div className={`absolute left-10 top-1/2 -translate-y-1/2 h-1 bg-[#EE6132] -z-10 rounded-full transition-all duration-500`} style={{ width: `${((step - 1) / 3) * 100}%`, right: '2.5rem' }}></div>
            
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex flex-col items-center gap-2 bg-gray-50/80 px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 ${step >= num ? 'bg-[#EE6132] border-[#EE6132] text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                  {step > num ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> : num}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest hidden sm:block ${step >= num ? 'text-[#EE6132]' : 'text-gray-400'}`}>
                  {num === 1 ? 'Personal' : num === 2 ? 'Education' : num === 3 ? 'Course' : 'Payment'}
                </span>
              </div>
            ))}
          </div>

          <div className="p-6 sm:p-10 min-h-[400px]">
            <AnimatePresence mode="wait">
              
              {/* === STEP 1: PERSONAL INFO === */}
              {step === 1 && (
                <motion.form key="step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handleNext} className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">1. Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Rahul Verma" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Father's Name <span className="text-red-500">*</span></label>
                      <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="e.g. Sanjay Verma" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mobile Number <span className="text-red-500">*</span></label>
                      <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="10-digit mobile" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="student@example.com" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">City <span className="text-red-500">*</span></label>
                      <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="e.g. Raipur" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Gender <span className="text-red-500">*</span></label>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none" required>
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end pt-6">
                    <button type="submit" className="px-10 py-3.5 bg-[#111111] text-white font-bold text-sm rounded-lg hover:bg-gray-800 transition-colors shadow-sm">Next Step</button>
                  </div>
                </motion.form>
              )}

              {/* === STEP 2: EDUCATION HISTORY === */}
              {step === 2 && (
                <motion.form key="step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handleNext} className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">2. Previous Education History</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Highest Qualification <span className="text-red-500">*</span></label>
                      <select name="highestQualification" value={formData.highestQualification} onChange={handleChange} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none" required>
                        <option value="" disabled>Select Qualification</option>
                        <option value="12th Grade">12th Grade (HSC)</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Institution / Board Name <span className="text-red-500">*</span></label>
                      <input type="text" name="institution" value={formData.institution} onChange={handleChange} placeholder="e.g. CBSE Board" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Year of Passing <span className="text-red-500">*</span></label>
                      <input type="number" name="passingYear" value={formData.passingYear} onChange={handleChange} placeholder="e.g. 2024" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Percentage / CGPA <span className="text-red-500">*</span></label>
                      <input type="text" name="percentage" value={formData.percentage} onChange={handleChange} placeholder="e.g. 85%" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 placeholder-gray-400" required />
                    </div>
                  </div>
                  <div className="flex justify-between pt-6">
                    <button type="button" onClick={handleBack} className="px-8 py-3.5 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-200 transition-colors">Back</button>
                    <button type="submit" className="px-10 py-3.5 bg-[#111111] text-white font-bold text-sm rounded-lg hover:bg-gray-800 transition-colors shadow-sm">Next Step</button>
                  </div>
                </motion.form>
              )}

              {/* === STEP 3: COURSE & REVIEW === */}
              {step === 3 && (
                <motion.form key="step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handleNext} className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-6">3. Distance Course Selection</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Target Course <span className="text-red-500">*</span></label>
                        <select name="course" value={formData.course} onChange={handleChange} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none" required>
                          <option value="" disabled>Select Course</option>
                          <option value="Distance BA">Distance BA</option>
                          <option value="Distance B.Com">Distance B.Com</option>
                          <option value="Distance MBA">Distance MBA</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Specialization (Optional)</label>
                        <select name="specialization" value={formData.specialization} onChange={handleChange} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:border-[#EE6132] focus:bg-white transition-colors font-medium text-gray-900 appearance-none">
                          <option value="">None / General</option>
                          <option value="Finance">Finance</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Human Resources">Human Resources</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Summary Block */}
                  <div className="p-5 bg-orange-50 border border-orange-100 rounded-xl">
                    <h4 className="text-sm font-bold text-[#EE6132] uppercase tracking-widest mb-3">Quick Review</h4>
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <p><span className="font-bold text-gray-700">Name:</span> {formData.fullName || '—'}</p>
                      <p><span className="font-bold text-gray-700">Mobile:</span> {formData.mobile || '—'}</p>
                      <p><span className="font-bold text-gray-700">Qualification:</span> {formData.highestQualification || '—'}</p>
                      <p><span className="font-bold text-gray-700">Institution:</span> {formData.institution || '—'}</p>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button type="button" onClick={handleBack} className="px-8 py-3.5 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-200 transition-colors">Back</button>
                    <button type="submit" className="px-10 py-3.5 bg-[#EE6132] text-white font-bold text-sm rounded-lg hover:bg-[#d9562a] transition-colors shadow-sm">Proceed to Payment</button>
                  </div>
                </motion.form>
              )}

              {/* === STEP 4: PAYMENT === */}
              {step === 4 && (
                <motion.div key="step4" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6 text-center py-6">
                  <div className="w-20 h-20 bg-green-50 border-4 border-green-100 rounded-full flex items-center justify-center text-green-500 mx-auto mb-4">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                  </div>
                  
                  <h3 className="text-2xl font-extrabold text-gray-900">Application Ready</h3>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto">
                    Your distance education application for <strong>{formData.course || 'the selected program'}</strong> is complete. 
                  </p>

                  <div className="max-w-sm mx-auto bg-[#F8F9FA] border border-gray-200 rounded-xl p-6 my-8">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Registration & Initial Fee</p>
                    <p className="text-4xl font-extrabold text-[#111111]">₹12,500</p>
                  </div>

                  <div className="flex justify-center gap-4 pt-4">
                    <button type="button" onClick={handleBack} className="px-8 py-3.5 bg-gray-100 text-gray-700 font-bold text-sm rounded-lg hover:bg-gray-200 transition-colors">Go Back</button>
                    <button type="button" onClick={handlePaymentSubmit} className="px-10 py-3.5 bg-[#EE6132] text-white font-bold text-sm rounded-lg hover:bg-[#d9562a] transition-colors shadow-md hover:shadow-lg flex items-center gap-2">
                      Pay Securely Now
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
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