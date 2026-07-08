'use client';

import React, { useState, createContext, useContext } from 'react';
import RecruiterSidebar from './RecruiterSidebar';
import RecruiterTopbar from './RecruiterTopbar';

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

export default function RecruiterShell({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = sidebarCollapsed ? 64 : 256;

  return (
    <RecruiterContext.Provider value={{ sidebarCollapsed, setSidebarCollapsed }}>
      <div className="min-h-screen bg-slate-950 text-white flex">
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <RecruiterSidebar
          collapsed={sidebarCollapsed}
          mobileOpen={mobileOpen}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onMobileClose={() => setMobileOpen(false)}
        />

        <div
          className="flex-1 flex flex-col min-h-screen transition-all duration-300"
          style={{ marginLeft: sidebarWidth }}
        >
          <RecruiterTopbar onMobileMenuToggle={() => setMobileOpen(true)} />
          <main className="flex-1 p-6 overflow-auto bg-slate-950">
            {children}
          </main>
        </div>
      </div>
    </RecruiterContext.Provider>
  );
}
