'use client';

import React, { useState } from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { ROLES, ROLE_LABELS, PERMISSION_GROUPS, hasPermission, Role, Permission } from '@/lib/rbac';

export default function PermissionsPage() {
  const [matrix, setMatrix] = useState(() => {
    const initialMatrix = {} as Record<Permission, Record<Role, boolean>>;
    Object.values(PERMISSION_GROUPS).flat().forEach((perm) => {
      initialMatrix[perm] = {} as Record<Role, boolean>;
      ROLES.forEach((role) => {
        initialMatrix[perm][role] = hasPermission(role, perm);
      });
    });
    return initialMatrix;
  });

  const handleToggle = (perm: Permission, role: Role) => {
    // Prevent modifying Super Admin as it must remain fully functional
    if (role === 'super_admin') {
      alert('Super Admin permissions are protected and cannot be changed.');
      return;
    }
    setMatrix((prev) => ({
      ...prev,
      [perm]: {
        ...prev[perm],
        [role]: !prev[perm][role],
      },
    }));
  };

  return (
    <PermissionGuard permission="permissions:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Permissions Matrix"
          description="Visual grid mapping modules and features to roles. Modify platform access rules dynamically."
          badge="Access Control"
          actions={
            <button
              onClick={() => alert('Changes saved successfully...')}
              className="btn-primary"
            >
              Save Changes
            </button>
          }
        />

        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(108,71,255,0.15)', background: 'rgba(255,255,255,0.02)' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b" style={{ borderColor: 'rgba(108,71,255,0.1)' }}>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Permission Scope</th>
                  {ROLES.map((role) => (
                    <th key={role} className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
                      {ROLE_LABELS[role]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(PERMISSION_GROUPS).map(([groupName, perms]) => (
                  <React.Fragment key={groupName}>
                    {/* Header Group */}
                    <tr style={{ background: 'rgba(108,71,255,0.04)' }}>
                      <td colSpan={ROLES.length + 1} className="px-6 py-2 text-xs font-bold text-primary uppercase tracking-widest">
                        {groupName}
                      </td>
                    </tr>
                    {/* Permissions list */}
                    {perms.map((perm) => (
                      <tr key={perm} className="border-b hover:bg-white/[0.01] transition-colors" style={{ borderColor: 'rgba(108,71,255,0.05)' }}>
                        <td className="px-6 py-3.5 text-sm text-slate-300 font-mono">
                          {perm}
                        </td>
                        {ROLES.map((role) => {
                          const isChecked = matrix[perm]?.[role] ?? false;
                          const isDisabled = role === 'super_admin';
                          return (
                            <td key={role} className="px-4 py-3.5 text-center">
                              <button
                                onClick={() => handleToggle(perm, role)}
                                className={`w-9 h-5 rounded-full p-0.5 transition-colors relative focus:outline-none ${isChecked ? 'bg-primary' : 'bg-slate-800'}`}
                                disabled={isDisabled}
                                style={{ opacity: isDisabled ? 0.6 : 1 }}
                              >
                                <div
                                  className={`w-4 h-4 rounded-full bg-white transition-transform ${isChecked ? 'translate-x-4' : 'translate-x-0'}`}
                                />
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PermissionGuard>
  );
}
