import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enterprise | GUIDESOFT IT SOLUTIONS',
  description: 'Upskill your workforce with AI-driven learning paths, dedicated support, and advanced analytics for enterprise teams.',
};

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 -z-10 blur-3xl rounded-full" />
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">FOR BUSINESSES</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Train your team for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">future of work.</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto mb-10">
            GUIDESOFT IT SOLUTIONS Enterprise delivers customized learning paths, role-based skilling, and deep analytics to ensure your workforce stays ahead of the technology curve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors shadow-lg">
              Book a Demo
            </Link>
            <Link href="/pricing" className="px-8 py-4 bg-muted hover:bg-muted/80 text-text-primary border border-border font-semibold rounded-xl transition-colors">
              View Pricing
            </Link>
          </div>
        </section>

        {/* Logos */}
        <section className="py-12 border-y border-border/50 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-text-muted uppercase tracking-widest font-medium mb-8">Trusted by forward-thinking companies</p>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-16 opacity-70 grayscale">
              {['TCS', 'Infosys', 'HDFC Bank', 'Zomato', 'Razorpay', 'Swiggy'].map((company) => (
                <span key={company} className="text-xl font-bold text-text-primary">{company}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need to scale learning</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">Enterprise-grade tools to manage, measure, and maximize the ROI of your training programs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Custom Learning Paths', desc: 'Create tailored curricula by combining our premium courses with your internal training materials.' },
              { title: 'Role-based Skills Mapping', desc: 'Map skills directly to job roles in your organization. Automatically identify and fill skill gaps.' },
              { title: 'Advanced Analytics Dashboard', desc: 'Track progress, completion rates, assessment scores, and engagement metrics at the team and individual level.' },
              { title: 'Single Sign-On (SSO)', desc: 'Seamlessly integrate with Okta, Azure AD, Google Workspace, or any SAML 2.0 provider.' },
              { title: 'Dedicated Customer Success', desc: 'Get a dedicated manager to help you map competencies, onboard teams, and drive adoption.' },
              { title: 'API Access & Webhooks', desc: 'Connect LearnFlow data with your existing HRIS, LMS, or internal performance management tools.' },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Check className="text-primary w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 border-y border-border">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to upskill your team?</h2>
            <p className="text-lg text-text-secondary mb-8">Join the hundreds of companies that use GUIDESOFT IT SOLUTIONS to build the workforce of tomorrow.</p>
            <Link href="/contact" className="inline-block px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors shadow-lg">
              Contact our Sales Team
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
