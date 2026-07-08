'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Role, ROLE_LABELS, ROLE_COLORS, hasAnyPermission, Permission } from '@/lib/rbac';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  badgeColor?: string;
  permissions?: Permission[];
}

interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

function Icon({ d, viewBox = '0 0 24 24' }: { d: string | string[]; viewBox?: string }) {
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg width="16" height="16" viewBox={viewBox} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

const navGroups: NavGroup[] = [
  {
    id: 'overview',
    label: 'Overview',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/admin/dashboard',
        permissions: ['dashboard:read'],
        icon: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" />
          </svg>
        ),
      },
    ],
  },
  {
    id: 'users',
    label: 'Users',
    items: [
      { id: 'students', label: 'Students', href: '/admin/users/students', permissions: ['users:read'], icon: <Icon d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /> },
      { id: 'trainers', label: 'Trainers', href: '/admin/users/trainers', permissions: ['users:read'], icon: <Icon d={['M12 20h9', 'M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z']} /> },
      { id: 'institutions', label: 'Institutions', href: '/admin/users/institutions', permissions: ['users:read'], icon: <Icon d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" /> },
      { id: 'recruiters', label: 'Recruiters', href: '/admin/users/recruiters', permissions: ['users:read'], icon: <Icon d={['M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z', 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16']} /> },
    ],
  },
  {
    id: 'access',
    label: 'Access Control',
    items: [
      { id: 'roles', label: 'Roles', href: '/admin/roles', permissions: ['roles:read'], icon: <Icon d={['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z']} /> },
      { id: 'permissions', label: 'Permissions', href: '/admin/permissions', permissions: ['permissions:read'], icon: <Icon d={['M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4']} /> },
    ],
  },
  {
    id: 'learning',
    label: 'Learning Content',
    items: [
      { id: 'courses', label: 'Courses', href: '/admin/courses', permissions: ['courses:read'], icon: <Icon d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />, badge: '7', badgeColor: 'bg-warning/20 text-warning' },
      { id: 'categories', label: 'Categories', href: '/admin/courses/categories', permissions: ['categories:read'], icon: <Icon d={['M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18']} /> },
      { id: 'lessons', label: 'Lessons', href: '/admin/courses/lessons', permissions: ['lessons:read'], icon: <Icon d={['M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z', 'M14 2v6h6']} /> },
      { id: 'modules', label: 'Modules', href: '/admin/courses/modules', permissions: ['modules:read'], icon: <Icon d={['M12 2L2 7l10 5 10-5-10-5z', 'M2 17l10 5 10-5', 'M2 12l10 5 10-5']} /> },
      { id: 'quizzes', label: 'Quizzes', href: '/admin/courses/quizzes', permissions: ['quizzes:read'], icon: <Icon d={['M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', 'M12 17h.01']} /> },
      { id: 'certificates', label: 'Certificates', href: '/admin/courses/certificates', permissions: ['certificates:read'], icon: <Icon d={['M12 15l-2 5L12 18l2 2-2-5z', 'M5 3H19a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z']} /> },
    ],
  },
  {
    id: 'commerce',
    label: 'Commerce',
    items: [
      { id: 'membership', label: 'Membership Plans', href: '/admin/membership', permissions: ['membership:read'], icon: <Icon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /> },
      { id: 'coupons', label: 'Coupons', href: '/admin/membership/coupons', permissions: ['coupons:read'], icon: <Icon d={['M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z', 'M7 7h.01']} /> },
      { id: 'payments', label: 'Payments', href: '/admin/payments', permissions: ['payments:read'], icon: <Icon d={['M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z', 'M1 10h22']} /> },
      { id: 'revenue', label: 'Revenue', href: '/admin/payments/revenue', permissions: ['revenue:read'], icon: <Icon d={['M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6']} /> },
      { id: 'invoices', label: 'Invoices', href: '/admin/payments/invoices', permissions: ['invoices:read'], icon: <Icon d={['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8M16 17H8M10 9H8']} /> },
    ],
  },
  {
    id: 'content',
    label: 'Content & Media',
    items: [
      { id: 'cms', label: 'CMS', href: '/admin/cms', permissions: ['cms:read'], icon: <Icon d={['M12 20h9', 'M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z']} /> },
      { id: 'marketing', label: 'Marketing', href: '/admin/marketing', permissions: ['marketing:read'], icon: <Icon d={['M22 12h-4l-3 9L9 3l-3 9H2']} /> },
      { id: 'media', label: 'Media Library', href: '/admin/media', permissions: ['media:read'], icon: <Icon d={['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z']} /> },
    ],
  },
  {
    id: 'ai',
    label: 'AI Management',
    items: [
      { id: 'ai-mgmt', label: 'AI Management', href: '/admin/ai/management', permissions: ['ai:read'], icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" />
          <path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
        </svg>
      ), badge: 'Live', badgeColor: 'bg-positive/20 text-positive' },
      { id: 'prompts', label: 'Prompt Library', href: '/admin/ai/prompts', permissions: ['prompts:read'], icon: <Icon d={['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z']} /> },
      { id: 'knowledge-base', label: 'Knowledge Base', href: '/admin/ai/knowledge-base', permissions: ['knowledge_base:read'], icon: <Icon d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /> },
    ],
  },
  {
    id: 'logs',
    label: 'Logs & Monitoring',
    items: [
      { id: 'audit', label: 'Audit Logs', href: '/admin/logs/audit', permissions: ['audit_logs:read'], icon: <Icon d={['M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z']} /> },
      { id: 'activity', label: 'Activity Logs', href: '/admin/logs/activity', permissions: ['activity_logs:read'], icon: <Icon d={['M12 22V12M12 12L4 7M12 12l8-5']} /> },
    ],
  },
  {
    id: 'developer',
    label: 'Developer',
    items: [
      { id: 'integrations', label: 'Integrations', href: '/admin/integrations', permissions: ['integrations:read'], icon: <Icon d={['M18 20V10M12 20V4M6 20v-6']} /> },
      { id: 'api-keys', label: 'API Keys', href: '/admin/api-keys', permissions: ['api_keys:read'], icon: <Icon d={['M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4']} /> },
    ],
  },
  {
    id: 'system',
    label: 'System',
    items: [
      { id: 'settings', label: 'Settings', href: '/admin/settings', permissions: ['settings:read'], icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ) },
    ],
  },
];

interface AdminSidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapse: () => void;
  onMobileClose: () => void;
  currentRole: Role;
}

export default function AdminSidebar({
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onMobileClose,
  currentRole,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const showLabels = mobileOpen ? true : !collapsed;
  const sidebarWidth = collapsed && !mobileOpen ? 64 : 256;

  return (
    <aside
      className="fixed top-0 left-0 h-full z-50 flex flex-col sidebar-transition overflow-hidden"
      style={{
        width: sidebarWidth,
        background: 'linear-gradient(180deg, #0c0a1e 0%, #111827 100%)',
        borderRight: '1px solid rgba(108,71,255,0.15)',
        transform: mobileOpen ? 'translateX(0)' : (isMobile ? 'translateX(-100%)' : 'translateX(0)'),
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center h-16 shrink-0 border-b"
        style={{ borderColor: 'rgba(108,71,255,0.15)', padding: showLabels ? '0 16px' : '0 12px', justifyContent: showLabels ? 'space-between' : 'center' }}
      >
        {showLabels ? (
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">GUIDESOFT IT SOLUTIONS</p>
              <p className="text-[10px] text-purple-300 font-medium tracking-wider uppercase">Admin Panel</p>
            </div>
          </Link>
        ) : (
          <Link href="/admin/dashboard">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
          </Link>
        )}
        {showLabels && (
          <button
            onClick={mobileOpen ? onMobileClose : onToggleCollapse}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-2">
        {navGroups.map((group) => {
          const visibleItems = group.items.filter(item =>
            !item.permissions || hasAnyPermission(currentRole, item.permissions)
          );
          if (visibleItems.length === 0) return null;

          return (
            <div key={group.id} className="mb-5">
              {showLabels && (
                <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(139,109,255,0.7)' }}>
                  {group.label}
                </p>
              )}
              {!showLabels && <div className="mx-3 mb-2 border-t" style={{ borderColor: 'rgba(108,71,255,0.15)' }} />}
              <ul className="space-y-0.5">
                {visibleItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        title={!showLabels ? item.label : undefined}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 relative group"
                        style={{
                          background: isActive ? 'rgba(108,71,255,0.2)' : 'transparent',
                          color: isActive ? '#a78bfa' : 'rgba(148,163,184,0.8)',
                          borderLeft: isActive ? '2px solid #6C47FF' : '2px solid transparent',
                        }}
                        onMouseEnter={e => {
                          if (!isActive) {
                            (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                            (e.currentTarget as HTMLElement).style.color = '#e2e8f0';
                          }
                        }}
                        onMouseLeave={e => {
                          if (!isActive) {
                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                            (e.currentTarget as HTMLElement).style.color = 'rgba(148,163,184,0.8)';
                          }
                        }}
                      >
                        <span className="shrink-0">{item.icon}</span>
                        {showLabels && (
                          <>
                            <span className="truncate flex-1">{item.label}</span>
                            {item.badge && (
                              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${item.badgeColor}`}>
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                        {!showLabels && item.badge && (
                          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-warning" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      {/* Role badge + expand button */}
      {showLabels && (
        <div className="p-3 border-t" style={{ borderColor: 'rgba(108,71,255,0.15)' }}>
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center shrink-0 text-white font-bold text-xs">
              AR
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">Alex Rivera</p>
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${ROLE_COLORS[currentRole]}`}>
                {ROLE_LABELS[currentRole]}
              </span>
            </div>
          </div>
        </div>
      )}

      {!showLabels && (
        <div className="p-2 border-t" style={{ borderColor: 'rgba(108,71,255,0.15)' }}>
          <button
            onClick={onToggleCollapse}
            className="w-full p-2 flex justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </aside>
  );
}
