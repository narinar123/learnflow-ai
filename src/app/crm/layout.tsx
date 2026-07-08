'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CRMProvider, useCRM } from './context/CRMContext';

interface CRMNavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
  badgeColor?: string;
}

interface CRMNavSection {
  id: string;
  label: string;
  items: CRMNavItem[];
}

const navSections: CRMNavSection[] = [
  {
    id: 'overview',
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'CRM Dashboard', href: '/crm', icon: '📊' },
      { id: 'analytics', label: 'CRM Analytics', href: '/crm/analytics', icon: '📈' },
      { id: 'reports', label: 'Reports Desk', href: '/crm/reports', icon: '📁' },
    ],
  },
  {
    id: 'relationships',
    label: 'CRM Entities',
    items: [
      { id: 'leads', label: 'Leads Directory', href: '/crm/leads', icon: '⚡' },
      { id: 'contacts', label: 'Contacts', href: '/crm/contacts', icon: '👤' },
      { id: 'companies', label: 'Companies', href: '/crm/companies', icon: '🏢' },
      { id: 'institutions', label: 'B2B Institutions', href: '/crm/institutions', icon: '🏫' },
    ],
  },
  {
    id: 'segments',
    label: 'Audience Segments',
    items: [
      { id: 'students', label: 'Students List', href: '/crm/students', icon: '🎓' },
      { id: 'recruiters', label: 'Recruiters Pool', href: '/crm/recruiters', icon: '👔' },
    ],
  },
  {
    id: 'sales',
    label: 'Sales & Billing',
    items: [
      { id: 'pipeline', label: 'Sales Pipeline', href: '/crm/pipeline', icon: '🎯' },
      { id: 'invoices', label: 'Invoices', href: '/crm/invoices', icon: '🧾' },
      { id: 'payments', label: 'Payments Log', href: '/crm/payments', icon: '💳' },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing Desk',
    items: [
      { id: 'campaigns', label: 'All Campaigns', href: '/crm/campaigns', icon: '📣' },
      { id: 'email', label: 'Email Marketing', href: '/crm/email', icon: '✉️' },
      { id: 'sms', label: 'SMS Console', href: '/crm/sms', icon: '💬' },
    ],
  },
  {
    id: 'operations',
    label: 'Operations & Rules',
    items: [
      { id: 'tasks', label: 'Tasks & Todo', href: '/crm/tasks', icon: '📝' },
      { id: 'meetings', label: 'Meetings Calendar', href: '/crm/meetings', icon: '📅' },
      { id: 'activities', label: 'Activities Audit', href: '/crm/activities', icon: '📜' },
      { id: 'automation', label: 'Automation Rules', href: '/crm/automation', icon: '⚙️' },
    ],
  },
];

function CRMInnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { addLead, addTask, addMeeting, resetAllData } = useCRM();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);

  // Lead Form State
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadTitle, setLeadTitle] = useState('');
  const [leadSource, setLeadSource] = useState<'Organic Search' | 'LinkedIn Outbound' | 'Referral' | 'Webinar' | 'Cold Outreach' | 'Event'>('LinkedIn Outbound');
  const [leadValue, setLeadValue] = useState('200000');
  const [leadNotes, setLeadNotes] = useState('');

  // Task Form State
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [taskPriority, setTaskPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [taskRelated, setTaskRelated] = useState('');

  // Meeting Form State
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDesc, setMeetingDesc] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingDuration, setMeetingDuration] = useState('30');
  const [meetingType, setMeetingType] = useState<'Demo' | 'Discovery' | 'Proposal Review' | 'Onboarding' | 'General'>('Discovery');
  const [meetingRelated, setMeetingRelated] = useState('');

  const isActive = (href: string) => {
    if (href === '/crm') return pathname === '/crm';
    return pathname === href;
  };

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
    setLeadValue('200000');
    setLeadNotes('');
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;
    addTask({
      title: taskTitle,
      description: taskDesc,
      dueDate: taskDueDate || new Date().toISOString().split('T')[0],
      priority: taskPriority,
      relatedTo: taskRelated || 'General CRM Operations',
      assignedTo: 'Super Admin'
    });
    setTaskModalOpen(false);
    setTaskTitle('');
    setTaskDesc('');
    setTaskDueDate('');
    setTaskRelated('');
  };

  const handleCreateMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingTitle) return;
    addMeeting({
      title: meetingTitle,
      description: meetingDesc,
      date: meetingDate || new Date().toISOString().split('T')[0],
      time: meetingTime || '10:00',
      duration: Number(meetingDuration),
      type: meetingType,
      relatedTo: meetingRelated || 'General Partner Lead',
      meetingLink: 'https://meet.google.com/crm-' + Math.random().toString(36).substring(2, 7)
    });
    setMeetingModalOpen(false);
    setMeetingTitle('');
    setMeetingDesc('');
    setMeetingDate('');
    setMeetingTime('');
    setMeetingDuration('30');
    setMeetingRelated('');
  };

  return (
    <div className="flex h-screen bg-[#06080F] text-slate-100 overflow-hidden font-sans">
      {/* ─── CRM SIDEBAR ─── */}
      <aside
        className={`flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64' : 'w-[72px]'
        } bg-[#0A0D16] border-r border-slate-800/60`}
      >
        {/* Branding header */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-800/60 bg-[#0B0F19]/40">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 text-white shadow-md shadow-indigo-500/10">
            📊
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="text-sm font-extrabold tracking-tight bg-gradient-to-r from-indigo-200 via-purple-200 to-slate-100 bg-clip-text text-transparent leading-none">
                LearnFlow CRM
              </p>
              <p className="text-[9px] text-indigo-400 font-semibold tracking-wider uppercase mt-1">
                Enterprise Suite
              </p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`ml-auto text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800/50 rounded ${
              !sidebarOpen ? 'hidden' : ''
            }`}
            aria-label="Collapse sidebar"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
        </div>

        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="mx-auto mt-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded transition-colors"
            aria-label="Open sidebar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        )}

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
          {navSections.map((section) => (
            <div key={section.id}>
              {sidebarOpen && (
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2.5 mb-2.5">
                  {section.label}
                </p>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        title={!sidebarOpen ? item.label : undefined}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-150 group relative
                          ${active
                            ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 text-indigo-300 font-semibold'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 border border-transparent'
                          }`}
                      >
                        <span className="text-base flex-shrink-0">{item.icon}</span>
                        {sidebarOpen && <span className="flex-1 truncate">{item.label}</span>}
                        {active && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-r-full" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom profile and system control */}
        <div className="border-t border-slate-800/60 p-3 space-y-2">
          {sidebarOpen && (
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset all CRM database records?')) {
                  resetAllData();
                }
              }}
              className="w-full text-center py-1.5 px-3 bg-red-950/20 border border-red-900/40 hover:bg-red-950/40 text-red-400 hover:text-red-300 rounded-xl text-[11px] font-semibold transition-all"
            >
              🔄 Reset CRM Database
            </button>
          )}
          <div className={`flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/40 cursor-pointer transition-colors ${!sidebarOpen ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold flex-shrink-0 text-white">
              CRM
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">Super Admin</p>
                <p className="text-[10px] text-slate-500 truncate">crm-admin@learnflow.ai</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ─── MAIN PORTAL WRAPPER ─── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topheader */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800/60 bg-[#0A0D16]/90 backdrop-blur-md z-10 flex-shrink-0">
          
          {/* Left search */}
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-72">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search CRM dashboard..."
                className="w-full bg-[#111625]/60 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:bg-[#111625] transition-all"
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#10B981]/5 border border-[#10B981]/20 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">CRM Operations Active</span>
            </div>
          </div>

          {/* Right quick actions */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setQuickActionOpen(!quickActionOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-600/10 active:scale-95 z-20"
              >
                ➕ New Record
                <span className="text-[10px] opacity-80">▼</span>
              </button>

              {quickActionOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setQuickActionOpen(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-[#0D1222] border border-slate-800 rounded-xl shadow-xl z-20 py-1.5 overflow-hidden">
                    <button
                      onClick={() => {
                        setQuickActionOpen(false);
                        setLeadModalOpen(true);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800/60 hover:text-white transition-colors"
                    >
                      ⚡ Add New Lead
                    </button>
                    <button
                      onClick={() => {
                        setQuickActionOpen(false);
                        setTaskModalOpen(true);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800/60 hover:text-white transition-colors"
                    >
                      📝 Create Follow-up Task
                    </button>
                    <button
                      onClick={() => {
                        setQuickActionOpen(false);
                        setMeetingModalOpen(true);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800/60 hover:text-white transition-colors"
                    >
                      📅 Schedule Partner Meeting
                    </button>
                    <div className="border-t border-slate-800 my-1" />
                    <Link
                      href="/super-admin"
                      className="block px-4 py-2 text-xs text-indigo-400 hover:bg-slate-800/60 transition-colors font-medium"
                    >
                      🖥️ Back to Super Admin
                    </Link>
                  </div>
                </>
              )}
            </div>
            <Link
              href="/super-admin"
              className="px-3.5 py-2 border border-slate-800 hover:bg-slate-800/50 text-slate-400 hover:text-white text-xs font-bold rounded-xl transition-all"
            >
              System Admin
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#070912]">
          {children}
        </main>
      </div>

      {/* ─── ADD LEAD MODAL ─── */}
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
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
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
                    placeholder="E.g., Director of HR"
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Lead Value (INR)
                  </label>
                  <input
                    type="number"
                    value={leadValue}
                    onChange={(e) => setLeadValue(e.target.value)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
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
                    placeholder="name@company.com"
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
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
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
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
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
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
                  placeholder="Details about client requirements..."
                  rows={3}
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setLeadModalOpen(false)}
                  className="px-4 py-2 border border-slate-850 text-slate-400 hover:text-white rounded-xl text-xs font-semibold"
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

      {/* ─── ADD TASK MODAL ─── */}
      {taskModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0B0E19] border border-slate-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-800/60 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-200">📝 Create Task</h3>
              <button onClick={() => setTaskModalOpen(false)} className="text-slate-500 hover:text-slate-300">✕</button>
            </div>
            <form onSubmit={handleCreateTask} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Task Description *</label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="E.g., Finalize pricing table"
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Details</label>
                <textarea
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  placeholder="More details..."
                  rows={2}
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Due Date</label>
                  <input
                    type="date"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Priority</label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as any)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Related Lead/Company</label>
                <input
                  type="text"
                  value={taskRelated}
                  onChange={(e) => setTaskRelated(e.target.value)}
                  placeholder="E.g., Tata Consultancy Services"
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setTaskModalOpen(false)}
                  className="px-4 py-2 border border-slate-850 text-slate-400 hover:text-white rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-650 hover:bg-indigo-550 text-white rounded-xl text-xs font-bold"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── ADD MEETING MODAL ─── */}
      {meetingModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0B0E19] border border-slate-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-800/60 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-200">📅 Schedule Meeting</h3>
              <button onClick={() => setMeetingModalOpen(false)} className="text-slate-500 hover:text-slate-300">✕</button>
            </div>
            <form onSubmit={handleCreateMeeting} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Meeting Title *</label>
                <input
                  type="text"
                  required
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  placeholder="E.g., Discovery sync with Wipro"
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Agenda</label>
                <input
                  type="text"
                  value={meetingDesc}
                  onChange={(e) => setMeetingDesc(e.target.value)}
                  placeholder="E.g., Review platform features and custom pathways"
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Date</label>
                  <input
                    type="date"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Time</label>
                  <input
                    type="time"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Duration (min)</label>
                  <select
                    value={meetingDuration}
                    onChange={(e) => setMeetingDuration(e.target.value)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200"
                  >
                    <option value="15">15 mins</option>
                    <option value="30">30 mins</option>
                    <option value="45">45 mins</option>
                    <option value="60">60 mins</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Meeting Type</label>
                  <select
                    value={meetingType}
                    onChange={(e) => setMeetingType(e.target.value as any)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200"
                  >
                    <option value="Discovery">Discovery Call</option>
                    <option value="Demo">Platform Demo</option>
                    <option value="Proposal Review">Proposal Review</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Onboarding">Onboarding</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Related Lead/Company</label>
                <input
                  type="text"
                  value={meetingRelated}
                  onChange={(e) => setMeetingRelated(e.target.value)}
                  placeholder="E.g., Wipro Technologies"
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setMeetingModalOpen(false)}
                  className="px-4 py-2 border border-slate-850 text-slate-400 hover:text-white rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-650 hover:bg-indigo-550 text-white rounded-xl text-xs font-bold"
                >
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <CRMProvider>
      <CRMInnerLayout>{children}</CRMInnerLayout>
    </CRMProvider>
  );
}
