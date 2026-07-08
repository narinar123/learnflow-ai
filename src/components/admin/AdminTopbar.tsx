'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Role, ROLES, ROLE_LABELS, ROLE_COLORS, ROLE_DESCRIPTIONS, DEMO_ADMIN_USER } from '@/lib/rbac';

interface AdminTopbarProps {
  onMobileMenuToggle: () => void;
  currentRole: Role;
  onRoleChange: (role: Role) => void;
}

const BREADCRUMB_MAP: Record<string, string> = {
  admin: 'Admin',
  dashboard: 'Dashboard',
  users: 'Users',
  students: 'Students',
  trainers: 'Trainers',
  institutions: 'Institutions',
  recruiters: 'Recruiters',
  roles: 'Roles',
  permissions: 'Permissions',
  courses: 'Courses',
  categories: 'Categories',
  lessons: 'Lessons',
  modules: 'Modules',
  quizzes: 'Quizzes',
  certificates: 'Certificates',
  membership: 'Membership',
  coupons: 'Coupons',
  payments: 'Payments',
  revenue: 'Revenue',
  invoices: 'Invoices',
  cms: 'CMS',
  marketing: 'Marketing',
  media: 'Media Library',
  ai: 'AI',
  management: 'Management',
  prompts: 'Prompt Library',
  'knowledge-base': 'Knowledge Base',
  logs: 'Logs',
  audit: 'Audit Logs',
  activity: 'Activity Logs',
  integrations: 'Integrations',
  'api-keys': 'API Keys',
  settings: 'Settings',
};

export default function AdminTopbar({ onMobileMenuToggle, currentRole, onRoleChange }: AdminTopbarProps) {
  const pathname = usePathname();
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs = segments.map((seg, idx) => ({
    label: BREADCRUMB_MAP[seg] || seg,
    href: '/' + segments.slice(0, idx + 1).join('/'),
    isLast: idx === segments.length - 1,
  }));

  const notifications = [
    { id: 1, icon: '⚠️', message: '7 courses pending review approval', time: '2m ago', type: 'warning' },
    { id: 2, icon: '💳', message: 'New Enterprise subscription from Stanford', time: '18m ago', type: 'success' },
    { id: 3, icon: '🔐', message: 'Failed login attempt detected — carlos@example.com', time: '1h ago', type: 'danger' },
    { id: 4, icon: '📊', message: 'Monthly revenue report is ready', time: '3h ago', type: 'info' },
  ];

  return (
    <header className="h-16 flex items-center gap-4 px-6 border-b sticky top-0 z-30"
      style={{ background: 'rgba(15,10,30,0.95)', backdropFilter: 'blur(12px)', borderColor: 'rgba(108,71,255,0.15)' }}
    >
      {/* Mobile menu button */}
      <button
        onClick={onMobileMenuToggle}
        className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 flex-1 min-w-0">
        {breadcrumbs.map((crumb, i) => (
          <React.Fragment key={crumb.href}>
            {i > 0 && <span className="text-slate-600 text-xs">/</span>}
            <span className={`text-sm font-medium truncate ${crumb.isLast ? 'text-white' : 'text-slate-400'}`}>
              {crumb.label}
            </span>
          </React.Fragment>
        ))}
      </nav>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border"
        style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(108,71,255,0.2)', width: 220 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 shrink-0">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search admin..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-full"
        />
        <kbd className="text-[10px] text-slate-500 px-1 py-0.5 rounded border border-slate-700">⌘K</kbd>
      </div>

      {/* Role Switcher */}
      <div className="relative">
        <button
          onClick={() => { setShowRoleSwitcher(!showRoleSwitcher); setShowNotifications(false); }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${ROLE_COLORS[currentRole]}`}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="hidden sm:inline">{ROLE_LABELS[currentRole]}</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {showRoleSwitcher && (
          <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border shadow-2xl overflow-hidden z-50"
            style={{ background: '#161227', borderColor: 'rgba(108,71,255,0.2)' }}>
            <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(108,71,255,0.1)' }}>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Demo Role Switcher</p>
            </div>
            {ROLES.map(role => (
              <button
                key={role}
                onClick={() => { onRoleChange(role); setShowRoleSwitcher(false); }}
                className="w-full flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
              >
                <span className={`mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${ROLE_COLORS[role]}`}>
                  {role === currentRole ? '✓ ' : ''}{ROLE_LABELS[role]}
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">{ROLE_DESCRIPTIONS[role]}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => { setShowNotifications(!showNotifications); setShowRoleSwitcher(false); }}
          className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger" />
        </button>

        {showNotifications && (
          <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border shadow-2xl overflow-hidden z-50"
            style={{ background: '#161227', borderColor: 'rgba(108,71,255,0.2)' }}>
            <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: 'rgba(108,71,255,0.1)' }}>
              <p className="text-sm font-semibold text-white">Notifications</p>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-danger/20 text-danger">{notifications.length} new</span>
            </div>
            {notifications.map(n => (
              <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b" style={{ borderColor: 'rgba(108,71,255,0.08)' }}>
                <span className="text-lg shrink-0">{n.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{n.time}</p>
                </div>
              </div>
            ))}
            <div className="px-4 py-3 text-center">
              <button className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors">View all notifications</button>
            </div>
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-xs shrink-0">
          AR
        </div>
      </div>

      {/* Click outside handlers */}
      {(showRoleSwitcher || showNotifications) && (
        <div className="fixed inset-0 z-40" onClick={() => { setShowRoleSwitcher(false); setShowNotifications(false); }} />
      )}
    </header>
  );
}
