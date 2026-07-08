import React from 'react';
import RecruiterLayout from '@/components/recruiter/RecruiterLayout';

export const metadata = {
  title: 'Recruiter Hub | GUIDESOFT IT SOLUTIONS',
  description: 'AI Resume matching, candidate pipeline management, interview scheduler, offers tracking, and talent search on GUIDESOFT IT SOLUTIONS.',
};

export default function RecruiterPortalLayout({ children }: { children: React.ReactNode }) {
  return <RecruiterLayout>{children}</RecruiterLayout>;
}
