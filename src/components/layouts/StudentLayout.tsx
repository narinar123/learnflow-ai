'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number | string;
  badgeVariant?: 'primary' | 'danger' | 'warning' | 'success';
}

interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

const studentNav: NavGroup[] = [
  {
    id: 'learning',
    label: 'Learning',
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '/dashboard',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg> },
      { id: 'courses', label: 'My Courses', href: '/courses', badge: 4, badgeVariant: 'primary',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> },
      { id: 'learning-paths', label: 'Learning Paths', href: '/learning-paths',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3h7v7H3z"/><path d="M14 3h7v7h-7z"/><path d="M14 14h7v7h-7z"/><path d="M3 14h7v7H3z"/></svg> },
      { id: 'assignments', label: 'Assignments', href: '/assignments', badge: 2, badgeVariant: 'danger',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
      { id: 'quizzes', label: 'Quizzes', href: '/quizzes',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg> },
      { id: 'live', label: 'Live Classes', href: '/live-classes', badge: 'Live', badgeVariant: 'danger',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="23 7 16 12 23 17 23 7"/><rect width="15" height="14" x="1" y="5" rx="2" ry="2"/></svg> },
      { id: 'downloads', label: 'Downloads', href: '/downloads',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> },
    ],
  },
  {
    id: 'ai',
    label: 'AI Tools',
    items: [
      { id: 'ai-tutor', label: 'AI Tutor', href: '/ai-tutor', badge: 'New', badgeVariant: 'success',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg> },
      { id: 'ai-chat', label: 'AI Chat', href: '/ai-chat',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
      { id: 'ai-flashcards', label: 'AI Flashcards', href: '/ai-flashcards',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
      { id: 'career-coach', label: 'Career Coach', href: '/career-coach',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg> },
      { id: 'mock-interview', label: 'Mock Interview', href: '/mock-interview',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
      { id: 'skill-gap', label: 'Skill Gap', href: '/skill-gap',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
      { id: 'resume', label: 'Resume Builder', href: '/resume-builder',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h8M8 17h4"/></svg> },
    ],
  },
  {
    id: 'progress',
    label: 'Progress',
    items: [
      { id: 'analytics', label: 'My Analytics', href: '/analytics',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
      { id: 'certificates', label: 'Certificates', href: '/certificates', badge: 3, badgeVariant: 'warning',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg> },
      { id: 'achievements', label: 'Achievements', href: '/achievements',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
      { id: 'leaderboard', label: 'Leaderboard', href: '/leaderboard',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg> },
      { id: 'study-planner', label: 'Study Planner', href: '/study-planner',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
    ],
  },
  {
    id: 'account',
    label: 'Account',
    items: [
      { id: 'membership', label: 'Membership', href: '/membership',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
      { id: 'messages', label: 'Messages', href: '/messages', badge: 5, badgeVariant: 'primary',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
      { id: 'notifications', label: 'Notifications', href: '/notifications', badge: 8, badgeVariant: 'primary',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> },
      { id: 'support', label: 'Support', href: '/support',
        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg> },
    ],
  },
];

const badgeColorMap: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  danger:  'bg-danger/10 text-danger',
  warning: 'bg-warning/10 text-warning',
  success: 'bg-accent/10 text-accent',
};

interface StudentLayoutProps {
  children: React.ReactNode;
}

export default function StudentLayout({ children }: StudentLayoutProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed');
    if (stored !== null) setCollapsed(stored === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const sidebarW = collapsed ? 64 : 240;

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 h-full z-50 flex flex-col sidebar-transition overflow-hidden"
        style={{
          width: sidebarW,
          transform: `translateX(${mobileOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024) ? 0 : -sidebarW}px)`,
          background: 'var(--card)',
          borderRight: '1px solid var(--border)',
        }}
        aria-label="Student navigation"
      >
        {/* Logo */}
        <div className={`flex items-center h-16 border-b shrink-0 ${collapsed ? 'justify-center px-3' : 'px-4 gap-3'}`} style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            {!collapsed && <span className="font-bold text-base tracking-tight truncate" style={{ color: 'var(--foreground)' }}>LearnFlow AI</span>}
          </div>
          {!collapsed && (
            <button onClick={() => setCollapsed(true)} className="btn-ghost p-1.5 ml-auto shrink-0 lg:flex hidden" aria-label="Collapse sidebar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2" aria-label="Navigation menu">
          {studentNav.map(group => (
            <div key={group.id} className="mb-4">
              {!collapsed && (
                <p className="px-3 mb-1.5 text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--muted-foreground)' }}>
                  {group.label}
                </p>
              )}
              {collapsed && <div className="mx-3 mb-2 border-t" style={{ borderColor: 'var(--border)' }} />}
              <ul className="space-y-0.5">
                {group.items.map(item => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className={isActive ? 'nav-item-active' : 'nav-item'}
                        title={collapsed ? item.label : undefined}
                        aria-current={isActive ? 'page' : undefined}
                        style={isActive ? { background: 'rgba(108,71,255,0.1)' } : {}}
                      >
                        <span className="shrink-0">{item.icon}</span>
                        {!collapsed && (
                          <>
                            <span className="truncate flex-1">{item.label}</span>
                            {item.badge !== undefined && (
                              <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-semibold ${badgeColorMap[item.badgeVariant ?? 'primary']}`}>
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

        {/* User */}
        {!collapsed && (
          <div className="p-3 border-t shrink-0" style={{ borderColor: 'var(--border)' }}>
            <Link href="/profile" className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-muted transition-colors">
              <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center text-white text-sm font-bold shrink-0">P</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--foreground)' }}>Priya Sharma</p>
                <p className="text-xs truncate" style={{ color: 'var(--muted-foreground)' }}>Pro · Level 12</p>
              </div>
            </Link>
          </div>
        )}
        {collapsed && (
          <div className="p-2 border-t shrink-0" style={{ borderColor: 'var(--border)' }}>
            <button onClick={() => setCollapsed(false)} className="w-full btn-ghost p-2 flex justify-center" aria-label="Expand sidebar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        )}
      </aside>

      {/* Main area */}
      <div className="flex flex-col min-h-screen content-transition" style={{ marginLeft: typeof window !== 'undefined' && window.innerWidth >= 1024 ? sidebarW : 0 }}>
        {/* Topbar */}
        <header
          className="sticky top-0 z-30 h-16 flex items-center gap-3 px-4 border-b transition-shadow"
          style={{
            background: scrolled ? 'rgba(var(--card-rgb, 255,255,255),0.95)' : 'var(--card)',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            borderColor: 'var(--border)',
            boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,0.08)' : 'none',
            marginLeft: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : undefined,
          }}
        >
          {/* Mobile menu */}
          <button onClick={() => setMobileOpen(true)} className="btn-ghost p-2 lg:hidden" aria-label="Open navigation">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>

          {/* Desktop collapse toggle */}
          <button onClick={() => setCollapsed(c => !c)} className="btn-ghost p-2 hidden lg:flex" aria-label="Toggle sidebar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--muted-foreground)' }} aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input type="search" placeholder="Search courses, topics..." className="input-field pl-9 py-2 text-sm w-full" aria-label="Search" />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs" style={{ background: 'var(--muted)', color: 'var(--muted-foreground)', border: '1px solid var(--border)' }}>⌘K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-1 ml-auto">
            {/* Notifications */}
            <Link href="/notifications" className="btn-ghost p-2 relative" aria-label="Notifications">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#EF4444' }} aria-hidden="true" />
            </Link>

            {/* AI button */}
            <Link href="/ai-tutor" className="hidden sm:flex btn-primary items-center gap-2 px-3 py-2 text-sm">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
              AI Tutor
            </Link>

            {/* Avatar */}
            <Link href="/profile" className="flex items-center gap-2 pl-2" aria-label="Profile">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">P</div>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 fade-in" style={{ minHeight: 'calc(100vh - 64px)' }}>
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t" style={{ background: 'var(--card)', borderColor: 'var(--border)' }} aria-label="Mobile navigation">
        <div className="flex items-center justify-around py-2 px-2">
          {[
            { href: '/dashboard', label: 'Home', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg> },
            { href: '/courses', label: 'Courses', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg> },
            { href: '/ai-tutor', label: 'AI', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg> },
            { href: '/analytics', label: 'Progress', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
            { href: '/profile', label: 'Profile', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
          ].map(item => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors" style={{ color: isActive ? 'var(--primary)' : 'var(--muted-foreground)' }} aria-current={isActive ? 'page' : undefined}>
                {item.icon}
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
