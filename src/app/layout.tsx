import type { Metadata } from 'next';
import '../styles/tailwind.css';

export const metadata: Metadata = {
  title: {
    default: 'GUIDESOFT IT SOLUTIONS — AI-Powered Learning & Member Management',
    template: '%s | GUIDESOFT IT SOLUTIONS',
  },
  description:
    'Discover, enroll, and master skills with GUIDESOFT IT SOLUTIONS — an AI-powered eLearning platform with gamification, certificates, and an intelligent AI tutor.',
  keywords: ['elearning', 'online courses', 'AI tutor', 'skill development', 'certificates', 'gamification'],
  authors: [{ name: 'GUIDESOFT IT SOLUTIONS Team' }],
  creator: 'GUIDESOFT IT SOLUTIONS',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://learnflow.ai',
    siteName: 'GUIDESOFT IT SOLUTIONS',
    title: 'GUIDESOFT IT SOLUTIONS — AI-Powered Learning Platform',
    description: 'Master any skill with AI-powered courses, personalized learning paths, and gamification.',
    images: [{ url: '/assets/images/og-image.png', width: 1200, height: 630, alt: 'GUIDESOFT IT SOLUTIONS' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GUIDESOFT IT SOLUTIONS',
    description: 'AI-powered learning, gamified progress, smart certifications.',
    creator: '@learnflowai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/manifest.json',
};

import { ThemeProvider } from '@/components/ThemeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-app font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <div id="main-content">{children}</div>
          <div id="modal-root" />
          <div id="toast-root" />
        </ThemeProvider>
      </body>
    </html>
  );
}
