'use client';

import React from 'react';
import { useAdmin } from './AdminShell';
import { Permission, hasPermission } from '@/lib/rbac';

interface PermissionGuardProps {
  children: React.ReactNode;
  permission: Permission;
  fallback?: React.ReactNode;
}

export default function PermissionGuard({
  children,
  permission,
  fallback,
}: PermissionGuardProps) {
  const { currentRole } = useAdmin();
  const hasAccess = hasPermission(currentRole, permission);

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback !== undefined) {
    return <>{fallback}</>;
  }

  // Default Access Denied state
  return (
    <div className="flex flex-col items-center justify-center p-12 border border-red-500/20 rounded-2xl bg-red-500/5 text-center max-w-lg mx-auto my-12">
      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-white mb-2">Access Denied</h3>
      <p className="text-sm text-slate-400">
        You do not have the required permissions (<code>{permission}</code>) to view this content.
      </p>
    </div>
  );
}
