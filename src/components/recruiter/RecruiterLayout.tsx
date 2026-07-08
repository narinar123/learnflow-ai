'use client';

import React, { useState, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AppLogo } from '../ui/AppLogo';
import { getCompanyProfile } from '@/lib/recruiterData';

interface RecruiterContextValue {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
}

const RecruiterContext = createContext<RecruiterContextValue>({
  sidebarCollapsed: false,
  setSidebarCollapsed: () => {},
});

export function useRecruiter() {
  return useContext(RecruiterContext);
}

interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon: string | React.ReactNode;
  badge?: number | string;
  badgeType?: 'primary' | 'danger' | 'warning' | 'success';
}

interface SidebarGroup {
  id: string;
  label: string;
  items: SidebarItem[];
}

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const company = getCompanyProfile();

  const sidebarWidth = sidebarCollapsed ? 64 : 240;

  const sidebarGroups: SidebarGroup[] = [
    {
      id: 'overview',
      label: 'Overview',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          href: '/recruiter/dashboard',
          icon: '📊',
        },
      ],
    },
    {
      id: 'talent',
      label: 'Talent Acquisition',
      items: [
        { id: 'profile', label: 'Company Profile', href: '/recruiter/profile', icon: '🏢' },
        { id: 'jobs', label: 'Jobs Board', href: '/recruiter/jobs', icon: '💼', badge: 3, badgeType: 'success' },
        { id: 'applicants', label: 'Applicants Hub', href: '/recruiter/applicants', icon: '👥', badge: 7, badgeType: 'primary' },
        { id: 'pipeline', label: 'Hiring Pipeline', href: '/recruiter/pipeline', icon: '🔀' },
        { id: 'search', label: 'Candidate Search', href: '/recruiter/search', icon: '🔍' },
      ],
    },
    {
      id: 'engagement',
      label: 'Engagements',
      items: [
        { id: 'scheduler', label: 'Scheduler', href: '/recruiter/scheduler', icon: '📅', badge: 2, badgeType: 'warning' },
        { id: 'offers', label: 'Offer Letters', href: '/recruiter/offers', icon: '✍️' },
        { id: 'messages', label: 'Messages Inbox', href: '/recruiter/messages', icon: '💬', badge: 1, badgeType: 'danger' },
      ],
    },
    {
      id: 'operations',
      label: 'Operations',
      items: [
        { id: 'analytics', label: 'Analytics', href: '/recruiter/analytics', icon: '📈' },
        { id: 'billing', label: 'Billing & Tiers', href: '/recruiter/billing', icon: '💳' },
        { id: 'calendar', label: 'Calendar Grid', href: '/recruiter/calendar', icon: '📆' },
        { id: 'settings', label: 'Portal Settings', href: '/recruiter/settings', icon: '⚙️' },
      ],
    },
  ];

  const handleLogout = () => {
    router.push('/sign-up-login-screen');
  };

  return (
    <RecruiterContext.Provider value={{ sidebarCollapsed, setSidebarCollapsed }}>
      <div className="min-h-screen text-slate-100 flex" style={{ background: '#0B081B' }}>
        {/* Mobile menu overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* ─── SIDEBAR ─── */}
        <aside
          className="fixed top-0 left-0 h-full border-r border-slate-800 z-50 flex flex-col transition-all duration-300"
          style={{
            width: sidebarWidth,
            background: '#0F0B26',
            transform: mobileOpen ? 'translateX(0)' : 'translateX(0)', // responsive handled by Tailwind classes below
          }}
        >
          {/* Logo Area */}
          <div className="flex items-center h-16 border-b border-slate-800 px-4 gap-2">
            <AppLogo size="md" showWordmark={!sidebarCollapsed} />
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex items-center justify-center p-1.5 ml-auto text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Collapse Sidebar"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {sidebarCollapsed ? <path d="m9 18 6-6-6-6" /> : <path d="m15 18-6-6 6-6" />}
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-thin">
            {sidebarGroups.map(group => (
              <div key={group.id} className="space-y-1">
                {!sidebarCollapsed && (
                  <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {group.label}
                  </p>
                )}
                {sidebarCollapsed && <div className="border-t border-slate-800/60 my-2 mx-2" />}
                <ul className="space-y-0.5">
                  {group.items.map(item => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                            isActive
                              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15'
                              : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                          }`}
                        >
                          <span className="text-base shrink-0">{item.icon}</span>
                          {!sidebarCollapsed && (
                            <>
                              <span className="truncate flex-1">{item.label}</span>
                              {item.badge && (
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                                    item.badgeType === 'danger'
                                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                      : item.badgeType === 'success'
                                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                      : item.badgeType === 'warning'
                                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                      : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                                  }`}
                                >
                                  {item.badge}
                                </span>
                              )}
                            </>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* User Account / Footer */}
          <div className="p-3 border-t border-slate-800 mt-auto bg-slate-900/30">
            <div className="flex items-center gap-3">
              <img
                src={company.logo}
                alt={company.name}
                className="w-8 h-8 rounded-lg object-cover border border-slate-700"
              />
              {!sidebarCollapsed && (
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate">{company.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">Hiring Manager</p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 shrink-0"
                title="Logout"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                </svg>
              </button>
            </div>
          </div>
        </aside>

        {/* ─── MAIN CONTENT ─── */}
        <div
          className="flex-1 flex flex-col min-h-screen"
          style={{
            paddingLeft: sidebarWidth,
            transition: 'padding-left 300ms ease',
          }}
        >
          {/* Top Bar Header */}
          <header className="sticky top-0 z-40 flex items-center justify-between px-6 h-16 border-b border-slate-800 bg-[#0B081B]/80 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold rounded-lg uppercase tracking-wider">
                  Recruiter Portal
                </span>
                <span className="hidden sm:block text-slate-600 text-xs font-semibold">·</span>
                <span className="hidden sm:block text-xs font-semibold text-slate-400">
                  Partner Workspace
                </span>
              </div>
            </div>

            {/* Quick stats / profile */}
            <div className="flex items-center gap-4">
              {/* Sandbox status indicator */}
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                AI Match Ready
              </div>

              {/* Company Logo Shortcut */}
              <Link href="/recruiter/profile" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-7 h-7 rounded object-cover border border-slate-700"
                />
                <span className="hidden md:block text-xs font-bold">{company.name}</span>
              </Link>
            </div>
          </header>

          <main className="flex-1 p-6 sm:p-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </RecruiterContext.Provider>
  );
}
