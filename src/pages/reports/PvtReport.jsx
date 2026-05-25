// src/pages/reports/PvtReport.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Mock Data for Private Fee Inflows
const pvtData = [
  { id: 1, month: 'May 2026', pd_af: 450000, cm: 300000, reentry: 50000, total: 800000 },
  { id: 2, month: 'April 2026', pd_af: 420000, cm: 280000, reentry: 20000, total: 720000 },
  { id: 3, month: 'March 2026', pd_af: 380000, cm: 250000, reentry: 40000, total: 670000 },
];

export default function PvtReport() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[1600px] mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight">Private Education Funds Report</h2>
        <p className="text-gray-500 mt-1">Detailed tracking of non-government institutional revenue streams.</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Caution Money (CM)</p>
          <h3 className="text-2xl font-black text-[#111111] font-mono">₹{pvtData.reduce((s, r) => s + r.cm, 0).toLocaleString()}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total PD / AF Collections</p>
          <h3 className="text-2xl font-black text-[#111111] font-mono">₹{pvtData.reduce((s, r) => s + r.pd_af, 0).toLocaleString()}</h3>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="px-8 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Period</th>
              <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">PD / AF</th>
              <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Caution Money</th>
              <th className="px-6 py-5 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Re-entry Fees</th>
              <th className="px-8 py-5 text-right text-xs font-black text-gray-400 uppercase tracking-widest">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pvtData.map((row) => (
              <tr key={row.id} className="hover:bg-orange-50/30">
                <td className="px-8 py-5 font-black text-gray-900">{row.month}</td>
                <td className="px-6 py-5 font-mono text-gray-600">₹{row.pd_af.toLocaleString()}</td>
                <td className="px-6 py-5 font-mono text-gray-600">₹{row.cm.toLocaleString()}</td>
                <td className="px-6 py-5 font-mono text-gray-600">₹{row.reentry.toLocaleString()}</td>
                <td className="px-8 py-5 font-black text-[#111111] font-mono text-right">₹{row.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}