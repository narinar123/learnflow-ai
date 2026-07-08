'use client';
import React from 'react';

export default function CampusesDashboard() {
  const campuses = [
    { id: 'CMP-001', name: 'IIT Bombay - Main', status: 'Active', students: 12450, servers: 'Healthy', location: 'Mumbai' },
    { id: 'CMP-002', name: 'Delhi University - North', status: 'Active', students: 8200, servers: 'Warning', location: 'Delhi' },
    { id: 'CMP-003', name: 'BITS Pilani', status: 'Onboarding', students: 0, servers: 'Provisioning', location: 'Pilani' },
    { id: 'CMP-004', name: 'VIT Vellore', status: 'Active', students: 15300, servers: 'Healthy', location: 'Vellore' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Institution & Campus Management</h1>
          <p className="text-slate-400 mt-1">Super-admin view for multi-campus deployments, resource allocation, and health monitoring.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-indigo-600/20">
          + Provision New Campus
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-gradient-to-br from-indigo-900/40 to-[#0A0D16] border border-indigo-500/20 p-6 rounded-2xl">
          <h3 className="text-indigo-400 font-bold text-sm">Total Active Campuses</h3>
          <p className="text-4xl font-black text-white mt-2">142</p>
          <p className="text-xs text-slate-400 mt-2">Across 12 countries</p>
        </div>
        <div className="bg-[#0A0D16] border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-emerald-400 font-bold text-sm">Total Enterprise Students</h3>
          <p className="text-4xl font-black text-white mt-2">1.2M+</p>
          <p className="text-xs text-slate-400 mt-2">Active in last 30 days</p>
        </div>
        <div className="bg-[#0A0D16] border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-amber-400 font-bold text-sm">Resource Utilization</h3>
          <p className="text-4xl font-black text-white mt-2">78%</p>
          <p className="text-xs text-slate-400 mt-2">Cloud infrastructure load</p>
        </div>
      </div>

      <div className="bg-[#0A0D16] border border-slate-800 rounded-2xl overflow-hidden mt-8">
        <div className="p-5 border-b border-slate-800 bg-[#0d111d] flex justify-between items-center">
          <h2 className="font-bold text-white">Campus Directory</h2>
          <input type="text" placeholder="Search campuses..." className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white" />
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/50 text-slate-400">
              <tr>
                <th className="p-4 font-semibold">Campus Name</th>
                <th className="p-4 font-semibold">Location</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Active Students</th>
                <th className="p-4 font-semibold">Server Health</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {campuses.map(campus => (
                <tr key={campus.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 font-medium text-white">{campus.name}</td>
                  <td className="p-4">{campus.location}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      campus.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {campus.status}
                    </span>
                  </td>
                  <td className="p-4">{campus.students.toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        campus.servers === 'Healthy' ? 'bg-emerald-500' : 
                        campus.servers === 'Warning' ? 'bg-amber-500' : 'bg-blue-500 animate-pulse'
                      }`} />
                      <span>{campus.servers}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <button className="text-indigo-400 hover:text-indigo-300 font-semibold text-xs">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
