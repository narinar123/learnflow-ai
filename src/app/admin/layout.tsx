import React from 'react';
import AdminShell from '@/components/admin/AdminShell';

export const metadata = {
  title: 'Enterprise Admin Panel | GUIDESOFT IT SOLUTIONS',
  description: 'Enterprise management, RBAC, analytics, AI control, content, CMS, and configurations for GUIDESOFT IT SOLUTIONS.',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
