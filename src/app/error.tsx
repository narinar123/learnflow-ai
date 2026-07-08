'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-16 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-lg mx-auto">
          <div className="text-[80px] font-black leading-none text-red-500/30 mb-4">
            Oops!
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Something went wrong</h1>
          <p className="text-lg text-text-secondary mb-8">
            An unexpected error has occurred. We've been notified and are working to fix it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="px-6 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors shadow-sm"
            >
              Try Again
            </button>
            <Link href="/" className="px-6 py-3.5 bg-muted hover:bg-muted/80 text-text-primary border border-border font-semibold rounded-xl transition-colors">
              Return Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
