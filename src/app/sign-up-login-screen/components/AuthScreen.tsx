'use client';

import { useState } from 'react';
import { AppLogo } from '@/components/ui/AppLogo';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
import { DemoCredentials } from './DemoCredentials';

type AuthMode = 'login' | 'signup';

/**
 * AuthScreen — Full-screen auth page with glassmorphism design.
 * Left panel: Brand visual with floating orbs and stats
 * Right panel: Login / Sign-up form with tab switcher
 */
export function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('login');

  return (
    <div
      className="min-h-screen flex"
      style={{ background: 'var(--bg-primary)' }}
      role="main"
      aria-label="Authentication"
    >
      {/* ─── Left Brand Panel (hidden on mobile) ─── */}
      <div
        className="hidden lg:flex flex-1 relative overflow-hidden flex-col items-center justify-center p-16"
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 80%, #3730a3 100%)',
        }}
        aria-hidden="true"
      >
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="orb orb-primary absolute w-96 h-96 -top-24 -left-24 opacity-60" />
          <div className="orb orb-secondary absolute w-80 h-80 bottom-0 right-0 opacity-50" style={{ animationDelay: '-3s' }} />
          <div className="orb orb-accent absolute w-64 h-64 top-1/2 left-1/2 opacity-30" style={{ animationDelay: '-1.5s' }} />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center max-w-sm">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <AppLogo size="lg" variant="light" />
          </div>

          {/* Headline */}
          <h1 className="text-display font-black text-white mb-4 leading-tight" style={{ fontSize: '2.25rem' }}>
            Learn Smarter,<br />
            <span className="text-indigo-300">Grow Faster</span>
          </h1>
          <p className="text-indigo-200 mb-12 leading-relaxed">
            AI-powered courses, personalized study plans, gamified progress, and smart certificates — all in one place.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { value: '50K+', label: 'Learners' },
              { value: '1,200+', label: 'Courses' },
              { value: '98%', label: 'Satisfaction' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-card p-4 text-center"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <div className="text-display font-bold text-white mb-0.5" style={{ fontSize: '1.5rem' }}>
                  {stat.value}
                </div>
                <div className="text-indigo-300" style={{ fontSize: '0.75rem' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Feature Chips */}
          <div className="flex flex-wrap gap-2 justify-center">
            {['AI Tutor', 'XP & Badges', 'Certificates', 'Live Analytics', 'Offline Mode'].map((feat) => (
              <span
                key={feat}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-indigo-200"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom testimonial */}
        <div
          className="absolute bottom-8 left-8 right-8 glass-card p-5 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 flex-shrink-0" />
            <div>
              <p className="text-white text-sm leading-relaxed mb-1">
                "GUIDESOFT IT SOLUTIONS transformed my career. The AI tutor explained concepts in a way no textbook ever could."
              </p>
              <p className="text-indigo-300 text-xs font-medium">Priya Sharma · Senior Developer @ Infosys</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Right Auth Panel ─── */}
      <div
        className="flex-1 lg:max-w-[480px] flex flex-col items-center justify-center p-6 sm:p-10"
        style={{ minWidth: 0 }}
      >
        {/* Mobile Logo */}
        <div className="lg:hidden mb-8">
          <AppLogo size="md" />
        </div>

        {/* Auth Card */}
        <div
          className="w-full max-w-md glass-card"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            padding: '2rem',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          {/* Tab Switcher */}
          <div
            className="flex mb-8 p-1 rounded-xl"
            style={{ background: 'var(--bg-surface-2)' }}
            role="tablist"
            aria-label="Authentication mode"
          >
            {(['login', 'signup'] as const).map((m) => (
              <button
                key={m}
                id={`tab-${m}`}
                role="tab"
                aria-selected={mode === m}
                aria-controls={`panel-${m}`}
                onClick={() => setMode(m)}
                className="flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200"
                style={{
                  background: mode === m ? 'var(--color-primary-500)' : 'transparent',
                  color: mode === m ? '#fff' : 'var(--text-secondary)',
                  boxShadow: mode === m ? 'var(--shadow-glow-primary)' : 'none',
                }}
              >
                {m === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* Form Panel */}
          <div
            id={`panel-${mode}`}
            role="tabpanel"
            aria-labelledby={`tab-${mode}`}
          >
            {mode === 'login' ? (
              <LoginForm onSwitchToSignUp={() => setMode('signup')} />
            ) : (
              <SignUpForm onSwitchToLogin={() => setMode('login')} />
            )}
          </div>
        </div>

        {/* Demo Credentials */}
        <DemoCredentials />

        {/* Footer */}
        <p className="mt-6 text-center" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          By continuing, you agree to our{' '}
          <a href="/terms" className="underline hover:text-primary-400">Terms of Service</a>{' '}
          and{' '}
          <a href="/privacy" className="underline hover:text-primary-400">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
