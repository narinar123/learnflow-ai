'use client';

import React, { useState, createContext, useContext } from 'react';
import TrainerSidebar from './TrainerSidebar';
import TrainerTopbar from './TrainerTopbar';

interface TrainerContextValue {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
}

const TrainerContext = createContext<TrainerContextValue>({
  sidebarCollapsed: false,
  setSidebarCollapsed: () => {},
});

export function useTrainer() {
  return useContext(TrainerContext);
}

export default function TrainerShell({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = sidebarCollapsed ? 64 : 256;

  return (
    <TrainerContext.Provider value={{ sidebarCollapsed, setSidebarCollapsed }}>
      <div className="min-h-screen bg-slate-950 text-white flex">
        {/* Mobile menu overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Trainer Sidebar */}
        <TrainerSidebar
          collapsed={sidebarCollapsed}
          mobileOpen={mobileOpen}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onMobileClose={() => setMobileOpen(false)}
        />

        {/* Content Shell */}
        <div
          className="flex-1 flex flex-col min-h-screen transition-all duration-300"
          style={{ marginLeft: sidebarWidth }}
        >
          <TrainerTopbar onMobileMenuToggle={() => setMobileOpen(true)} />
          <main className="flex-1 p-6 overflow-auto bg-slate-950">
            {children}
          </main>
        </div>
      </div>
    </TrainerContext.Provider>
  );
}
