import Link from 'next/link';
import { AppLogo } from '@/components/ui/AppLogo';
import { Twitter, Linkedin, Github, Instagram, ArrowRight } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Browse Courses', href: '/courses' },
    { name: 'Learning Paths', href: '/learning-paths' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Membership', href: '/membership' },
  ],
  solutions: [
    { name: 'Enterprise Training', href: '/enterprise' },
    { name: 'Corporate Solutions', href: '/enterprise#corporate' },
    { name: 'Universities', href: '/universities' },
    { name: 'Success Stories', href: '/success-stories' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Webinars', href: '/webinars' },
    { name: 'Events', href: '/events' },
    { name: 'Help Center', href: '/help' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Partners', href: '/partners' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
        
        {/* Newsletter & Main Links */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand and Newsletter */}
          <div className="space-y-8 lg:col-span-4">
            <AppLogo size="md" />
            <p className="text-sm leading-6 text-text-secondary">
              Master new skills with AI-powered personalized learning paths. Join 100,000+ learners building their careers with GUIDESOFT IT SOLUTIONS.
            </p>
            
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-text-primary">Subscribe to our newsletter</h3>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full min-w-0 flex-auto rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-primary shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="flex flex-none items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Product</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerLinks.product.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm leading-6 text-text-secondary hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Solutions</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerLinks.solutions.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm leading-6 text-text-secondary hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary">Resources</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerLinks.resources.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm leading-6 text-text-secondary hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-text-primary">Company</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm leading-6 text-text-secondary hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-border/40 pt-8 sm:flex-row gap-6">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-sm leading-6 text-text-secondary">
            <span>&copy; {new Date().getFullYear()} GUIDESOFT (GUIDESOFT IT SOLUTIONS). All rights reserved.</span>
            <div className="flex gap-x-6">
              {footerLinks.legal.map((item) => (
                <Link key={item.name} href={item.href} className="hover:text-primary transition-colors">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex gap-x-6">
            {socialLinks.map((item) => (
              <a key={item.name} href={item.href} className="text-text-secondary hover:text-primary transition-colors">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        
      </div>
    </footer>
  );
}
