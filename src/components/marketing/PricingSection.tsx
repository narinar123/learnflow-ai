'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { membershipPlans } from '@/lib/data';

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [seats, setSeats] = useState(25);

  // Corporate seats calculator metrics
  const getSeatPrice = (s: number) => {
    if (s <= 50) return 350;
    if (s <= 200) return 280;
    return 220;
  };

  const currentSeatPrice = getSeatPrice(seats);
  const totalMonthlyCost = seats * currentSeatPrice;
  const standardPrice = 599; // Standard Pro monthly price comparison
  const monthlySavings = (standardPrice * seats) - totalMonthlyCost;

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold tracking-widest uppercase mb-4">PRICING PLANS</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Simple, transparent pricing</h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto mt-2">Choose the learning trajectory that matches your goals. Start free, upgrade anytime.</p>
          
          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-white font-bold' : 'text-slate-400'}`}>Monthly</span>
            <button
              onClick={() => setBillingCycle(b => b === 'monthly' ? 'yearly' : 'monthly')}
              className={`w-12 h-6 rounded-full p-0.5 transition-colors relative focus:outline-none ${billingCycle === 'yearly' ? 'bg-indigo-500' : 'bg-slate-800'}`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </button>
            <span className={`text-sm flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-white font-bold' : 'text-slate-400'}`}>
              Annually
              <span className="text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/30 px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {membershipPlans.map((plan) => {
            const isFree = plan.monthlyPrice === 0;
            const displayPrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl bg-slate-900/60 border flex flex-col justify-between p-8 transition-all duration-300 hover:border-indigo-500/30 ${
                  plan.popular ? 'border-indigo-500 shadow-xl shadow-indigo-500/10' : 'border-slate-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-500 text-white text-[10px] font-bold tracking-widest uppercase">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-1.5">{plan.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">{plan.tagline}</p>

                  <div className="mb-8 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">
                      {isFree ? 'Free' : `₹${displayPrice.toLocaleString()}`}
                    </span>
                    {!isFree && (
                      <span className="text-slate-500 text-xs font-semibold">/month</span>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs">
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                          f.included ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-600'
                        }`}>
                          {f.included ? '✓' : '×'}
                        </span>
                        <span className={f.included ? 'text-slate-300' : 'text-slate-500'}>{f.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/sign-up-login-screen"
                  className={`w-full text-center py-3 rounded-xl font-bold text-xs transition-all duration-150 active:scale-95 ${
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                      : 'bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Corporate seat calculator */}
        <div className="rounded-3xl border p-8 bg-slate-900/30 flex flex-col lg:flex-row items-center justify-between gap-8"
          style={{ borderColor: 'rgba(99,102,241,0.15)' }}>
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
              👔 Institution Plan
            </div>
            <h3 className="text-2xl font-bold text-white">Interactive Enterprise Seat Estimator</h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Prorated B2B bulk pricing automatically adjusts based on seat volume limits. Perfect for custom academy groups.
            </p>

            <div className="mt-8 flex flex-col gap-2 max-w-md">
              <div className="flex justify-between text-xs font-semibold text-slate-400">
                <span>Number of Seats</span>
                <span className="text-white font-mono font-bold text-sm">{seats} Seats</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                value={seats}
                onChange={e => setSeats(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>10 seats (Min)</span>
                <span>500 seats</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-80 rounded-2xl border bg-slate-950 p-6 flex flex-col gap-4 shadow-xl shrink-0"
            style={{ borderColor: 'rgba(99,102,241,0.15)' }}>
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Price per seat</span>
              <span className="text-slate-300 font-bold">₹{currentSeatPrice}/mo</span>
            </div>
            <div className="border-t border-slate-900 pt-3 flex justify-between items-baseline gap-2">
              <span className="text-xs text-slate-500">Total Monthly Cost</span>
              <span className="text-3xl font-extrabold text-white">₹{totalMonthlyCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-[10px] text-green-400 font-bold bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-lg">
              <span>Savings vs Retail</span>
              <span>-₹{monthlySavings.toLocaleString()}/mo</span>
            </div>
            <Link href="/sign-up-login-screen" className="btn-primary w-full text-center py-2.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 border-none shadow-none mt-2">
              Request Enterprise Demo
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
