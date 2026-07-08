'use client';

import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';
import { Institution } from '@/lib/crmData';

export default function InstitutionsPage() {
  const { institutions, addInstitution, updateInstitutionStatus } = useCRM();
  
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [selectedInst, setSelectedInst] = useState<Institution | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [type, setType] = useState<'University' | 'College' | 'K-12 School' | 'Vocational Center'>('University');
  const [campuses, setCampuses] = useState('1');
  const [studentsCount, setStudentsCount] = useState('1000');
  const [contractValue, setContractValue] = useState('500000');
  const [primaryContact, setPrimaryContact] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Filter institutions
  const filteredInstitutions = institutions.filter(inst => {
    const matchesSearch = inst.name.toLowerCase().includes(search.toLowerCase()) || 
                          inst.primaryContact.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || inst.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddInstitution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !primaryContact) return;
    addInstitution({
      name,
      type,
      campuses: Number(campuses),
      studentsCount: Number(studentsCount),
      activeSeats: 0,
      contractValue: Number(contractValue),
      primaryContact,
      status: 'Trial'
    });
    setAddModalOpen(false);
    // Reset Form
    setName('');
    setCampuses('1');
    setStudentsCount('1000');
    setContractValue('500000');
    setPrimaryContact('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto flex relative h-full">
      
      {/* ─── INSTITUTIONS LIST ─── */}
      <div className="flex-1 space-y-6 overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-white font-display">Institutions Directory</h1>
            <p className="text-slate-400 text-xs mt-1">
              Manage school & university partnerships, track contract values, and allocate campus seats.
            </p>
          </div>
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 bg-indigo-650 hover:bg-indigo-550 text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-indigo-600/10"
          >
            🏫 New Institution
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Partners</p>
            <h4 className="text-xl font-black text-white mt-1">
              {institutions.filter(i => i.status === 'Active').length}
            </h4>
          </div>
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Value</p>
            <h4 className="text-xl font-black text-indigo-400 mt-1">
              ₹{(institutions.reduce((s, i) => s + i.contractValue, 0) / 100000).toFixed(1)}L
            </h4>
          </div>
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Allocated Seats</p>
            <h4 className="text-xl font-black text-emerald-400 mt-1">
              {institutions.reduce((s, i) => s + i.activeSeats, 0)}
            </h4>
          </div>
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Campus Reach</p>
            <h4 className="text-xl font-black text-white mt-1">
              {institutions.reduce((s, i) => s + i.studentsCount, 0).toLocaleString()}
            </h4>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#0A0D16] border border-slate-800/60 p-4 rounded-2xl flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">🔍</span>
            <input
              type="text"
              placeholder="Search institutions, contact person..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111625] border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-300 placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#111625] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending Setup">Pending Setup</option>
              <option value="Trial">Trial</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>

        {/* List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredInstitutions.length > 0 ? (
            filteredInstitutions.map(inst => (
              <div
                key={inst.id}
                onClick={() => setSelectedInst(inst)}
                className={`p-5 rounded-2xl bg-[#0A0D16] border transition-all cursor-pointer hover:border-slate-700/80
                  ${selectedInst?.id === inst.id ? 'border-indigo-500/50 shadow-md shadow-indigo-500/5' : 'border-slate-800/80'}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-200">{inst.name}</h3>
                    <p className="text-[10px] text-slate-500 mt-0.5">{inst.type} · {inst.campuses} Campuses</p>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold
                    ${inst.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      inst.status === 'Trial' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      inst.status === 'Pending Setup' ? 'bg-slate-800 text-slate-400 border border-slate-700' :
                      'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {inst.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-850/60 my-3 text-[10px] text-slate-400">
                  <div>
                    <span className="block text-slate-500">Reach</span>
                    <span className="font-bold text-slate-300">{inst.studentsCount.toLocaleString()} kids</span>
                  </div>
                  <div>
                    <span className="block text-slate-500">Active Seats</span>
                    <span className="font-bold text-slate-300">{inst.activeSeats} allocated</span>
                  </div>
                  <div>
                    <span className="block text-slate-500">Contract</span>
                    <span className="font-bold text-indigo-400">₹{(inst.contractValue / 100000).toFixed(1)}L</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>👤 Key Contact: {inst.primaryContact}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 py-10 bg-[#0A0D16] border border-slate-800/60 rounded-2xl text-center text-slate-500 text-xs">
              No institutions match criteria.
            </div>
          )}
        </div>
      </div>

      {/* ─── SIDE DETAILS PANEL ─── */}
      {selectedInst && (
        <div className="w-80 ml-6 flex-shrink-0 bg-[#0A0D16] border border-slate-800/80 rounded-2xl p-5 space-y-5 flex flex-col h-fit animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Institution Profile</h3>
            <button onClick={() => setSelectedInst(null)} className="text-slate-500 hover:text-slate-300">✕ Close</button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-extrabold text-white">{selectedInst.name}</h4>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">{selectedInst.id}</p>
            </div>

            <div className="space-y-2 text-xs border-y border-slate-850/60 py-3">
              <div className="flex justify-between">
                <span className="text-slate-500">Type:</span>
                <span className="text-slate-300 font-semibold">{selectedInst.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Campuses:</span>
                <span className="text-slate-300 font-semibold">{selectedInst.campuses} campuses</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Campus Strength:</span>
                <span className="text-slate-300 font-semibold">{selectedInst.studentsCount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Allocated Seats:</span>
                <span className="text-slate-300 font-bold">{selectedInst.activeSeats} seats</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contract Value:</span>
                <span className="text-indigo-400 font-bold">₹{selectedInst.contractValue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Primary Contact:</span>
                <span className="text-slate-300 font-semibold">{selectedInst.primaryContact}</span>
              </div>
            </div>

            {/* Allocate seats button */}
            <div className="space-y-2">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Operational Actions</span>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    updateInstitutionStatus(selectedInst.id, 'Active');
                  }}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-550 text-white font-bold rounded-xl text-xs transition-colors"
                >
                  ✓ Approve & Activate Portal
                </button>
                <button
                  onClick={() => {
                    updateInstitutionStatus(selectedInst.id, 'Expired');
                  }}
                  className="w-full py-2 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs transition-colors"
                >
                  ✕ Terminate Agreement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── ADD INSTITUTION MODAL ─── */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0B0E19] border border-slate-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-800/60 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-200">🏫 Register Institution</h3>
              <button onClick={() => setAddModalOpen(false)} className="text-slate-500 hover:text-slate-300">✕</button>
            </div>
            <form onSubmit={handleAddInstitution} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Institution Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., Delhi University"
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Institution Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200"
                  >
                    <option value="University">University</option>
                    <option value="College">College</option>
                    <option value="K-12 School">K-12 School</option>
                    <option value="Vocational Center">Vocational Center</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Campuses</label>
                  <input
                    type="number"
                    value={campuses}
                    onChange={(e) => setCampuses(e.target.value)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Students Reach</label>
                  <input
                    type="number"
                    value={studentsCount}
                    onChange={(e) => setStudentsCount(e.target.value)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Contract Value (INR)</label>
                  <input
                    type="number"
                    value={contractValue}
                    onChange={(e) => setContractValue(e.target.value)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Primary Contact Name *</label>
                <input
                  type="text"
                  required
                  value={primaryContact}
                  onChange={(e) => setPrimaryContact(e.target.value)}
                  placeholder="E.g., Prof. Ramesh Gupta"
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-855 text-slate-400 hover:text-white rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-650 hover:bg-indigo-550 text-white rounded-xl text-xs font-bold"
                >
                  Add Institution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
