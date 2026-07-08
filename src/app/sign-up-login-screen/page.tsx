import type { Metadata } from 'next';
import { AuthScreen } from './components/AuthScreen';

export const metadata: Metadata = {
  title: 'Sign In or Create Account',
  description:
    'Join GUIDESOFT IT SOLUTIONS and start your personalized learning journey today. Sign up free or log in to continue.',
  robots: { index: false },
};

export default function SignUpLoginPage() {
  return <AuthScreen />;
}
