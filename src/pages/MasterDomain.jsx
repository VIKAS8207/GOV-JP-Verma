// src/pages/MasterDomain.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MasterDomain() {
  const [isSaved, setIsSaved] = useState(false);
  
  // Default state - everything is visible
  const [controls, setControls] = useState({
    showLogin: true,
    showRegular: true,
    showDistance: true
  });

  // Load existing settings on mount
  useEffect(() => {
    const storedControls = localStorage.getItem('portalControls');
    if (storedControls) {
      setControls(JSON.parse(storedControls));
    }
  }, []);

  const handleToggle = (key) => {
    setControls(prev => ({ ...prev, [key]: !prev[key] }));
    setIsSaved(false); // Reset saved state when changes are made
  };

  const handleSave = () => {
    localStorage.setItem('portalControls', JSON.stringify(controls));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000); // Hide success message after 3s
  };

  const ToggleSwitch = ({ label, description, isOn, onToggle }) => (
    <div className="flex items-center justify-between p-5 bg-white border border-gray-100 rounded-2xl hover:border-orange-200 transition-colors shadow-sm">
      <div>
        <h4 className="text-sm font-bold text-gray-900">{label}</h4>
        <p className="text-xs font-medium text-gray-500 mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${
          isOn ? 'bg-[#EE6132]' : 'bg-gray-300'
        }`}
      >
        <motion.div
          layout
          className="w-4 h-4 bg-white rounded-full shadow-sm"
          animate={{ x: isOn ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Master Domain Control</h2>
        <p className="text-gray-500 mt-1">Manage global system settings and public portal visibility.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 sm:p-8 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-50 text-[#EE6132] rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Portal Access Management</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-0.5">Live Frontend Configurations</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-4 bg-gray-50/20">
          <ToggleSwitch 
            label="Existing Student Login (Enter System)" 
            description="Allows registered students to log into their dashboard and pay semester fees."
            isOn={controls.showLogin} 
            onToggle={() => handleToggle('showLogin')} 
          />
          <ToggleSwitch 
            label="Regular Student Registration" 
            description="Enables the registration link for new standard admission candidates."
            isOn={controls.showRegular} 
            onToggle={() => handleToggle('showRegular')} 
          />
          <ToggleSwitch 
            label="Private / Distance Registration" 
            description="Enables the specific registration portal for private and distance learners."
            isOn={controls.showDistance} 
            onToggle={() => handleToggle('showDistance')} 
          />
        </div>

        <div className="p-6 sm:p-8 border-t border-gray-100 flex items-center justify-between bg-white">
          <div className="flex-1">
            {isSaved && (
              <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-sm font-bold text-green-600 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                Settings deployed successfully!
              </motion.span>
            )}
          </div>
          <button 
            onClick={handleSave}
            className="px-10 py-3.5 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-lg flex items-center gap-2"
          >
            Apply Changes
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}