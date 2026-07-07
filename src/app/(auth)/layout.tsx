import type { Metadata } from 'next';
import AuthLayout from '@/components/layouts/AuthLayout';

export const metadata: Metadata = {
  title: {
    default: 'Sign In',
    template: '%s | LearnFlow AI',
  },
};

export default function AuthGroupLayout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
