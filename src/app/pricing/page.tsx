import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { membershipPlans } from '@/lib/data';
import { Check, X } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing | GUIDESOFT IT SOLUTIONS',
  description: 'Simple, transparent pricing for learners and enterprises. Start for free and upgrade when you need more power.',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Invest in your future. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-indigo-400 dark:to-purple-400">
              Pick the right plan for you.
            </span>
          </h1>
          <p className="text-lg text-text-secondary">
            Whether you're just starting out or leading a team of thousands, we have a plan that scales with your ambition. No hidden fees. Cancel anytime.
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {membershipPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl bg-card border-2 ${
                  plan.popular ? 'border-primary shadow-2xl shadow-primary/20 scale-105 z-10' : 'border-border'
                } p-8 flex flex-col transition-all duration-300 hover:-translate-y-1`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold tracking-wide uppercase shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-text-primary mb-2">{plan.name}</h3>
                  <p className="text-sm text-text-muted h-10">{plan.tagline}</p>
                </div>
                
                <div className="mb-8">
                  {plan.monthlyPrice === 0 ? (
                    <div className="text-5xl font-bold text-text-primary">
                      Free <span className="text-lg font-normal text-text-muted">forever</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-bold text-text-primary">₹{plan.monthlyPrice.toLocaleString()}</span>
                        <span className="text-text-muted">/month</span>
                      </div>
                      <div className="text-sm text-emerald-500 font-medium mt-2">
                        ₹{plan.annualPrice}/mo billed annually
                      </div>
                    </div>
                  )}
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        f.included ? 'bg-emerald-500/20 text-emerald-500' : 'bg-muted text-text-muted'
                      }`}>
                        {f.included ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      </div>
                      <span className={f.included ? 'text-text-primary' : 'text-text-muted'}>{f.name}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/sign-up-login-screen"
                  className={`w-full text-center py-4 rounded-xl font-bold text-sm transition-all duration-200 ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 active:scale-95'
                      : 'bg-muted hover:bg-muted/80 border border-border text-text-primary active:scale-95'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Enterprise Callout */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-indigo-950/50 dark:to-purple-950/50 border border-border p-8 sm:p-12 text-center sm:text-left flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">Need a plan for your entire company?</h2>
              <p className="text-text-secondary mb-0 text-lg">
                Get dedicated support, custom learning paths, SSO integration, and advanced analytics with our Enterprise plans.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link href="/enterprise" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-background border border-border font-semibold text-text-primary hover:bg-muted transition-colors shadow-sm">
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
        
        {/* FAQ Preview */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto border-t border-border/50">
          <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-lg text-text-primary mb-2">Can I cancel my subscription?</h3>
              <p className="text-text-secondary">Yes, you can cancel your subscription at any time. If you cancel, you will retain access to your plan until the end of your current billing cycle.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-text-primary mb-2">What payment methods do you accept?</h3>
              <p className="text-text-secondary">We accept all major credit cards, debit cards, UPI, and net banking via our secure payment partner Razorpay.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-text-primary mb-2">Do you offer refunds?</h3>
              <p className="text-text-secondary">We offer a 14-day money-back guarantee for all new annual subscriptions. If you're not satisfied, just let us know and we'll refund you in full.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/help" className="text-primary font-medium hover:underline">
              View all FAQs →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
