'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { ROLES, ROLE_LABELS, ROLE_DESCRIPTIONS, ROLE_COLORS, getRolePermissions } from '@/lib/rbac';

export default function RolesPage() {
  return (
    <PermissionGuard permission="roles:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Role Management"
          description="Define platform authorization personas and configure security boundaries."
          badge="Access Control"
          actions={
            <button
              onClick={() => alert('Create new role functionality...')}
              className="btn-primary"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Create Role
            </button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROLES.map((role) => {
            const permissions = getRolePermissions(role);
            return (
              <div
                key={role}
                className="rounded-2xl border p-5 flex flex-col justify-between gap-4 transition-all duration-200 hover:border-purple-500/30"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(108,71,255,0.12)' }}
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${ROLE_COLORS[role]}`}>
                      {ROLE_LABELS[role]}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">ID: {role}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-3.5 leading-relaxed">{ROLE_DESCRIPTIONS[role]}</p>
                </div>

                <div className="border-t pt-4" style={{ borderColor: 'rgba(108,71,255,0.08)' }}>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">Assigned Scope</span>
                    <span className="text-slate-300 font-bold">{permissions.length} Permissions</span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => alert(`Modifying permissions for: ${ROLE_LABELS[role]}`)}
                      className="btn-outline flex-1 py-2 text-xs"
                    >
                      Configure Scope
                    </button>
                    <button
                      onClick={() => alert(`Deleting role: ${role}`)}
                      className="p-2 rounded-xl border border-red-500/20 text-red-500 bg-red-500/5 hover:bg-red-500/10 transition-colors active:scale-95"
                      title="Delete Role"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PermissionGuard>
  );
}
