'use client';

import React, { useState, createContext, useContext } from 'react';
import { InstitutionSidebar } from './InstitutionSidebar';
import InstitutionTopbar from './InstitutionTopbar';

interface InstitutionContextValue {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  selectedBranch: string;
  setSelectedBranch: (v: string) => void;
}

const InstitutionContext = createContext<InstitutionContextValue>({
  sidebarCollapsed: false,
  setSidebarCollapsed: () => {},
  selectedBranch: 'br_01',
  setSelectedBranch: () => {},
});

export function useInstitution() {
  return useContext(InstitutionContext);
}

export default function InstitutionShell({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('br_01');

  const sidebarWidth = sidebarCollapsed ? 64 : 256;

  return (
    <InstitutionContext.Provider value={{ sidebarCollapsed, setSidebarCollapsed, selectedBranch, setSelectedBranch }}>
      <div className="min-h-screen bg-slate-950 text-white flex">
        {/* Mobile menu overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Institution Sidebar */}
        <InstitutionSidebar />

        {/* Content Shell */}
        <div
          className="flex-1 flex flex-col min-h-screen transition-all duration-300"
          style={{ marginLeft: sidebarWidth }}
        >
          <InstitutionTopbar onMobileMenuToggle={() => setMobileOpen(true)} />
          <main className="flex-1 p-6 overflow-auto bg-slate-950">
            {children}
          </main>
        </div>
      </div>
    </InstitutionContext.Provider>
  );
}
