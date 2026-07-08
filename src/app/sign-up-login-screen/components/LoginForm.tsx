'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

interface LoginFormProps {
  onSwitchToSignUp: () => void;
}

/**
 * LoginForm — Email + password form with show/hide password,
 * validation states, social login buttons, and forgot-password link.
 */
export function LoginForm({ onSwitchToSignUp }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);

    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        const code = data?.error?.code;
        if (code === 'AUTH_ACCOUNT_SUSPENDED') {
          setErrors({ general: 'Your account has been suspended. Please contact support.' });
        } else {
          setErrors({ general: 'Invalid email or password. Please try again.' });
        }
        return;
      }

      // Store tokens
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);

      // Route based on role
      const role = data.data.user.role;
      if (role === 'RECRUITER') router.push('/recruiter/dashboard');
      else if (role === 'SUPER_ADMIN' || role === 'ADMIN') router.push('/admin/dashboard');
      else if (role === 'TRAINER') router.push('/trainer/dashboard');
      else router.push('/dashboard');
    } catch {
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-display font-bold mb-1" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>
          Welcome back 👋
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
          Sign in to continue your learning journey
        </p>
      </div>

      {/* General Error */}
      {errors.general && (
        <div
          className="flex items-center gap-2 p-3 rounded-lg mb-5"
          style={{
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: 'var(--color-error)',
            fontSize: '0.875rem',
          }}
          role="alert"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate aria-label="Login form">
        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="login-email" className="input-label">
            Email address
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }}>
              <Mail size={16} aria-hidden="true" />
            </span>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
              placeholder="you@example.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'login-email-error' : undefined}
              className={`input-field pl-10 ${errors.email ? 'error' : ''}`}
            />
          </div>
          {errors.email && (
            <p id="login-email-error" className="input-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className="input-label">
              Password
            </label>
            <button
              type="button"
              className="text-xs font-medium hover:underline"
              style={{ color: 'var(--color-primary-400)' }}
              onClick={() => {}} // TODO: forgot password flow
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }}>
              <Lock size={16} aria-hidden="true" />
            </span>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
              placeholder="Min. 8 characters"
              aria-required="true"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'login-password-error' : undefined}
              className={`input-field pl-10 pr-12 ${errors.password ? 'error' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-4 top-1/2 -translate-y-1/2 interactive"
              style={{ color: 'var(--text-secondary)' }}
            >
              {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
            </button>
          </div>
          {errors.password && (
            <p id="login-password-error" className="input-error" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full mt-2 mb-5"
          aria-label={isLoading ? 'Signing in…' : 'Log in'}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              Signing in…
            </>
          ) : (
            <>
              Log In
              <ArrowRight size={18} aria-hidden="true" />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="divider-with-text text-xs my-4">or continue with</div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <SocialButton
            icon={
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            }
            label="Google"
            onClick={() => {}} // TODO: Google OAuth
          />
          <SocialButton
            icon={
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            }
            label="Apple"
            onClick={() => {}} // TODO: Apple Sign-In
          />
        </div>
      </form>

      {/* Switch to Sign Up */}
      <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
        New to GUIDESOFT IT SOLUTIONS?{' '}
        <button
          type="button"
          onClick={onSwitchToSignUp}
          className="font-semibold hover:underline"
          style={{ color: 'var(--color-primary-400)' }}
        >
          Create an account
        </button>
      </p>
    </div>
  );
}

function SocialButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-secondary gap-2 w-full text-sm"
      style={{ minHeight: '44px', fontSize: '0.875rem' }}
      aria-label={`Continue with ${label}`}
    >
      {icon}
      {label}
    </button>
  );
}
