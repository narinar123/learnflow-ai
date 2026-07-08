'use client';

import React, { useState, useEffect } from 'react';
import { getBillingDetails, saveBillingDetails, RecruiterBilling } from '@/lib/recruiterData';

export default function RecruiterBillingPanel() {
  const [billing, setBilling] = useState<RecruiterBilling | null>(null);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [newPlanToUpgrade, setNewPlanToUpgrade] = useState('');

  useEffect(() => {
    const data = getBillingDetails();
    setBilling(data);
    setSelectedPlan(data.plan);
  }, []);

  if (!billing) return <div className="text-center py-20 text-slate-400">Loading billing details...</div>;

  const plans = [
    { name: 'Free', price: '₹0', desc: 'Core student directory browsing and basic posting limits.', features: ['1 active job posting', 'Basic candidate search', '5 AI resume matches/mo', 'Email support'] },
    { name: 'Startup', price: '₹3,999', desc: 'Designed for small companies scale-ups.', features: ['5 active job postings', 'Advanced filtering', '50 AI resume matches/mo', 'Priority email support', 'Slack integration'] },
    { name: 'Pro', price: '₹9,999', desc: 'Advanced matching and visual Kanban pipeline metrics.', features: ['Unlimited job postings', 'Visual hiring pipeline', '300 AI resume matches/mo', 'Dedicated account tutor', 'ATS integrations', 'Calendar sync'] },
    { name: 'Enterprise', price: 'Custom', desc: 'Custom enterprise matching models and API access keys.', features: ['Custom seat configurations', 'Dedicated model training', 'Unlimited AI resume scanning', 'SSO & SLA validation', 'Full REST API tokens access'] },
  ];

  const handlePlanClick = (planName: string) => {
    if (planName === billing.plan) return;
    setNewPlanToUpgrade(planName);
    setShowPaymentModal(true);
  };

  const handleConfirmUpgrade = () => {
    const updatedBilling: RecruiterBilling = {
      ...billing,
      plan: newPlanToUpgrade as any,
      invoices: [
        {
          id: `inv_rec_${Date.now()}`,
          number: `INV-REC-00${billing.invoices.length + 1}`,
          date: new Date().toISOString().split('T')[0],
          amount: newPlanToUpgrade === 'Startup' ? 49 : newPlanToUpgrade === 'Pro' ? 149 : newPlanToUpgrade === 'Enterprise' ? 499 : 0,
          status: 'Paid',
        },
        ...billing.invoices
      ]
    };
    saveBillingDetails(updatedBilling);
    setBilling(updatedBilling);
    setSelectedPlan(newPlanToUpgrade);
    setShowPaymentModal(false);
    alert(`Successfully upgraded to the ${newPlanToUpgrade} plan!`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Billing & Tiers</h1>
        <p className="text-slate-400 text-sm mt-1">Manage corporate subscriptions, check monthly invoice history, and review usage caps.</p>
      </div>

      {/* Subscription Plans Bento */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {plans.map(plan => {
          const isActive = plan.name === selectedPlan;
          return (
            <div 
              key={plan.name} 
              className={`p-6 rounded-3xl border flex flex-col justify-between gap-6 transition-all duration-200 ${
                isActive 
                  ? 'border-indigo-500 bg-indigo-500/5 shadow-lg shadow-indigo-600/5 scale-[1.02]' 
                  : 'border-slate-800 bg-[#0F0B26] hover:border-slate-700'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{plan.name}</span>
                  {isActive && (
                    <span className="px-2 py-0.5 bg-indigo-500 text-[9px] font-black uppercase tracking-wider rounded">
                      Active Plan
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{plan.price}</div>
                  <span className="text-[10px] text-slate-500">{plan.price !== 'Custom' ? '/ month' : 'contact sales'}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">{plan.desc}</p>
                <div className="border-t border-slate-800/80 my-3" />
                <ul className="space-y-2 text-[10px] text-slate-300 font-semibold">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-indigo-400">✔️</span>
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handlePlanClick(plan.name)}
                disabled={isActive}
                className={`w-full py-2 text-xs font-bold rounded-xl border transition-all duration-150 ${
                  isActive
                    ? 'bg-indigo-950/20 text-indigo-400 border-indigo-500/20 cursor-default'
                    : 'bg-indigo-600 hover:bg-indigo-500 border-indigo-600 hover:border-indigo-500 text-white active:scale-95'
                }`}
              >
                {isActive ? 'Current Plan' : 'Select Plan'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Grid: Payment Info + Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Info */}
        <div className="lg:col-span-1 p-6 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-4">
          <h3 className="text-base font-bold text-white">Payment Method</h3>
          <p className="text-slate-400 text-xs leading-relaxed">Your card will automatically be charged on your monthly renewal date.</p>

          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/40 flex items-center gap-3">
            <span className="text-2xl">💳</span>
            <div>
              <p className="text-xs font-bold text-white">Visa ending in {billing.cardLast4}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Expires: 08/2028 · Renewal: {billing.nextBillingDate}</p>
            </div>
            <button 
              onClick={() => alert('Update card form coming soon')} 
              className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 ml-auto"
            >
              Update
            </button>
          </div>

          <div className="pt-2">
            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Usage Caps</h4>
            <div className="space-y-2">
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-semibold">
                  <span className="text-slate-400">AI Resume Matches (Monthly)</span>
                  <span className="text-white font-bold">142 / 300 scans</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '47%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice list */}
        <div className="lg:col-span-2 p-6 rounded-3xl border border-slate-800 bg-[#0F0B26] space-y-4">
          <h3 className="text-base font-bold text-white">Invoice History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase">
                  <th className="pb-3">Invoice Number</th>
                  <th className="pb-3">Bill Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Download</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {billing.invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-900/10">
                    <td className="py-3 font-bold text-white">{inv.number}</td>
                    <td className="py-3 text-slate-400">{inv.date}</td>
                    <td className="py-3 text-slate-200 font-mono">₹{inv.amount * 80}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold rounded">
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button 
                        onClick={() => alert(`Downloading invoice document: ${inv.number}`)} 
                        className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300"
                      >
                        PDF 📥
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ─── PAYMENT CONFIRMATION MODAL ─── */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#0F0B26] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4 text-center animate-slide-up">
            <span className="text-3xl block">💳</span>
            <div>
              <h3 className="text-base font-bold text-white">Upgrade Subscription</h3>
              <p className="text-slate-400 text-xs mt-1">Confirm payment upgrade to the <span className="text-white font-bold">{newPlanToUpgrade}</span> tier.</p>
            </div>
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 flex justify-between items-center">
              <span>Upgraded Price:</span>
              <span className="font-bold text-white font-mono">
                {newPlanToUpgrade === 'Startup' ? '₹3,999/mo' : newPlanToUpgrade === 'Pro' ? '₹9,999/mo' : 'Custom'}
              </span>
            </div>
            <div className="flex gap-2 pt-2">
              <button 
                type="button" 
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl border border-slate-700 text-slate-300"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleConfirmUpgrade}
                className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold rounded-xl text-white shadow-md shadow-indigo-600/10"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
