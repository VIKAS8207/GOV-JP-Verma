// src/pages/Masters.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock historical data for the table
const initialHistory = [
  { 
    id: 1, 
    action: 'Buffer set to 15 Days', 
    startDate: 'May 10, 2026, 09:00 AM', 
    endDate: 'May 25, 2026, 09:00 AM' 
  },
  { 
    id: 2, 
    action: 'Buffer set to 7 Days', 
    startDate: 'Apr 01, 2026, 10:30 AM', 
    endDate: 'Apr 08, 2026, 10:30 AM' 
  },
];

export default function Masters() {
  const [bufferDays, setBufferDays] = useState('15');
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  
  // States for tracking the currently active window
  const [currentStart, setCurrentStart] = useState('May 22, 2026, 02:30 AM');
  const [currentEnd, setCurrentEnd] = useState('Jun 06, 2026, 02:30 AM');

  // History Log State
  const [historyLogs, setHistoryLogs] = useState(initialHistory);

  // Helper to format dates nicely
  const formatDate = (date) => {
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return `${formattedDate}, ${formattedTime}`;
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    
    // Calculate new dates
    const now = new Date();
    const future = new Date(now.getTime() + (Number(bufferDays) * 24 * 60 * 60 * 1000));
    
    const newStartStr = formatDate(now);
    const newEndStr = formatDate(future);

    // Update active window display
    setCurrentStart(newStartStr);
    setCurrentEnd(newEndStr);

    // Add to history log table
    const newLog = {
      id: Date.now(),
      action: `Buffer set to ${bufferDays} Days`,
      startDate: newStartStr,
      endDate: newEndStr
    };
    
    setHistoryLogs([newLog, ...historyLogs]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-[1600px] mx-auto" 
    >
      {/* --- HEADER --- */}
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Master Settings</h2>
        <p className="text-gray-500 mt-1">Configure global system parameters and track registration buffer updates.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ========================================== */}
        {/* LEFT COLUMN: SETTINGS FORM                 */}
        {/* ========================================== */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <form onSubmit={handleSaveSettings} className="space-y-6">
            
            {/* Main Configuration Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-[#EE6132]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Registration Buffer</h3>
                  <p className="text-xs text-gray-500 font-medium">Define portal accessibility duration.</p>
                </div>
              </div>

              {/* Number of Days Input */}
              <div className="space-y-1.5 mb-6">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                  Open Window Duration <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={bufferDays}
                    onChange={(e) => setBufferDays(e.target.value)}
                    placeholder="e.g. 15"
                    className="w-full px-4 py-3 bg-[#F8F9FA] border border-gray-200 rounded-lg outline-none focus:ring-0 focus:border-[#EE6132] focus:bg-white transition-colors font-bold text-gray-900 placeholder-gray-400"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold uppercase text-xs tracking-widest pointer-events-none">
                    Days
                  </span>
                </div>
              </div>
              
              {/* Active Window Display (Empty space filled) */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Currently Active Window</span>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-gray-600">
                    <span className="font-bold text-gray-900 w-12 inline-block">From:</span> {currentStart}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    <span className="font-bold text-[#EE6132] w-12 inline-block">To:</span> {currentEnd}
                  </p>
                </div>
              </div>
            </div>

            {/* Manual Override Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-center gap-4">
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Manual Portal Override</h3>
                <p className="text-xs text-gray-500">Instantly lock or unlock registrations.</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsRegistrationOpen(!isRegistrationOpen)}
                className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isRegistrationOpen ? 'bg-[#EE6132]' : 'bg-gray-300'
                }`}
              >
                <span className="sr-only">Toggle Registration</span>
                <span className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${isRegistrationOpen ? 'translate-x-7' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#111111] text-white font-bold text-sm rounded-xl hover:bg-gray-800 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              Update System Buffer
            </button>
          </form>
        </div>

        {/* ========================================== */}
        {/* RIGHT COLUMN: UPDATE HISTORY TABLE         */}
        {/* ========================================== */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden">
            
            {/* Table Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">Update History</h3>
              <span className="px-3 py-1.5 bg-orange-50 text-[#EE6132] text-xs font-bold rounded-lg border border-orange-100">
                {historyLogs.length} Records
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest w-16">S.No</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Configuration Change</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Start Timestamp</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">Calculated End Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  <AnimatePresence>
                    {historyLogs.map((log, index) => (
                      <motion.tr 
                        key={log.id}
                        initial={{ opacity: 0, backgroundColor: '#FFF5EC' }} 
                        animate={{ opacity: 1, backgroundColor: '#FFFFFF' }} 
                        transition={{ duration: 0.8 }}
                        className="hover:bg-gray-50/50 transition-colors group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-400">
                          {(index + 1).toString().padStart(2, '0')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded border border-gray-200">
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                          {log.startDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#EE6132] font-bold">
                          {log.endDate}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              
              {historyLogs.length === 0 && (
                <div className="py-20 text-center text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  No history logs available yet.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}