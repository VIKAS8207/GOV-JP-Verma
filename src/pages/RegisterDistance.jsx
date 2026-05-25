// src/pages/RegisterDistance.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterDistance() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  
  // Detailed State Management
  const [personal, setPersonal] = useState({
    firstName: '', lastName: '', dob: '', gender: '', bloodGroup: '', aadhar: '',
    email: '', mobile: '', altMobile: '',
    address: '', city: '', state: '', pincode: ''
  });

  const [education, setEducation] = useState([
    { id: Date.now(), level: '', institution: '', board: '', year: '', score: '' }
  ]);

  const [course, setCourse] = useState({
    program: '', specialization: '', medium: 'English'
  });

  // --- HANDLERS ---
  const handleNext = (e) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const addEducation = () => {
    setEducation([...education, { id: Date.now(), level: '', institution: '', board: '', year: '', score: '' }]);
  };

  const removeEducation = (id) => {
    if (education.length > 1) {
      setEducation(education.filter(ed => ed.id !== id));
    }
  };

  const updateEducation = (id, field, value) => {
    setEducation(education.map(ed => ed.id === id ? { ...ed, [field]: value } : ed));
  };

  const handlePaymentSubmit = () => {
    setIsProcessing(true);
    // Simulate secure payment gateway delay
    setTimeout(() => {
      setIsProcessing(false);
      setTransactionId(`TXN-${Math.floor(100000000 + Math.random() * 900000000)}`);
      setShowSuccessModal(true);
    }, 2500);
  };

  const finishRegistration = () => {
    setShowSuccessModal(false);
    navigate('/student-dashboard');
  };

  // --- ANIMATION VARIANTS ---
  const slideVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  // Fees Calculation (Mock)
  const baseFee = 10000;
  const regFee = 593.22;
  const subTotal = baseFee + regFee;
  const gst = subTotal * 0.18;
  const grandTotal = subTotal + gst;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5EC] via-[#FFE8D6] to-[#FAD4BA] text-[#111111] font-sans flex flex-col items-center py-10 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 pointer-events-none flex justify-center w-full max-w-[1400px] mx-auto opacity-50 z-0">
         <div className="w-1/5 border-x border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
         <div className="w-1/5 border-r border-orange-300/40 h-full"></div>
      </div>

      <div className="w-full max-w-[900px] relative z-10">
        
        {/* --- Header --- */}
        <div className="flex justify-between items-end mb-10 px-2">
          <div>
            <div className="flex items-center gap-2 text-[#EE6132] mb-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
              <span className="font-extrabold text-xl tracking-tight text-gray-900">Distance Portal</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#111111] tracking-tight">Private Enrollment</h1>
          </div>
          <Link to="/" className="text-sm font-bold text-gray-500 hover:text-[#EE6132] transition-colors flex items-center gap-1 bg-white/50 px-4 py-2 rounded-full border border-gray-200 backdrop-blur-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Cancel
          </Link>
        </div>

        {/* --- Independent Detached Stepper --- */}
        <div className="mb-10 w-full px-4">
          <div className="relative flex justify-between items-center max-w-[700px] mx-auto">
            {/* Background Line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-300 rounded-full z-0"></div>
            {/* Active Line Indicator */}
            <motion.div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#EE6132] rounded-full z-0 origin-left"
              initial={{ width: '0%' }}
              animate={{ width: `${((step - 1) / 3) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
            
            {/* Step Dots */}
            {[
              { num: 1, label: 'Demographics' },
              { num: 2, label: 'Education' },
              { num: 3, label: 'Program' },
              { num: 4, label: 'Payment' }
            ].map((s) => (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <motion.div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-[3px] shadow-sm transition-colors duration-300 ${
                    step >= s.num ? 'bg-[#EE6132] border-[#EE6132] text-white' : 'bg-white border-gray-300 text-gray-400'
                  }`}
                  animate={step === s.num ? { scale: 1.1 } : { scale: 1 }}
                >
                  {step > s.num ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> : s.num}
                </motion.div>
                <span className={`absolute -bottom-6 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${step >= s.num ? 'text-[#EE6132]' : 'text-gray-400'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* --- Main Form Card --- */}
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgb(238,97,50,0.06)] border border-orange-100/50 overflow-hidden relative z-20">
          <div className="p-6 sm:p-12 min-h-[500px]">
            <AnimatePresence mode="wait">
              
              {/* ============================== */}
              {/* STEP 1: PERSONAL INFORMATION   */}
              {/* ============================== */}
              {step === 1 && (
                <motion.form key="step1" variants={slideVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handleNext} className="space-y-8">
                  <div>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-1">Applicant Demographics</h3>
                    <p className="text-sm text-gray-500 mb-6">Please ensure details match your official government ID.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1.5 md:col-span-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">First Name <span className="text-red-500">*</span></label>
                      <input type="text" value={personal.firstName} onChange={(e) => setPersonal({...personal, firstName: e.target.value})} placeholder="First Name" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 font-medium text-gray-900 transition-all" required />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Last Name <span className="text-red-500">*</span></label>
                      <input type="text" value={personal.lastName} onChange={(e) => setPersonal({...personal, lastName: e.target.value})} placeholder="Last Name" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 font-medium text-gray-900 transition-all" required />
                    </div>

                    <div className="space-y-1.5 md:col-span-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date of Birth <span className="text-red-500">*</span></label>
                      <input type="date" value={personal.dob} onChange={(e) => setPersonal({...personal, dob: e.target.value})} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 font-medium text-gray-900 transition-all uppercase" required />
                    </div>
                    <div className="space-y-1.5 md:col-span-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Gender <span className="text-red-500">*</span></label>
                      <select value={personal.gender} onChange={(e) => setPersonal({...personal, gender: e.target.value})} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 font-medium text-gray-900 appearance-none transition-all" required>
                        <option value="" disabled>Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Transgender">Transgender</option>
                      </select>
                    </div>
                    <div className="space-y-1.5 md:col-span-1">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Blood Group</label>
                      <select value={personal.bloodGroup} onChange={(e) => setPersonal({...personal, bloodGroup: e.target.value})} className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 font-medium text-gray-900 appearance-none transition-all">
                        <option value="">Unknown</option>
                        <option value="A+">A+</option><option value="O+">O+</option><option value="B+">B+</option><option value="AB+">AB+</option>
                        <option value="A-">A-</option><option value="O-">O-</option><option value="B-">B-</option><option value="AB-">AB-</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 md:col-span-3">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Aadhar / National ID Number <span className="text-red-500">*</span></label>
                      <input type="text" value={personal.aadhar} onChange={(e) => setPersonal({...personal, aadhar: e.target.value})} placeholder="XXXX XXXX XXXX" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] focus:ring-2 focus:ring-[#EE6132]/20 font-medium text-gray-900 transition-all tracking-widest" required />
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" value={personal.email} onChange={(e) => setPersonal({...personal, email: e.target.value})} placeholder="student@domain.com" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] transition-all font-medium text-gray-900" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Primary Mobile <span className="text-red-500">*</span></label>
                      <input type="tel" value={personal.mobile} onChange={(e) => setPersonal({...personal, mobile: e.target.value})} placeholder="+91 XXXXXXXXXX" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] transition-all font-medium text-gray-900" required />
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Residential Address <span className="text-red-500">*</span></label>
                      <textarea rows="2" value={personal.address} onChange={(e) => setPersonal({...personal, address: e.target.value})} placeholder="Street, Locality, Landmark" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] transition-all font-medium text-gray-900 resize-none" required></textarea>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">State <span className="text-red-500">*</span></label>
                      <input type="text" value={personal.state} onChange={(e) => setPersonal({...personal, state: e.target.value})} placeholder="e.g. Chhattisgarh" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] transition-all font-medium text-gray-900" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">City <span className="text-red-500">*</span></label>
                        <input type="text" value={personal.city} onChange={(e) => setPersonal({...personal, city: e.target.value})} placeholder="e.g. Raipur" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] transition-all font-medium text-gray-900" required />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pincode <span className="text-red-500">*</span></label>
                        <input type="text" value={personal.pincode} onChange={(e) => setPersonal({...personal, pincode: e.target.value})} placeholder="000000" className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] transition-all font-medium text-gray-900 tracking-widest" required />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-8">
                    <button type="submit" className="px-12 py-4 bg-[#111111] text-white font-bold text-[15px] rounded-xl hover:bg-gray-800 transition-colors shadow-lg flex items-center gap-2">
                      Save & Continue <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                  </div>
                </motion.form>
              )}

              {/* ============================== */}
              {/* STEP 2: EDUCATION HISTORY      */}
              {/* ============================== */}
              {step === 2 && (
                <motion.form key="step2" variants={slideVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handleNext} className="space-y-8">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <h3 className="text-xl font-extrabold text-gray-900 mb-1">Academic Qualifications</h3>
                      <p className="text-sm text-gray-500">List your degrees starting from High School (10th) onwards.</p>
                    </div>
                    <button type="button" onClick={addEducation} className="text-[#EE6132] font-bold text-sm flex items-center gap-1 hover:bg-orange-50 px-3 py-1.5 rounded-lg transition-colors border border-orange-100">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg> Add
                    </button>
                  </div>

                  <div className="space-y-6">
                    {education.map((ed, index) => (
                      <div key={ed.id} className="p-6 bg-gray-50 border border-gray-200 rounded-2xl relative group transition-all hover:border-orange-300">
                        {education.length > 1 && (
                          <button type="button" onClick={() => removeEducation(ed.id)} className="absolute -top-3 -right-3 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                          </button>
                        )}
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Qualification Record {index + 1}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          <div className="md:col-span-3 space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 uppercase">Level <span className="text-red-500">*</span></label>
                            <select value={ed.level} onChange={(e) => updateEducation(ed.id, 'level', e.target.value)} className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#EE6132] font-medium text-sm text-gray-900" required>
                              <option value="" disabled>Select</option>
                              <option value="10th">10th / SSC</option>
                              <option value="12th">12th / HSC</option>
                              <option value="Diploma">Diploma</option>
                              <option value="UG">Undergraduate</option>
                              <option value="PG">Postgraduate</option>
                            </select>
                          </div>
                          <div className="md:col-span-5 space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 uppercase">Institution / University <span className="text-red-500">*</span></label>
                            <input type="text" value={ed.institution} onChange={(e) => updateEducation(ed.id, 'institution', e.target.value)} placeholder="Name of School/College" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#EE6132] font-medium text-sm text-gray-900" required />
                          </div>
                          <div className="md:col-span-2 space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 uppercase">Pass Year <span className="text-red-500">*</span></label>
                            <input type="number" min="1990" max="2030" value={ed.year} onChange={(e) => updateEducation(ed.id, 'year', e.target.value)} placeholder="YYYY" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#EE6132] font-medium text-sm text-gray-900" required />
                          </div>
                          <div className="md:col-span-2 space-y-1.5">
                            <label className="text-xs font-bold text-gray-600 uppercase">% / CGPA <span className="text-red-500">*</span></label>
                            <input type="text" value={ed.score} onChange={(e) => updateEducation(ed.id, 'score', e.target.value)} placeholder="0.00" className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#EE6132] font-medium text-sm text-gray-900" required />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-8 border-t border-gray-100">
                    <button type="button" onClick={handleBack} className="px-8 py-4 bg-gray-100 text-gray-700 font-bold text-[15px] rounded-xl hover:bg-gray-200 transition-colors">Go Back</button>
                    <button type="submit" className="px-12 py-4 bg-[#111111] text-white font-bold text-[15px] rounded-xl hover:bg-gray-800 transition-colors shadow-lg flex items-center gap-2">
                      Save & Continue <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                  </div>
                </motion.form>
              )}

              {/* ============================== */}
              {/* STEP 3: PROGRAM SELECTION      */}
              {/* ============================== */}
              {step === 3 && (
                <motion.form key="step3" variants={slideVariants} initial="hidden" animate="visible" exit="exit" onSubmit={handleNext} className="space-y-8">
                  <div>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-1">Target Program Enrollment</h3>
                    <p className="text-sm text-gray-500">Select your desired distance education program and preferences.</p>
                  </div>

                  <div className="p-8 bg-orange-50/50 border border-orange-200 rounded-2xl space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-widest">Program Level <span className="text-red-500">*</span></label>
                        <select value={course.program} onChange={(e) => setCourse({...course, program: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] font-medium text-gray-900 appearance-none shadow-sm" required>
                          <option value="" disabled>Select Target Program</option>
                          <option value="BA">Bachelor of Arts (Distance)</option>
                          <option value="B.Com">Bachelor of Commerce (Distance)</option>
                          <option value="BCA">Bachelor of Computer Apps (Distance)</option>
                          <option value="MBA">Master of Business Admin (Distance)</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-widest">Specialization</label>
                        <select value={course.specialization} onChange={(e) => setCourse({...course, specialization: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#EE6132] font-medium text-gray-900 appearance-none shadow-sm">
                          <option value="">General (No Specialization)</option>
                          <option value="Finance">Finance</option>
                          <option value="Marketing">Marketing</option>
                          <option value="IT">Information Technology</option>
                        </select>
                      </div>
                      <div className="space-y-1.5 md:col-span-2 max-w-sm">
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-widest">Medium of Instruction <span className="text-red-500">*</span></label>
                        <div className="flex gap-4 mt-2">
                          <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex-grow">
                            <input type="radio" name="medium" value="English" checked={course.medium === 'English'} onChange={(e) => setCourse({...course, medium: e.target.value})} className="accent-[#EE6132] w-4 h-4" />
                            <span className="text-sm font-bold text-gray-800">English</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm flex-grow">
                            <input type="radio" name="medium" value="Hindi" checked={course.medium === 'Hindi'} onChange={(e) => setCourse({...course, medium: e.target.value})} className="accent-[#EE6132] w-4 h-4" />
                            <span className="text-sm font-bold text-gray-800">Hindi</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-8 border-t border-gray-100">
                    <button type="button" onClick={handleBack} className="px-8 py-4 bg-gray-100 text-gray-700 font-bold text-[15px] rounded-xl hover:bg-gray-200 transition-colors">Go Back</button>
                    <button type="submit" className="px-12 py-4 bg-[#EE6132] text-white font-bold text-[15px] rounded-xl hover:bg-[#d9562a] transition-colors shadow-lg flex items-center gap-2">
                      Review & Proceed to Pay <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                  </div>
                </motion.form>
              )}

              {/* ============================== */}
              {/* STEP 4: PAYMENT CHECKOUT       */}
              {/* ============================== */}
              {step === 4 && (
                <motion.div key="step4" variants={slideVariants} initial="hidden" animate="visible" exit="exit" className="max-w-2xl mx-auto space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Final Review & Checkout</h3>
                    <p className="text-gray-500 text-sm">Please verify the fee breakdown below before processing payment.</p>
                  </div>

                  <div className="bg-[#111111] text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    {/* Decorative watermark */}
                    <div className="absolute -right-10 -bottom-10 opacity-10">
                      <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                    </div>

                    <div className="relative z-10">
                      <div className="mb-6 pb-6 border-b border-white/10">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Applicant Name</p>
                        <p className="text-lg font-bold">{personal.firstName} {personal.lastName || 'Student'}</p>
                        <p className="text-sm text-gray-400 mt-1">{course.program} {course.specialization && `- ${course.specialization}`}</p>
                      </div>

                      <div className="space-y-4 mb-6 text-sm font-medium">
                        <div className="flex justify-between items-center text-gray-300">
                          <span>Base Tuition Fee</span>
                          <span>₹{baseFee.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-300">
                          <span>Registration / Processing Fee</span>
                          <span>₹{regFee.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-300 border-t border-white/5 pt-4">
                          <span>Subtotal</span>
                          <span>₹{subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-400">
                          <span>GST (18%)</span>
                          <span>₹{gst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        </div>
                      </div>

                      <div className="border-t-2 border-dashed border-white/20 pt-6 flex justify-between items-end">
                        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Payable</span>
                        <span className="text-4xl font-black text-[#EE6132]">₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                    <button type="button" onClick={handleBack} disabled={isProcessing} className="px-8 py-4 bg-gray-100 text-gray-700 font-bold text-[15px] rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 w-full sm:w-auto">Go Back</button>
                    <button type="button" onClick={handlePaymentSubmit} disabled={isProcessing} className="px-10 py-4 bg-[#EE6132] text-white font-bold text-[15px] rounded-xl hover:bg-[#d9562a] transition-colors shadow-lg hover:shadow-orange-500/30 w-full sm:w-auto flex items-center justify-center gap-2">
                      {isProcessing ? (
                        <><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...</>
                      ) : (
                        <>Pay Securely Now <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg></>
                      )}
                    </button>
                  </div>
                  <div className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    256-bit SSL Encrypted
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ============================== */}
      {/* SUCCESS MODAL POPUP            */}
      {/* ============================== */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md z-10 text-center border border-gray-100"
            >
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-100 shadow-inner">
                <motion.svg initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></motion.svg>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Registration Successful!</h2>
              <p className="text-sm font-medium text-gray-500 mb-8">Welcome to Gov J.P. Verma College. Your payment has been securely processed.</p>
              
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-8 text-left">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Transaction ID</span>
                  <span className="text-sm font-mono font-bold text-gray-900">{transactionId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Amount Paid</span>
                  <span className="text-lg font-black text-[#EE6132]">₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <button onClick={finishRegistration} className="w-full py-4 bg-[#111111] text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-colors shadow-lg flex items-center justify-center gap-2 group">
                Go to Student Dashboard <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}