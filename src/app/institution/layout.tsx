import React from 'react';
import InstitutionShell from '@/components/institution/InstitutionShell';

export const metadata = {
  title: 'Campus Admin Portal | GUIDESOFT IT SOLUTIONS',
  description: 'Manage branches, allocate seats, view programs, audit departments progress and faculty listings.',
};

export default function InstitutionLayout({ children }: { children: React.ReactNode }) {
  return <InstitutionShell>{children}</InstitutionShell>;
}
