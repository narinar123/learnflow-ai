'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  badgeColor?: string;
}

interface NavSection {
  id: string;
  label: string;
  items: NavItem[];
}

const Icon = ({ d, size = 18 }: { d: string | string[]; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {Array.isArray(d) ? d.map((path, i) => <path key={i} d={path} />) : <path d={d} />}
  </svg>
);

const navSections: NavSection[] = [
  {
    id: 'overview',
    label: 'Overview',
    items: [
      {
        id: 'dashboard',
        label: 'Global Dashboard',
        href: '/super-admin',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/>
            <rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
          </svg>
        ),
      },
      {
        id: 'crm',
        label: 'Enterprise CRM',
        href: '/crm',
        badge: 'New',
        badgeColor: 'bg-indigo-500/20 text-indigo-300',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" x2="18" y1="20" y2="10"/>
            <line x1="12" x2="12" y1="20" y2="4"/>
            <line x1="6" x2="6" y1="20" y2="14"/>
          </svg>
        ),
      },
    ],
  },
  {
    id: 'tenants',
    label: 'Tenant Management',
    items: [
      {
        id: 'organizations',
        label: 'Organizations',
        href: '/super-admin/organizations',
        badge: '247',
        badgeColor: 'bg-violet-500/20 text-violet-300',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        ),
      },
      {
        id: 'tenants',
        label: 'Tenant Management',
        href: '/super-admin/tenants',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        ),
      },
      {
        id: 'subscriptions',
        label: 'Subscription Management',
        href: '/super-admin/subscriptions',
        badge: '12',
        badgeColor: 'bg-amber-500/20 text-amber-300',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        ),
      },
      {
        id: 'licenses',
        label: 'License Management',
        href: '/super-admin/licenses',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        ),
      },
    ],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    items: [
      {
        id: 'infrastructure',
        label: 'Infrastructure',
        href: '/super-admin/infrastructure',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/>
            <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
            <line x1="6" x2="6" y1="6" y2="6"/><line x1="6" x2="6" y1="18" y2="18"/>
          </svg>
        ),
      },
      {
        id: 'monitoring',
        label: 'Monitoring',
        href: '/super-admin/monitoring',
        badge: '3',
        badgeColor: 'bg-red-500/20 text-red-400',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
        ),
      },
      {
        id: 'system-health',
        label: 'System Health',
        href: '/super-admin/system-health',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        ),
      },
      {
        id: 'logs',
        label: 'Logs',
        href: '/super-admin/logs',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/>
            <line x1="10" x2="8" y1="9" y2="9"/>
          </svg>
        ),
      },
    ],
  },
  {
    id: 'finance',
    label: 'Finance & Compliance',
    items: [
      {
        id: 'billing',
        label: 'Billing',
        href: '/super-admin/billing',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="5" rx="2"/>
            <line x1="2" x2="22" y1="10" y2="10"/>
          </svg>
        ),
      },
      {
        id: 'security',
        label: 'Security Center',
        href: '/super-admin/security',
        badge: '!',
        badgeColor: 'bg-red-500/30 text-red-300',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
      },
      {
        id: 'backups',
        label: 'Backups',
        href: '/super-admin/backups',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" x2="12" y1="3" y2="15"/>
          </svg>
        ),
      },
    ],
  },
  {
    id: 'platform',
    label: 'Platform',
    items: [
      {
        id: 'feature-flags',
        label: 'Feature Flags',
        href: '/super-admin/feature-flags',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
            <line x1="4" x2="4" y1="22" y2="15"/>
          </svg>
        ),
      },
      {
        id: 'ai-usage',
        label: 'AI Usage',
        href: '/super-admin/ai-usage',
        badge: 'New',
        badgeColor: 'bg-emerald-500/20 text-emerald-300',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 8V4H8"/>
            <rect width="16" height="12" x="4" y="8" rx="2"/>
            <path d="M2 14h2"/><path d="M20 14h2"/>
            <path d="M15 13v2"/><path d="M9 13v2"/>
          </svg>
        ),
      },
      {
        id: 'reports',
        label: 'Global Reports',
        href: '/super-admin/reports',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" x2="18" y1="20" y2="10"/>
            <line x1="12" x2="12" y1="20" y2="4"/>
            <line x1="6" x2="6" y1="20" y2="14"/>
          </svg>
        ),
      },
      {
        id: 'settings',
        label: 'System Settings',
        href: '/super-admin/settings',
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        ),
      },
    ],
  },
];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [alertsOpen, setAlertsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/super-admin') return pathname === '/super-admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-[#080C14] text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`flex-shrink-0 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64' : 'w-[68px]'
        } bg-[#0D1117] border-r border-white/[0.06]`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white leading-none">LearnFlow</p>
              <p className="text-[10px] text-violet-400 font-medium mt-0.5">Super Admin</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`ml-auto text-white/40 hover:text-white transition-colors ${!sidebarOpen ? 'hidden' : ''}`}
            aria-label="Toggle sidebar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
        </div>

        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="mx-auto mt-4 text-white/40 hover:text-white transition-colors"
            aria-label="Open sidebar"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5 scrollbar-thin scrollbar-thumb-white/10">
          {navSections.map((section) => (
            <div key={section.id}>
              {sidebarOpen && (
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/25 px-2 mb-2">
                  {section.label}
                </p>
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        title={!sidebarOpen ? item.label : undefined}
                        className={`flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm transition-all duration-150 group relative
                          ${active
                            ? 'bg-violet-500/15 text-violet-300 font-medium'
                            : 'text-white/50 hover:text-white/90 hover:bg-white/[0.05]'
                          }`}
                      >
                        <span className={`flex-shrink-0 transition-colors ${active ? 'text-violet-400' : 'text-white/40 group-hover:text-white/70'}`}>
                          {item.icon}
                        </span>
                        {sidebarOpen && (
                          <>
                            <span className="flex-1 truncate">{item.label}</span>
                            {item.badge && (
                              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${item.badgeColor}`}>
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                        {active && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-violet-400 rounded-r-full" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* User */}
        <div className={`border-t border-white/[0.06] p-3 ${!sidebarOpen ? 'flex justify-center' : ''}`}>
          <div className={`flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.05] cursor-pointer transition-colors ${!sidebarOpen ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
              SA
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Super Admin</p>
                <p className="text-xs text-white/40 truncate">admin@learnflow.ai</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 flex items-center gap-4 px-6 border-b border-white/[0.06] bg-[#0D1117]/80 backdrop-blur-sm flex-shrink-0">
          <div className="flex-1 flex items-center gap-3">
            <div className="relative w-64">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search tenants, orgs..."
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-9 pr-4 py-1.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 focus:bg-white/[0.07] transition-all"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white/40">All systems operational</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Alerts */}
            <button
              onClick={() => setAlertsOpen(!alertsOpen)}
              className="relative w-8 h-8 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/[0.07] transition-all"
              aria-label="Notifications"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold flex items-center justify-center">3</span>
            </button>

            {/* Environment badge */}
            <div className="px-2.5 py-1 bg-violet-500/10 border border-violet-500/20 rounded-lg">
              <span className="text-[11px] font-semibold text-violet-400">PRODUCTION</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
