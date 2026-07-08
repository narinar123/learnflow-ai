'use client';

import React from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import PermissionGuard from '@/components/admin/PermissionGuard';
import { mockPlans } from '@/lib/admin-data';

export default function MembershipPage() {
  return (
    <PermissionGuard permission="membership:read">
      <div className="flex flex-col gap-6">
        <AdminPageHeader
          title="Membership Plans"
          description="Manage subscription tiers, features list, pricing matrix, and billing cycle configurations."
          badge="Subscriptions"
          actions={
            <button
              onClick={() => alert('Add tier functionality...')}
              className="btn-primary"
            >
              Add Tier
            </button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPlans.map((plan) => (
            <div
              key={plan.id}
              className="rounded-2xl border p-6 flex flex-col justify-between gap-6 transition-all duration-200 hover:border-purple-500/30"
              style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(108,71,255,0.12)' }}
            >
              <div>
                <div className="flex justify-between items-center gap-3">
                  <span className={`text-base font-bold text-white`}>{plan.name}</span>
                  {plan.isPopular && (
                    <span className="text-[10px] font-semibold bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Popular
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">${plan.price}</span>
                  <span className="text-xs text-slate-500 font-medium">/{plan.billingCycle}</span>
                </div>

                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-6 mb-3">Trained features</p>
                <ul className="space-y-2">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <span className="text-positive">✓</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-5" style={{ borderColor: 'rgba(108,71,255,0.08)' }}>
                <div className="flex justify-between text-xs text-slate-400 mb-4">
                  <span>Subscribers</span>
                  <span className="font-bold text-white">{plan.activeSubscribers.toLocaleString()} active</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => alert(`Editing plan parameters: ${plan.name}`)}
                    className="btn-outline flex-1 py-2 text-xs"
                  >
                    Edit Tier
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PermissionGuard>
  );
}
