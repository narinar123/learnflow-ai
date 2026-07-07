/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary, #6366F1)',
          foreground: 'var(--primary-foreground, #FFFFFF)',
          100: '#EEF2FF',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
        },
        foreground: 'var(--foreground, #0F0A1E)',
        border: 'var(--border, #E2E8F0)',
        card: {
          DEFAULT: 'var(--card, #FFFFFF)',
          foreground: 'var(--card-foreground, #0F0A1E)',
        },
        muted: {
          DEFAULT: 'var(--muted, #F1F5F9)',
          foreground: 'var(--muted-foreground, #6B6880)',
        },
        secondary: {
          DEFAULT: 'var(--secondary, #A855F7)',
          foreground: 'var(--secondary-foreground, #3B1FA8)',
          400: '#C084FC',
          500: '#A855F7',
        },
        accent: {
          DEFAULT: 'var(--accent, #10B981)',
          foreground: 'var(--accent-foreground, #003D32)',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
          blue: '#3B82F6',
        },
        danger: {
          DEFAULT: 'var(--danger, #EF4444)',
          foreground: 'var(--danger-foreground, #FFFFFF)',
        },
        warning: {
          DEFAULT: 'var(--warning, #F59E0B)',
          foreground: 'var(--warning-foreground, #FFFFFF)',
        },
        success: {
          DEFAULT: 'var(--success, #10B981)',
          foreground: 'var(--success-foreground, #FFFFFF)',
        },
        neutral: {
          0: '#FFFFFF',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          400: '#94A3B8',
          600: '#475569',
          800: '#1E293B',
          850: '#1E1E2E',
          900: '#0F172A',
          800: '#2A2A3E',
        },
        dark: {
          bg: '#0F172A',
          surface: '#1E1E2E',
          surface2: '#2A2A3E',
        },
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
      },
      boxShadow: {
        xs: '0 1px 3px rgba(0,0,0,0.12)',
        sm: '0 2px 8px rgba(0,0,0,0.16)',
        md: '0 4px 16px rgba(0,0,0,0.2)',
        lg: '0 8px 32px rgba(0,0,0,0.25)',
        xl: '0 16px 48px rgba(0,0,0,0.3)',
        'glow-primary': '0 0 20px rgba(99,102,241,0.4)',
        'glow-success': '0 0 20px rgba(16,185,129,0.4)',
        'glow-amber': '0 0 20px rgba(245,158,11,0.4)',
        glass: '0 8px 32px rgba(0,0,0,0.37)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
        'gradient-success': 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
        'gradient-hero': 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #A855F7 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0F172A 0%, #1E1E2E 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease forwards',
        'slide-up': 'slideUp 0.35s ease forwards',
        'scale-pop': 'scalePop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 1.5s infinite',
        flame: 'flame 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scalePop: {
          from: { opacity: '0', transform: 'scale(0.85)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        flame: {
          from: { transform: 'rotate(-5deg) scale(1)' },
          to: { transform: 'rotate(5deg) scale(1.05)' },
        },
      },
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '12px',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'ease-enter': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-exit': 'cubic-bezier(0.4, 0, 1, 1)',
      },
    },
  },
  plugins: [],
};
