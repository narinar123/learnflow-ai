'use client';

import React from 'react';

interface Tab {
  id: string;
  label: string;
  badge?: number | string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  variant?: 'line' | 'pill';
}

export function Tabs({ tabs, activeTab, onChange, className = '', variant = 'line' }: TabsProps) {
  if (variant === 'pill') {
    return (
      <div className={`flex items-center gap-1.5 p-1 rounded-xl ${className}`} style={{ background: 'var(--muted)' }} role="tablist">
        {tabs.map(tab => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              id={`tab-${tab.id}`}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => onChange(tab.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
              style={{
                background: isActive ? 'var(--card)' : 'transparent',
                color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
                boxShadow: isActive ? '0 1px 4px rgba(0,0,0,0.12)' : 'none',
              }}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-xs font-bold"
                  style={{
                    background: isActive ? 'var(--primary)' : 'var(--border)',
                    color: isActive ? '#fff' : 'var(--muted-foreground)',
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Line variant (default)
  return (
    <div className={`border-b ${className}`} style={{ borderColor: 'var(--border)' }}>
      <div className="flex items-end gap-1 -mb-px overflow-x-auto scrollbar-thin" role="tablist">
        {tabs.map(tab => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              id={`tab-${tab.id}`}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => onChange(tab.id)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-150 shrink-0"
              style={{
                borderBottomColor: isActive ? 'var(--primary)' : 'transparent',
                color: isActive ? 'var(--primary)' : 'var(--muted-foreground)',
              }}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-xs font-bold"
                  style={{
                    background: isActive ? 'var(--primary)' : 'var(--muted)',
                    color: isActive ? '#fff' : 'var(--muted-foreground)',
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
