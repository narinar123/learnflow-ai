import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="orb orb-primary w-72 h-72 top-20 left-1/4" />
        <div className="orb orb-secondary w-64 h-64 bottom-32 right-1/4" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-md">
        {/* 404 Number */}
        <div
          className="text-display font-black mb-4 leading-none"
          style={{ fontSize: '8rem', color: 'var(--color-primary-500)', opacity: 0.15 }}
          aria-hidden="true"
        >
          404
        </div>

        {/* Icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 -mt-16"
          style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)' }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-primary-500)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
            <path d="M11 8v4M11 15h.01" />
          </svg>
        </div>

        <h1
          className="text-display font-bold mb-3"
          style={{ fontSize: '1.75rem', color: 'var(--text-primary)' }}
        >
          Page Not Found
        </h1>
        <p className="mb-8" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Go to Dashboard
          </Link>
          <Link href="/sign-up-login-screen" className="btn btn-secondary">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
