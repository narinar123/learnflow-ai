import type { Metadata } from 'next';
import { AppLayout } from '@/components/ui/AppLayout';
import { DashboardContent } from './components/DashboardContent';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your LearnFlow AI learning dashboard — track progress, courses, streaks, and AI recommendations.',
};

export default function DashboardPage() {
  return (
    <AppLayout>
      <DashboardContent />
    </AppLayout>
  );
}
