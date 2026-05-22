// src/pages/DashboardOverview.jsx
import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Registered Students', value: '1,248', change: '+12%', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Pending Registrations', value: '84', change: '-5%', color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Total Fees Collected', value: '₹42.5L', change: '+18%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

export default function DashboardOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight">Admin Overview</h2>
        <p className="text-gray-500 mt-1">Real-time insights for JP Verma College administration.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-3xl font-black text-[#111111]">{stat.value}</h3>
              <span className={`px-2 py-1 text-[10px] font-bold rounded ${stat.bg} ${stat.color}`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Deadlines & Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Due Dates Widget */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Upcoming Registration Deadlines</h3>
          <div className="space-y-4">
            {[
              { course: 'B.Tech - 1st Year', date: 'May 30, 2026', urgent: true },
              { course: 'BCA - 2nd Year', date: 'June 05, 2026', urgent: false },
              { course: 'MBA - 1st Year', date: 'June 12, 2026', urgent: false },
            ].map((deadline, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${deadline.urgent ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span className="font-bold text-sm text-gray-800">{deadline.course}</span>
                </div>
                <span className="text-xs font-bold text-gray-500">{deadline.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Activity Feed */}
        <div className="bg-[#111111] rounded-2xl shadow-lg p-8 text-white">
          <h3 className="text-lg font-bold mb-6 text-gray-300">System Activity</h3>
          <div className="space-y-6">
            {[
              { msg: 'New bulk student upload completed', time: '10 mins ago' },
              { msg: 'Master registration window updated', time: '2 hours ago' },
              { msg: 'New fee structure published for MBA', time: '5 hours ago' },
            ].map((act, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-1 bg-[#EE6132] rounded-full shrink-0"></div>
                <div>
                  <p className="text-sm font-medium">{act.msg}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}