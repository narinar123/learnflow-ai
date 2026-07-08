'use client';

import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';
import { Lead } from '@/lib/crmData';

export default function LeadsPage() {
  const { leads, updateLeadStatus, deleteLead, addLead } = useCRM();
  
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  
  // Selected Lead for Detail Panel
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  // Create Lead modal state
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadTitle, setLeadTitle] = useState('');
  const [leadSource, setLeadSource] = useState<'Organic Search' | 'LinkedIn Outbound' | 'Referral' | 'Webinar' | 'Cold Outreach' | 'Event'>('Organic Search');
  const [leadValue, setLeadValue] = useState('150000');
  const [leadNotes, setLeadNotes] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update selected lead details if updated in global context
  useEffect(() => {
    if (selectedLead) {
      const current = leads.find(l => l.id === selectedLead.id);
      if (current) {
        setSelectedLead(current);
      } else {
        setSelectedLead(null);
      }
    }
  }, [leads, selectedLead]);

  if (!mounted) return null;

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase()) || 
                          lead.company.toLowerCase().includes(search.toLowerCase()) ||
                          lead.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'All' || lead.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadCompany) return;
    addLead({
      name: leadName,
      email: leadEmail,
      phone: leadPhone,
      company: leadCompany,
      title: leadTitle,
      source: leadSource,
      status: 'New',
      value: Number(leadValue),
      assignedTo: 'Super Admin',
      notes: leadNotes
    });
    setLeadModalOpen(false);
    // Reset Form
    setLeadName('');
    setLeadEmail('');
    setLeadPhone('');
    setLeadCompany('');
    setLeadTitle('');
    setLeadValue('150000');
    setLeadNotes('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto flex relative h-full">
      
      {/* ─── MAIN CONTENT AREA ─── */}
      <div className="flex-1 space-y-6 overflow-x-auto">
        
        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-white font-display">Leads Directory</h1>
            <p className="text-slate-400 text-xs mt-1">
              Capture, track, and convert prospective business customers.
            </p>
          </div>
          <button
            onClick={() => setLeadModalOpen(true)}
            className="px-4 py-2 bg-indigo-650 hover:bg-indigo-550 text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-indigo-600/10"
          >
            ⚡ Add Lead
          </button>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Captured</p>
            <h4 className="text-xl font-black text-white mt-1">{leads.length}</h4>
          </div>
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Pipeline</p>
            <h4 className="text-xl font-black text-indigo-400 mt-1">
              ₹{(leads.filter(l => l.status !== 'Lost' && l.status !== 'Won').reduce((s, l) => s + l.value, 0) / 100000).toFixed(1)}L
            </h4>
          </div>
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Won Conversion</p>
            <h4 className="text-xl font-black text-emerald-400 mt-1">
              {leads.length > 0 ? Math.round((leads.filter(l => l.status === 'Won').length / leads.length) * 100) : 0}%
            </h4>
          </div>
        </div>

        {/* Controls / Filter row */}
        <div className="bg-[#0A0D16] border border-slate-800/60 p-4 rounded-2xl flex flex-wrap gap-4 items-center">
          
          {/* Search bar */}
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">🔍</span>
            <input
              type="text"
              placeholder="Search leads, company, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111625] border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-300 placeholder-slate-500 focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#111625] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          {/* Source Filter */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Source:</span>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="bg-[#111625] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="All">All Sources</option>
              <option value="Organic Search">Organic Search</option>
              <option value="LinkedIn Outbound">LinkedIn Outbound</option>
              <option value="Referral">Referral</option>
              <option value="Webinar">Webinar</option>
              <option value="Cold Outreach">Cold Outreach</option>
              <option value="Event">Event</option>
            </select>
          </div>

        </div>

        {/* Leads Table */}
        <div className="bg-[#0A0D16] border border-slate-800/60 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider bg-slate-900/20">
                <th className="p-4">Contact & Company</th>
                <th className="p-4">Source</th>
                <th className="p-4">Value</th>
                <th className="p-4">Created Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredLeads.length > 0 ? (
                filteredLeads.map(lead => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`hover:bg-slate-900/30 cursor-pointer transition-colors ${selectedLead?.id === lead.id ? 'bg-indigo-500/5' : ''}`}
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-bold text-slate-200">{lead.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{lead.title} · <span className="font-medium text-indigo-400">{lead.company}</span></p>
                      </div>
                    </td>
                    <td className="p-4 text-slate-300">{lead.source}</td>
                    <td className="p-4 font-semibold text-slate-200">₹{lead.value.toLocaleString('en-IN')}</td>
                    <td className="p-4 text-slate-400">{new Date(lead.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold
                        ${lead.status === 'Won' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                          lead.status === 'Lost' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          lead.status === 'Proposal' || lead.status === 'Negotiation' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                          lead.status === 'Qualified' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' :
                          'bg-slate-800 text-slate-400'}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-lg transition-colors font-medium"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No leads found matching current criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* ─── SLIDE OVER DETAIL PANEL ─── */}
      {selectedLead && (
        <div className="w-80 ml-6 flex-shrink-0 bg-[#0A0D16] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl p-5 space-y-5 flex flex-col h-fit animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lead Profile</h3>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">{selectedLead.id}</p>
            </div>
            <button
              onClick={() => setSelectedLead(null)}
              className="text-slate-500 hover:text-slate-300"
            >
              ✕ Close
            </button>
          </div>

          <div className="space-y-3.5 flex-1">
            <div>
              <h4 className="text-sm font-extrabold text-white">{selectedLead.name}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">{selectedLead.title} at <span className="font-semibold text-indigo-400">{selectedLead.company}</span></p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-850/60 py-1.5">
                <span className="text-slate-500 font-medium">Deal Value:</span>
                <span className="font-bold text-slate-200">₹{selectedLead.value.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-b border-slate-850/60 py-1.5">
                <span className="text-slate-500 font-medium">Email:</span>
                <a href={`mailto:${selectedLead.email}`} className="text-indigo-400 hover:underline truncate max-w-[150px]">{selectedLead.email || 'N/A'}</a>
              </div>
              <div className="flex justify-between border-b border-slate-850/60 py-1.5">
                <span className="text-slate-500 font-medium">Phone:</span>
                <span className="text-slate-300 font-semibold">{selectedLead.phone || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-850/60 py-1.5">
                <span className="text-slate-500 font-medium">Source:</span>
                <span className="text-slate-300 font-semibold">{selectedLead.source}</span>
              </div>
              <div className="flex justify-between border-b border-slate-850/60 py-1.5">
                <span className="text-slate-500 font-medium">Captured:</span>
                <span className="text-slate-400">{new Date(selectedLead.createdAt).toLocaleString()}</span>
              </div>
            </div>

            {/* Stage Updater */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Pipeline Status</label>
              <select
                value={selectedLead.status}
                onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value as any)}
                className="w-full bg-[#111625] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Internal Log Notes</label>
              <div className="bg-[#111625] border border-slate-850 rounded-xl p-2.5 text-xs text-slate-400 leading-normal max-h-32 overflow-y-auto">
                {selectedLead.notes || 'No notes available. Add details below.'}
              </div>
            </div>

          </div>

          <div className="border-t border-slate-800/60 pt-4 flex gap-2.5">
            <button
              onClick={() => {
                if (confirm('Delete this lead record permanently?')) {
                  deleteLead(selectedLead.id);
                  setSelectedLead(null);
                }
              }}
              className="flex-1 py-2 border border-red-900/40 hover:bg-red-950/20 text-red-400 hover:text-red-300 font-bold rounded-xl text-xs transition-colors"
            >
              🗑️ Delete Lead
            </button>
          </div>
        </div>
      )}

      {/* ─── ADD LEAD DIALOG ─── */}
      {leadModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0B0E19] border border-slate-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-800/60 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-200">⚡ Register New Lead</h3>
              <button
                onClick={() => setLeadModalOpen(false)}
                className="text-slate-500 hover:text-slate-300 text-lg"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateLead} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Lead Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="E.g., Nitin Sharma"
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={leadCompany}
                    onChange={(e) => setLeadCompany(e.target.value)}
                    placeholder="E.g., Wipro Technologies"
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={leadTitle}
                    onChange={(e) => setLeadTitle(e.target.value)}
                    placeholder="E.g., HR Director"
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Deal Value (INR)
                  </label>
                  <input
                    type="number"
                    value={leadValue}
                    onChange={(e) => setLeadValue(e.target.value)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="email@company.com"
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="+91 99999 99999"
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Lead Source
                </label>
                <select
                  value={leadSource}
                  onChange={(e) => setLeadSource(e.target.value as any)}
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="LinkedIn Outbound">LinkedIn Outbound</option>
                  <option value="Organic Search">Organic Search</option>
                  <option value="Referral">Referral</option>
                  <option value="Webinar">Webinar</option>
                  <option value="Cold Outreach">Cold Outreach</option>
                  <option value="Event">Event</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Internal Notes
                </label>
                <textarea
                  value={leadNotes}
                  onChange={(e) => setLeadNotes(e.target.value)}
                  placeholder="Notes..."
                  rows={3}
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setLeadModalOpen(false)}
                  className="px-4 py-2 border border-slate-855 text-slate-400 hover:text-white rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-650 hover:bg-indigo-550 text-white rounded-xl text-xs font-bold"
                >
                  Create Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
