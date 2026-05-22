// src/pages/DashboardOverview.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function DashboardOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight">Overview</h2>
        <p className="text-gray-500 mt-1">Manage and view high-level data and metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-64 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-center items-center text-gray-400">
          Total Students Widget
        </div>
        <div className="h-64 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col justify-center items-center text-gray-400">
          Revenue Widget
        </div>
        <div className="h-64 bg-[#111111] rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center text-gray-500 border border-gray-800">
          Premium Stats Placeholder
        </div>
      </div>
    </motion.div>
  );
}