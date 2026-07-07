'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Loader2, ArrowRight, Check } from 'lucide-react';

interface SignUpFormProps {
  onSwitchToLogin: () => void;
}

/** Password strength levels 0–4 */
function getPasswordStrength(password: string): number {
  if (password.length === 0) return -1;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
const strengthClasses = [
  'strength-very-weak',
  'strength-weak',
  'strength-fair',
  'strength-strong',
  'strength-very-strong',
];
const strengthColors = ['var(--color-error)', 'var(--color-accent-rose)', 'var(--color-accent-amber)', 'var(--color-accent-emerald)', 'var(--color-primary-500)'];

/**
 * SignUpForm — Full registration form with name, email, password,
 * confirm-password, strength indicator, and social sign-up.
 */
export function SignUpForm({ onSwitchToLogin }: SignUpFormProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const passwordStrength = getPasswordStrength(password);

  const validate = () => {
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 8) {
      errs.password = 'Password must be at least 8 characters';
    }
    if (!confirmPassword) {
      errs.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error
      const firstError = document.querySelector('[aria-invalid="true"]');
      (firstError as HTMLElement)?.focus();
      return;
    }
    setErrors({});
    setIsLoading(true);

    try {
      // TODO: Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 1800));
      router.push('/dashboard');
    } catch {
      setErrors({ general: 'An account with this email already exists. Try logging in.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-display font-bold mb-1" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>
          Create your account 🚀
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
          Start your AI-powered learning journey today
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

      <form onSubmit={handleSubmit} noValidate aria-label="Sign up form">
        {/* Name */}
        <div className="form-group">
          <label htmlFor="signup-name" className="input-label">Full name</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }}>
              <User size={16} aria-hidden="true" />
            </span>
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
              placeholder="Priya Sharma"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'signup-name-error' : undefined}
              className={`input-field pl-10 ${errors.name ? 'error' : ''}`}
            />
          </div>
          {errors.name && <p id="signup-name-error" className="input-error" role="alert">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="signup-email" className="input-label">Email address</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }}>
              <Mail size={16} aria-hidden="true" />
            </span>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
              placeholder="you@example.com"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'signup-email-error' : undefined}
              className={`input-field pl-10 ${errors.email ? 'error' : ''}`}
            />
          </div>
          {errors.email && <p id="signup-email-error" className="input-error" role="alert">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="signup-password" className="input-label">Password</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }}>
              <Lock size={16} aria-hidden="true" />
            </span>
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
              placeholder="Min. 8 characters"
              aria-required="true"
              aria-invalid={!!errors.password}
              aria-describedby="password-strength-desc signup-password-error"
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
          {errors.password && <p id="signup-password-error" className="input-error" role="alert">{errors.password}</p>}

          {/* Strength Indicator */}
          {password.length > 0 && (
            <div className="mt-2" aria-live="polite">
              <div className="flex gap-1 mb-1" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex-1 h-1 rounded-full transition-all duration-300"
                    style={{
                      background: i < passwordStrength ? strengthColors[passwordStrength - 1] : 'rgba(255,255,255,0.1)',
                    }}
                  />
                ))}
              </div>
              <p
                id="password-strength-desc"
                className="text-xs font-medium"
                style={{ color: passwordStrength > 0 ? strengthColors[passwordStrength - 1] : 'var(--text-secondary)' }}
              >
                Password strength: {passwordStrength > 0 ? strengthLabels[passwordStrength - 1] : 'Too short'}
              </p>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label htmlFor="signup-confirm" className="input-label">Confirm password</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }}>
              <Lock size={16} aria-hidden="true" />
            </span>
            <input
              id="signup-confirm"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setErrors((p) => ({ ...p, confirmPassword: undefined })); }}
              placeholder="Repeat password"
              aria-required="true"
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? 'signup-confirm-error' : undefined}
              className={`input-field pl-10 pr-12 ${errors.confirmPassword ? 'error' : ''}`}
            />
            {/* Show match indicator */}
            {confirmPassword.length > 0 && (
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{ color: password === confirmPassword ? 'var(--color-accent-emerald)' : 'var(--color-error)' }}
                aria-hidden="true"
              >
                {password === confirmPassword ? <Check size={16} /> : <EyeOff size={16} />}
              </span>
            )}
            {confirmPassword.length === 0 && (
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                className="absolute right-4 top-1/2 -translate-y-1/2 interactive"
                style={{ color: 'var(--text-secondary)' }}
              >
                {showConfirm ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
              </button>
            )}
          </div>
          {errors.confirmPassword && <p id="signup-confirm-error" className="input-error" role="alert">{errors.confirmPassword}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-gradient w-full mt-2 mb-5"
          aria-label={isLoading ? 'Creating account…' : 'Create Account'}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              Creating account…
            </>
          ) : (
            <>
              Create Account
              <ArrowRight size={18} aria-hidden="true" />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="divider-with-text text-xs my-4">or sign up with</div>

        {/* Social */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button type="button" className="btn btn-secondary gap-2 w-full text-sm" style={{ minHeight: '44px', fontSize: '0.875rem' }}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
          <button type="button" className="btn btn-secondary gap-2 w-full text-sm" style={{ minHeight: '44px', fontSize: '0.875rem' }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Apple
          </button>
        </div>
      </form>

      {/* Switch to Login */}
      <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-semibold hover:underline"
          style={{ color: 'var(--color-primary-400)' }}
        >
          Log in
        </button>
      </p>
    </div>
  );
}
