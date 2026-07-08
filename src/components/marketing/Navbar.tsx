'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AppLogo } from '@/components/ui/AppLogo';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks = [
  {
    name: 'Learn',
    href: '#',
    subLinks: [
      { name: 'Browse Courses', href: '/courses', description: 'Explore all 500+ courses' },
      { name: 'Learning Paths', href: '/learning-paths', description: 'Structured paths for your career' },
    ],
  },
  {
    name: 'Solutions',
    href: '#',
    subLinks: [
      { name: 'Enterprise', href: '/enterprise', description: 'Upskill your entire workforce' },
      { name: 'Universities', href: '/universities', description: 'Bring AI learning to your campus' },
    ],
  },
  { name: 'Pricing', href: '/pricing' },
  {
    name: 'Resources',
    href: '#',
    subLinks: [
      { name: 'Blog', href: '/blog', description: 'Latest insights and news' },
      { name: 'Webinars & Events', href: '/webinars', description: 'Live sessions with experts' },
      { name: 'Help Center', href: '/help', description: 'Support and documentation' },
    ],
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const pathname = usePathname();

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-[12px] supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex flex-1 items-center justify-start">
          <Link href="/" className="flex items-center gap-2">
            <AppLogo size="md" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center gap-8">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative"
              onMouseEnter={() => link.subLinks && setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {link.subLinks ? (
                <button
                  className={`group flex items-center gap-1 text-sm font-medium transition-colors ${
                    activeDropdown === link.name ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.name}
                  <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href ? 'text-primary' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              )}

              {/* Desktop Dropdown */}
              {link.subLinks && (
                <AnimatePresence>
                  {activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 mt-4 w-64 -translate-x-1/2 rounded-xl border border-border bg-card p-2 shadow-xl"
                    >
                      {link.subLinks.map((subLink) => (
                        <Link
                          key={subLink.name}
                          href={subLink.href}
                          className="block rounded-lg p-3 hover:bg-muted/50 transition-colors"
                        >
                          <div className="text-sm font-medium text-text-primary">{subLink.name}</div>
                          <div className="mt-1 text-xs text-text-secondary line-clamp-2">{subLink.description}</div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">
              Log in
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex items-center justify-center rounded-md p-2 text-text-secondary hover:bg-muted hover:text-text-primary focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border/40"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <div key={link.name} className="space-y-3">
                  {link.subLinks ? (
                    <div>
                      <div className="font-semibold text-text-primary mb-2">{link.name}</div>
                      <div className="ml-4 flex flex-col gap-3 border-l border-border pl-4">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.name}
                            href={subLink.href}
                            className="text-sm text-text-secondary hover:text-primary"
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block font-semibold text-text-primary hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="pt-6 border-t border-border flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Theme</span>
                  <ThemeToggle />
                </div>
                <Link
                  href="/login"
                  className="block w-full text-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-muted"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="block w-full text-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
