import type { Metadata } from 'next';
import { AppLayout } from '@/components/ui/AppLayout';

export const metadata: Metadata = {
  title: 'Membership',
  description: 'Manage your subscription and billing details.',
};

export default function MembershipPage() {
  return (
    <AppLayout>
      <div className="animate-fade-in space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Membership
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            Manage your subscription and billing details.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface-2)]">
          <div className="w-16 h-16 mb-6 rounded-full bg-[rgba(99,102,241,0.1)] flex items-center justify-center text-[var(--color-primary-500)]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
            Coming Soon
          </h2>
          <p className="max-w-md text-[var(--text-secondary)]">
            We are working hard to bring you the Membership experience. Check back soon for updates!
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
