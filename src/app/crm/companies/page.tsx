'use client';

import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';
import { Company } from '@/lib/crmData';

export default function CompaniesPage() {
  const { companies, addCompany, contacts, leads } = useCRM();
  
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');
  
  const [selectedComp, setSelectedComp] = useState<Company | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState<'Technology' | 'Finance' | 'Healthcare' | 'Education' | 'E-commerce' | 'Manufacturing'>('Technology');
  const [size, setSize] = useState<'10-50' | '51-200' | '201-1000' | '1000+'>('51-200');
  const [website, setWebsite] = useState('');
  const [country, setCountry] = useState('India');
  const [revenuePotential, setRevenuePotential] = useState('200000');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Filter companies
  const filteredCompanies = companies.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(search.toLowerCase()) || 
                          comp.website.toLowerCase().includes(search.toLowerCase()) ||
                          comp.country.toLowerCase().includes(search.toLowerCase());
    
    const matchesIndustry = industryFilter === 'All' || comp.industry === industryFilter;
    
    return matchesSearch && matchesIndustry;
  });

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    addCompany({
      name,
      industry,
      size,
      website: website || `https://${name.toLowerCase().replace(/\s+/g, '')}.com`,
      country,
      revenuePotential: Number(revenuePotential),
      activeDeals: 0
    });
    setAddModalOpen(false);
    // Reset Form
    setName('');
    setWebsite('');
    setRevenuePotential('200000');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto flex relative h-full">
      
      {/* ─── COMPANIES LIST ─── */}
      <div className="flex-1 space-y-6 overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-white font-display">Companies Directory</h1>
            <p className="text-slate-400 text-xs mt-1">
              Manage accounts, view corporate structure, and review team sales history.
            </p>
          </div>
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 bg-indigo-650 hover:bg-indigo-550 text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-indigo-600/10"
          >
            🏢 New Company
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Registered Accounts</p>
            <h4 className="text-xl font-black text-white mt-1">{companies.length}</h4>
          </div>
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Enterprise Value</p>
            <h4 className="text-xl font-black text-indigo-400 mt-1">
              ₹{(companies.reduce((s, c) => s + c.revenuePotential, 0) / 100000).toFixed(1)}L
            </h4>
          </div>
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Active Deals</p>
            <h4 className="text-xl font-black text-white mt-1">
              {leads.filter(l => l.status !== 'Won' && l.status !== 'Lost').length}
            </h4>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-[#0A0D16] border border-slate-800/60 p-4 rounded-2xl flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">🔍</span>
            <input
              type="text"
              placeholder="Search by company name, country, website..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111625] border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-300 placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Industry:</span>
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="bg-[#111625] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="All">All Industries</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Manufacturing">Manufacturing</option>
            </select>
          </div>
        </div>

        {/* Grid Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map(comp => {
              const compContacts = contacts.filter(c => c.companyName.toLowerCase() === comp.name.toLowerCase());
              const compLeads = leads.filter(l => l.company.toLowerCase() === comp.name.toLowerCase());
              
              return (
                <div
                  key={comp.id}
                  onClick={() => setSelectedComp(comp)}
                  className={`p-5 rounded-2xl bg-[#0A0D16] border transition-all cursor-pointer hover:border-slate-700/80
                    ${selectedComp?.id === comp.id ? 'border-indigo-500/50 shadow-md shadow-indigo-500/5' : 'border-slate-800/80'}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-200">{comp.name}</h3>
                      <a
                        href={comp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] text-slate-500 hover:text-indigo-400 transition-colors"
                      >
                        {comp.website}
                      </a>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-full font-bold">
                      {comp.industry}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-850/60 my-3 text-[10px] text-slate-400">
                    <div>
                      <span className="block text-slate-500">Size</span>
                      <span className="font-bold text-slate-300">{comp.size}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500">Active Deals</span>
                      <span className="font-bold text-slate-300">{compLeads.filter(l => l.status !== 'Won' && l.status !== 'Lost').length}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500">Potential</span>
                      <span className="font-bold text-indigo-400">₹{(comp.revenuePotential / 100000).toFixed(1)}L</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>👥 {compContacts.length} Linked Contacts</span>
                    <span>📍 {comp.country}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 py-10 bg-[#0A0D16] border border-slate-800/60 rounded-2xl text-center text-slate-500 text-xs">
              No companies match search parameters.
            </div>
          )}
        </div>
      </div>

      {/* ─── SIDE DETAILS PANEL ─── */}
      {selectedComp && (
        <div className="w-80 ml-6 flex-shrink-0 bg-[#0A0D16] border border-slate-800/80 rounded-2xl p-5 space-y-5 flex flex-col h-fit animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Company Profile</h3>
            <button onClick={() => setSelectedComp(null)} className="text-slate-500 hover:text-slate-300">✕ Close</button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-extrabold text-white">{selectedComp.name}</h4>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">{selectedComp.id}</p>
            </div>

            <div className="space-y-2 text-xs border-y border-slate-850/60 py-3">
              <div className="flex justify-between">
                <span className="text-slate-500">Industry:</span>
                <span className="text-slate-300 font-semibold">{selectedComp.industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Org Size:</span>
                <span className="text-slate-300 font-semibold">{selectedComp.size} employees</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Country:</span>
                <span className="text-slate-300 font-semibold">{selectedComp.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Pipeline Value:</span>
                <span className="text-indigo-400 font-bold">₹{selectedComp.revenuePotential.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Account Age:</span>
                <span className="text-slate-400">{new Date(selectedComp.joinedAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Contacts Linked */}
            <div className="space-y-2">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Linked Employees</span>
              <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin">
                {contacts.filter(c => c.companyName.toLowerCase() === selectedComp.name.toLowerCase()).length > 0 ? (
                  contacts.filter(c => c.companyName.toLowerCase() === selectedComp.name.toLowerCase()).map(c => (
                    <div key={c.id} className="p-2 bg-[#111625] border border-slate-850 rounded-xl text-[11px] flex justify-between items-center">
                      <div>
                        <p className="font-bold text-slate-300">{c.name}</p>
                        <p className="text-[10px] text-slate-500">{c.jobTitle}</p>
                      </div>
                      <a href={`mailto:${c.email}`} className="text-indigo-400 hover:underline text-[10px]">Email</a>
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] text-slate-500 italic">No contacts linked to this company profile yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── ADD COMPANY MODAL ─── */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0B0E19] border border-slate-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-800/60 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-200">🏢 Register Company</h3>
              <button onClick={() => setAddModalOpen(false)} className="text-slate-500 hover:text-slate-300">✕</button>
            </div>
            <form onSubmit={handleAddCompany} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Company Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., Tech Mahindra"
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Industry</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value as any)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Manufacturing">Manufacturing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Company Size</label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value as any)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200"
                  >
                    <option value="10-50">10-50 people</option>
                    <option value="51-200">51-200 people</option>
                    <option value="201-1000">201-1000 people</option>
                    <option value="1000+">1000+ people</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Website</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://company.com"
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Revenue Potential (INR)</label>
                  <input
                    type="number"
                    value={revenuePotential}
                    onChange={(e) => setRevenuePotential(e.target.value)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">HQ Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="India"
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
                  Add Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
