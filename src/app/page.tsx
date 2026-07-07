import { redirect } from 'next/navigation';

/**
 * Root page — redirects unauthenticated users to sign-up/login,
 * authenticated users to dashboard.
 * In a real app this would check session cookies / server-side auth.
 */
export default function RootPage() {
  // TODO: Replace with real auth session check
  // const session = await getServerSession();
  // if (session) redirect('/dashboard');
  redirect('/sign-up-login-screen');
}
