import Link from 'next/link';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-16 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-lg mx-auto">
          <div className="text-[120px] font-black leading-none bg-gradient-to-br from-primary/30 to-secondary/30 bg-clip-text text-transparent mb-4">
            404
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-lg text-text-secondary mb-8">
            The page you're looking for doesn't exist, has been moved, or is temporarily unavailable. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="px-6 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors shadow-sm">
              Return Home
            </Link>
            <Link href="/courses" className="px-6 py-3.5 bg-muted hover:bg-muted/80 text-text-primary border border-border font-semibold rounded-xl transition-colors">
              Browse Courses
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
