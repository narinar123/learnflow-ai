'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppLogo } from './AppLogo';
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  TrendingUp,
  User,
  CreditCard,
  Bell,
  HelpCircle,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Flame,
  Trophy,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  badgeColor?: string;
}

const mainNav: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { label: 'Courses', href: '/courses', icon: <BookOpen size={20} /> },
  { label: 'AI Tutor', href: '/ai-assistant', icon: <Sparkles size={20} />, badge: 'Pro', badgeColor: 'var(--color-secondary-500)' },
  { label: 'Progress', href: '/progress', icon: <TrendingUp size={20} /> },
  { label: 'Leaderboard', href: '/leaderboard', icon: <Trophy size={20} /> },
];

const accountNav: NavItem[] = [
  { label: 'Profile', href: '/profile', icon: <User size={20} /> },
  { label: 'Membership', href: '/membership', icon: <CreditCard size={20} /> },
  { label: 'Notifications', href: '/notifications', icon: <Bell size={20} />, badge: 3, badgeColor: 'var(--color-accent-rose)' },
  { label: 'Support', href: '/support', icon: <HelpCircle size={20} /> },
  { label: 'Settings', href: '/settings', icon: <Settings size={20} /> },
];

/**
 * Sidebar — Collapsible desktop sidebar with navigation groups,
 * active state highlighting, streak widget, and user profile.
 */
export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarWidth = isCollapsed ? '72px' : '240px';

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 z-50 hidden lg:flex flex-col"
      style={{
        width: sidebarWidth,
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-color)',
        transition: 'width 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        overflow: 'hidden',
      }}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div
        className="flex items-center px-4 h-16 flex-shrink-0"
        style={{ borderBottom: '1px solid var(--border-color)' }}
      >
        <Link href="/dashboard" aria-label="LearnFlow AI — Dashboard">
          <AppLogo size="sm" showWordmark={!isCollapsed} />
        </Link>
      </div>

      {/* Streak Widget */}
      {!isCollapsed && (
        <div
          className="mx-3 my-3 p-3 rounded-xl flex items-center gap-3"
          style={{
            background: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
          }}
          aria-label="Current streak: 7 days"
        >
          <span style={{ fontSize: '1.5rem' }} className="animate-flame" aria-hidden="true">🔥</span>
          <div>
            <div className="text-display font-bold" style={{ fontSize: '1.125rem', color: 'var(--color-accent-amber)' }}>
              7
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Day Streak</div>
          </div>
          <div className="ml-auto">
            <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textAlign: 'right' }}>Daily goal</div>
            <div
              className="w-12 mt-1"
              style={{ background: 'rgba(255,255,255,0.1)', height: 4, borderRadius: 999 }}
            >
              <div style={{ width: '60%', height: '100%', background: 'var(--color-accent-amber)', borderRadius: 999 }} />
            </div>
          </div>
        </div>
      )}

      {/* Main Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2" aria-label="Primary">
        <NavGroup
          items={mainNav}
          pathname={pathname}
          isCollapsed={isCollapsed}
        />

        <div className="my-3 mx-2" style={{ height: 1, background: 'var(--border-color)' }} role="separator" />

        <NavGroup
          items={accountNav}
          pathname={pathname}
          isCollapsed={isCollapsed}
          label="Account"
        />
      </nav>

      {/* Bottom: User + Collapse toggle */}
      <div style={{ borderTop: '1px solid var(--border-color)' }}>
        {/* User Row */}
        <div
          className="flex items-center gap-3 px-3 py-3 interactive"
          style={{ overflow: 'hidden' }}
          role="button"
          tabIndex={0}
          aria-label="User profile menu"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))',
              color: '#fff',
            }}
            aria-hidden="true"
          >
            PS
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                Priya Sharma
              </div>
              <div className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
                Pro Plan · Level 12
              </div>
            </div>
          )}
          {!isCollapsed && (
            <button
              type="button"
              aria-label="Log out"
              className="flex-shrink-0 interactive"
              style={{ color: 'var(--text-secondary)' }}
            >
              <LogOut size={16} aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          type="button"
          onClick={() => setIsCollapsed((v) => !v)}
          className="w-full flex items-center justify-end gap-2 px-4 py-2 text-xs interactive"
          style={{
            color: 'var(--text-secondary)',
            borderTop: '1px solid var(--border-color)',
          }}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-expanded={!isCollapsed}
        >
          {!isCollapsed && <span>Collapse</span>}
          {isCollapsed ? (
            <ChevronRight size={14} aria-hidden="true" />
          ) : (
            <ChevronLeft size={14} aria-hidden="true" />
          )}
        </button>
      </div>
    </aside>
  );
}

function NavGroup({
  items,
  pathname,
  isCollapsed,
  label,
}: {
  items: NavItem[];
  pathname: string;
  isCollapsed: boolean;
  label?: string;
}) {
  return (
    <div>
      {label && !isCollapsed && (
        <p
          className="px-3 mb-1 uppercase tracking-widest font-semibold"
          style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', opacity: 0.6 }}
          aria-hidden="true"
        >
          {label}
        </p>
      )}
      <ul role="list">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`sidebar-item ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-center px-0' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                title={isCollapsed ? item.label : undefined}
                style={{ borderLeftWidth: isCollapsed ? 0 : undefined }}
              >
                <span className="flex-shrink-0" aria-hidden="true">{item.icon}</span>
                {!isCollapsed && (
                  <>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.badge !== undefined && (
                      <span
                        className="ml-auto px-1.5 py-0.5 rounded-full text-white font-bold"
                        style={{
                          fontSize: '0.65rem',
                          background: item.badgeColor ?? 'var(--color-primary-500)',
                          minWidth: '20px',
                          textAlign: 'center',
                        }}
                        aria-label={`${item.badge} ${typeof item.badge === 'number' ? 'new' : ''}`}
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
  );
}
