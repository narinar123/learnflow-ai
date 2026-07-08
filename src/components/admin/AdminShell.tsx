'use client';

import React, { useState, createContext, useContext } from 'react';
import { DEMO_ADMIN_USER, Role } from '@/lib/rbac';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';

interface AdminContextValue {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
}

const AdminContext = createContext<AdminContextValue>({
  currentRole: 'super_admin',
  setCurrentRole: () => {},
  sidebarCollapsed: false,
  setSidebarCollapsed: () => {},
});

export function useAdmin() {
  return useContext(AdminContext);
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<Role>(DEMO_ADMIN_USER.role);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = sidebarCollapsed ? 64 : 256;

  return (
    <AdminContext.Provider value={{ currentRole, setCurrentRole, sidebarCollapsed, setSidebarCollapsed }}>
      <div className="min-h-screen admin-bg flex">
        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Sidebar */}
        <AdminSidebar
          collapsed={sidebarCollapsed}
          mobileOpen={mobileOpen}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onMobileClose={() => setMobileOpen(false)}
          currentRole={currentRole}
        />

        {/* Main content */}
        <div
          className="flex-1 flex flex-col min-h-screen transition-all duration-300"
          style={{ marginLeft: sidebarWidth }}
        >
          <AdminTopbar
            onMobileMenuToggle={() => setMobileOpen(true)}
            currentRole={currentRole}
            onRoleChange={setCurrentRole}
          />
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminContext.Provider>
  );
}
