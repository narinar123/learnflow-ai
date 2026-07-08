import React from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex" style={{ background: '#0F0A1E' }}>
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden auth-panel-bg flex-col justify-between p-10">
        {/* Gradient orbs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #6C47FF, transparent 70%)' }} />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #00C9A7, transparent 70%)' }} />
          <div className="absolute top-[40%] right-[10%] w-[300px] h-[300px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #F59E0B, transparent 70%)' }} />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 w-fit">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <span className="text-xl font-bold text-white">GUIDESOFT IT SOLUTIONS</span>
          </Link>
        </div>

        {/* Floating stats */}
        <div className="relative z-10 flex flex-col gap-4 my-auto">
          <div>
            <h2 className="text-4xl font-display font-bold text-white mb-3 leading-tight">
              Learn smarter,<br />
              <span className="text-gradient-primary">not harder</span>
            </h2>
            <p className="text-lg" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Join 500,000+ learners building skills with AI-powered personalized education.
            </p>
          </div>

          {/* Floating stat cards */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[
              { label: 'Active Learners', value: '500K+', icon: '🎓', color: '#6C47FF' },
              { label: 'Courses Available', value: '10,000+', icon: '📚', color: '#00C9A7' },
              { label: 'Completion Rate', value: '94%', icon: '✅', color: '#F59E0B' },
              { label: 'Countries', value: '150+', icon: '🌍', color: '#3B82F6' },
            ].map(s => (
              <div key={s.label} className="glass-card p-4 rounded-2xl">
                <p className="text-2xl mb-1">{s.icon}</p>
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="glass-card p-5 rounded-2xl mt-2">
            <div className="flex gap-1 mb-3" aria-label="5 stars">
              {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#F59E0B' }} aria-hidden="true">★</span>)}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
              &ldquo;GUIDESOFT IT SOLUTIONS&apos;s AI tutor helped me land my dream job in 6 months. The personalized learning path was a game-changer.&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-9 h-9 rounded-full gradient-accent flex items-center justify-center text-white text-sm font-bold">S</div>
              <div>
                <p className="text-sm font-semibold text-white">Sarah Chen</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Software Engineer @ Google</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
          © 2025 GUIDESOFT IT SOLUTIONS. All rights reserved.
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 overflow-y-auto" style={{ background: 'var(--card)' }}>
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <span className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>GUIDESOFT IT SOLUTIONS</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
