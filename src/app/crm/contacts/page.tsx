'use client';

import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';
import { Contact } from '@/lib/crmData';

export default function ContactsPage() {
  const { contacts, addContact, logActivity } = useCRM();
  
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  
  // Modals state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [type, setType] = useState<'Client' | 'Recruiter' | 'Student Representative' | 'Partner'>('Client');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Filter contacts
  const filteredContacts = contacts.filter(cnt => {
    const matchesSearch = cnt.name.toLowerCase().includes(search.toLowerCase()) || 
                          cnt.companyName.toLowerCase().includes(search.toLowerCase()) ||
                          cnt.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesType = typeFilter === 'All' || cnt.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !companyName) return;
    addContact({
      name,
      email,
      phone,
      companyName,
      jobTitle,
      type
    });
    setAddModalOpen(false);
    // Reset Form
    setName('');
    setEmail('');
    setPhone('');
    setCompanyName('');
    setJobTitle('');
    setType('Client');
  };

  const handleSimulateCall = (contact: Contact) => {
    logActivity('Call', 'Simulated Call Completed', `Placed a brief outbound phone call to ${contact.name} (${contact.companyName}) regarding ongoing enterprise partnership options.`, contact.companyName);
    alert(`📞 Call simulated successfully with ${contact.name}! Logged to Activity Timeline.`);
  };

  const handleSimulateEmail = (contact: Contact) => {
    logActivity('Email', 'Simulated Email Sent', `Sent a personalized message to ${contact.email} confirming meeting slot next week.`, contact.companyName);
    alert(`✉️ Outbound email simulated to ${contact.email}! Logged to Activity Timeline.`);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto flex relative h-full">
      
      {/* ─── MAIN CONTACTS TABLE ─── */}
      <div className="flex-1 space-y-6 overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-white font-display">Contacts Directory</h1>
            <p className="text-slate-400 text-xs mt-1">
              Store and manage communication info for individuals within client orgs.
            </p>
          </div>
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 bg-indigo-650 hover:bg-indigo-550 text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-indigo-600/10"
          >
            👤 New Contact
          </button>
        </div>

        {/* Breakdown Strip */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Clients</p>
            <h4 className="text-xl font-black text-white mt-1">
              {contacts.filter(c => c.type === 'Client').length}
            </h4>
          </div>
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Recruiters</p>
            <h4 className="text-xl font-black text-white mt-1">
              {contacts.filter(c => c.type === 'Recruiter').length}
            </h4>
          </div>
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Student Reps</p>
            <h4 className="text-xl font-black text-white mt-1">
              {contacts.filter(c => c.type === 'Student Representative').length}
            </h4>
          </div>
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Partners</p>
            <h4 className="text-xl font-black text-white mt-1">
              {contacts.filter(c => c.type === 'Partner').length}
            </h4>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#0A0D16] border border-slate-800/60 p-4 rounded-2xl flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs">🔍</span>
            <input
              type="text"
              placeholder="Search by name, company, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111625] border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-300 placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Role Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-[#111625] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="All">All Roles</option>
              <option value="Client">Client</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Student Representative">Student Rep</option>
              <option value="Partner">Partner</option>
            </select>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-[#0A0D16] border border-slate-800/60 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider bg-slate-900/20">
                <th className="p-4">Name</th>
                <th className="p-4">Job Title & Company</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Type</th>
                <th className="p-4 text-center">Interactions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredContacts.length > 0 ? (
                filteredContacts.map(cnt => (
                  <tr
                    key={cnt.id}
                    onClick={() => setSelectedContact(cnt)}
                    className="hover:bg-slate-900/30 cursor-pointer transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300 text-xs">
                          {cnt.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-bold text-slate-200">{cnt.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-slate-300 font-medium">{cnt.jobTitle}</p>
                        <p className="text-[10px] text-indigo-400 font-semibold">{cnt.companyName}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-slate-300">{cnt.email}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{cnt.phone || 'No phone number'}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold
                        ${cnt.type === 'Client' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 
                          cnt.type === 'Recruiter' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                          cnt.type === 'Partner' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                        {cnt.type}
                      </span>
                    </td>
                    <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center items-center gap-1.5">
                        <button
                          onClick={() => handleSimulateCall(cnt)}
                          title="Simulate Outbound Call"
                          className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg transition-colors"
                        >
                          📞
                        </button>
                        <button
                          onClick={() => handleSimulateEmail(cnt)}
                          title="Simulate Sending Email"
                          className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-xs rounded-lg transition-colors"
                        >
                          ✉️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No contacts matching search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── DETAIL VIEW MODAL ─── */}
      {selectedContact && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0B0E19] border border-slate-800 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-800/60 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-200">Contact Card</h3>
              <button onClick={() => setSelectedContact(null)} className="text-slate-500 hover:text-slate-300">✕</button>
            </div>
            <div className="p-6 space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white mx-auto shadow-lg shadow-indigo-500/10">
                {selectedContact.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-200">{selectedContact.name}</h4>
                <p className="text-xs text-slate-400 mt-1">{selectedContact.jobTitle} at <span className="font-semibold text-indigo-400">{selectedContact.companyName}</span></p>
              </div>

              <div className="border-t border-b border-slate-850 py-3 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="text-slate-300 font-medium">{selectedContact.email || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <span className="text-slate-300 font-medium">{selectedContact.phone || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Classification:</span>
                  <span className="text-slate-300 font-semibold">{selectedContact.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Added:</span>
                  <span className="text-slate-400">{new Date(selectedContact.addedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedContact(null);
                    handleSimulateCall(selectedContact);
                  }}
                  className="flex-1 py-2 bg-indigo-650 hover:bg-indigo-550 text-white font-bold rounded-xl text-xs transition-colors"
                >
                  📞 Place Call
                </button>
                <button
                  onClick={() => {
                    setSelectedContact(null);
                    handleSimulateEmail(selectedContact);
                  }}
                  className="flex-1 py-2 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs transition-colors"
                >
                  ✉️ Send Mail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── ADD CONTACT DIALOG ─── */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0B0E19] border border-slate-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-800/60 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-200">👤 Add Contact Profile</h3>
              <button onClick={() => setAddModalOpen(false)} className="text-slate-500 hover:text-slate-300">✕</button>
            </div>
            <form onSubmit={handleAddContact} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., Arjun K."
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Company *</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="E.g., TCS"
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Job Title</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="E.g., Engineering Lead"
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 99999 99999"
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Classification Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="Client">Client</option>
                  <option value="Recruiter">Recruiter</option>
                  <option value="Student Representative">Student Representative</option>
                  <option value="Partner">Partner</option>
                </select>
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
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
