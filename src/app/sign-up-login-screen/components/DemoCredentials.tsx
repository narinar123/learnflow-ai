'use client';

import { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * DemoCredentials — Shows demo login credentials for quick testing.
 * Collapsible card with copy-to-clipboard for email and password.
 */
export function DemoCredentials() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'password' | null>(null);

  const credentials = {
    email: 'demo@learnflow.ai',
    password: 'Demo@1234',
    roles: [
      { role: 'Learner', email: 'demo@learnflow.ai', password: 'Demo@1234' },
      { role: 'Trainer', email: 'trainer@learnflow.ai', password: 'Trainer@1234' },
      { role: 'Admin', email: 'admin@learnflow.ai', password: 'Admin@1234' },
    ],
  };

  const handleCopy = async (text: string, field: 'email' | 'password') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Clipboard not available
    }
  };

  return (
    <div className="mt-4 w-full max-w-md">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
        style={{
          background: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          color: 'var(--color-primary-400)',
        }}
        aria-expanded={isOpen}
        aria-controls="demo-credentials-panel"
      >
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
          </svg>
          Demo Credentials (Testing)
        </div>
        {isOpen ? <ChevronUp size={14} aria-hidden="true" /> : <ChevronDown size={14} aria-hidden="true" />}
      </button>

      {isOpen && (
        <div
          id="demo-credentials-panel"
          className="mt-2 rounded-xl overflow-hidden"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
          }}
          role="region"
          aria-label="Demo credentials"
        >
          {credentials.roles.map((cred, idx) => (
            <div
              key={cred.role}
              className="p-4"
              style={{
                borderBottom: idx < credentials.roles.length - 1 ? '1px solid var(--border-color)' : 'none',
              }}
            >
              {/* Role Badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="badge badge-primary text-xs"
                  style={{ padding: '2px 8px' }}
                >
                  {cred.role}
                </span>
              </div>

              {/* Credentials */}
              <div className="space-y-2">
                <CredentialRow
                  label="Email"
                  value={cred.email}
                  onCopy={() => handleCopy(cred.email, 'email')}
                  copied={copiedField === 'email'}
                />
                <CredentialRow
                  label="Password"
                  value={cred.password}
                  onCopy={() => handleCopy(cred.password, 'password')}
                  copied={copiedField === 'password'}
                  isPassword
                />
              </div>
            </div>
          ))}

          <div
            className="px-4 py-2 text-center"
            style={{
              background: 'rgba(245, 158, 11, 0.05)',
              borderTop: '1px solid var(--border-color)',
              fontSize: '0.7rem',
              color: 'var(--color-accent-amber)',
            }}
          >
            ⚠️ Demo credentials — do not use in production
          </div>
        </div>
      )}
    </div>
  );
}

function CredentialRow({
  label,
  value,
  onCopy,
  copied,
  isPassword = false,
}: {
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
  isPassword?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="w-16 flex-shrink-0 text-right"
        style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
      >
        {label}
      </span>
      <div
        className="flex-1 flex items-center justify-between px-3 py-1.5 rounded-lg"
        style={{ background: 'var(--bg-surface-2)', border: '1px solid var(--border-color)' }}
      >
        <code
          className="text-xs flex-1 overflow-hidden text-ellipsis"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
        >
          {value}
        </code>
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy ${label}`}
          className="ml-2 flex-shrink-0 transition-colors duration-150"
          style={{ color: copied ? 'var(--color-accent-emerald)' : 'var(--text-secondary)' }}
        >
          {copied ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
