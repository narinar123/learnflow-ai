'use client';

import { useState } from 'react';
import { Check, ShieldCheck, HelpCircle, Loader2, Sparkles } from 'lucide-react';
import { AppLayout } from '@/components/ui/AppLayout';
import { membershipPlans, demoUser } from '@/lib/data';
import { toast } from 'sonner';

export default function MembershipPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [checkoutPlan, setCheckoutPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = (planId: string) => {
    if (planId === 'plan_free') {
      toast.info('You are already on the Free tier.');
      return;
    }
    setCheckoutPlan(planId);
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    // Simulate Razorpay transaction
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutPlan(null);
      toast.success('🎉 Upgrade successful! Welcome to Pro.');
      demoUser.plan = 'PRO';
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-8 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Membership Plans
          </h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-lg mx-auto">
            Choose the membership tier that fits your learning pace. Upgrade, downgrade, or cancel anytime.
          </p>

          {/* Toggle */}
          <div className="inline-flex p-1 rounded-xl bg-[var(--bg-surface-2)] border border-[var(--border-color)] mt-4">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                billingCycle === 'monthly' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual' 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>Annual</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[9px]">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {membershipPlans.map((plan) => {
            const isCurrent = (plan.id === 'plan_free' && (demoUser.plan as string) === 'FREE') || 
                              (plan.id === 'plan_pro' && (demoUser.plan as string) === 'PRO');
            
            const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
            
            return (
              <div 
                key={plan.id} 
                className={`relative rounded-3xl bg-[var(--bg-surface)] border-2 ${
                  plan.popular ? 'border-indigo-500 shadow-xl shadow-indigo-500/5' : 'border-[var(--border-color)]'
                } p-6 flex flex-col justify-between`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-[10px] uppercase tracking-wider shadow-lg">
                    Most Popular
                  </span>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">{plan.name}</h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{plan.tagline}</p>
                  </div>

                  <div className="mb-6 flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-[var(--text-primary)]">
                      ₹{price.toLocaleString()}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)]">
                      {plan.monthlyPrice === 0 ? '/forever' : '/month'}
                    </span>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          f.included ? 'text-emerald-400' : 'text-[var(--text-secondary)] opacity-30'
                        }`} />
                        <span className={f.included ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)] opacity-55'}>
                          {f.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleCheckout(plan.id)}
                  disabled={isCurrent}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                    isCurrent 
                      ? 'bg-[var(--bg-surface-2)] text-[var(--text-secondary)] border border-[var(--border-color)] cursor-default' 
                      : plan.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg'
                      : 'border border-[var(--border-color)] text-[var(--text-primary)] hover:border-indigo-500 hover:text-indigo-400 bg-[var(--bg-surface-2)]'
                  }`}
                >
                  {isCurrent ? 'Current Plan' : plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Security & FAQ quick band */}
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[var(--text-primary)]">Secure Payment Guarantee</h4>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                Processed via Razorpay with 256-bit SSL encryption. All major cards accepted.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-[var(--text-secondary)] font-medium">
            <a href="/faq" className="hover:underline flex items-center gap-1">
              <HelpCircle size={14} />
              <span>Refund Policy</span>
            </a>
            <span>•</span>
            <a href="/terms" className="hover:underline">Terms of Service</a>
          </div>
        </div>

        {/* ─── Simulated Checkout Modal ─── */}
        {checkoutPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 space-y-6 shadow-2xl relative animate-scale-in">
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                  <Sparkles size={16} className="text-indigo-400" />
                  <span>Secure Checkout</span>
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Complete your payment via Razorpay.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-surface-2)] space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--text-secondary)] font-medium">Upgrade to Plan:</span>
                  <span className="font-bold text-[var(--text-primary)]">
                    {checkoutPlan === 'plan_pro' ? 'Pro Membership' : 'Premium Membership'}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[var(--text-secondary)] font-medium">Billing Period:</span>
                  <span className="font-bold text-[var(--text-primary)]">
                    {billingCycle === 'monthly' ? 'Monthly' : 'Annual (Save 20%)'}
                  </span>
                </div>
                <div className="h-px bg-[var(--border-color)] my-1" />
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-[var(--text-primary)]">Total Amount:</span>
                  <span className="font-black text-indigo-400">
                    ₹{checkoutPlan === 'plan_pro' 
                      ? (billingCycle === 'monthly' ? 599 : 499 * 12).toLocaleString()
                      : (billingCycle === 'monthly' ? 999 : 833 * 12).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setCheckoutPlan(null)}
                  disabled={isProcessing}
                  className="flex-1 py-2.5 rounded-xl border border-[var(--border-color)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSimulatePayment}
                  disabled={isProcessing}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-indigo-500 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Paying...</span>
                    </>
                  ) : (
                    <span>Pay with Razorpay</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
}
