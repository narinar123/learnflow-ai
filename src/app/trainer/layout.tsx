import React from 'react';
import TrainerShell from '@/components/trainer/TrainerShell';

export const metadata = {
  title: 'Trainer Hub | GUIDESOFT IT SOLUTIONS',
  description: 'Instructor platform to build, manage, and monetize courses on GUIDESOFT IT SOLUTIONS.',
};

export default function TrainerLayout({ children }: { children: React.ReactNode }) {
  return <TrainerShell>{children}</TrainerShell>;
}
