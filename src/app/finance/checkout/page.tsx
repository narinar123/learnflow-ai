'use client';

import React, { useState } from 'react';
import { AnalyticsTopbar } from '@/components/analytics/AnalyticsTopbar';
import { CheckoutForm } from '@/components/finance/CheckoutForm';
import { ChartCard } from '@/components/analytics/ChartCard';

export default function FinanceCheckoutPage() {
  const [paymentResult, setPaymentResult] = useState<{
    id: string;
    amount: number;
    gateway: string;
  } | null>(null);

  const handleSuccess = (details: { id: string; amount: number; gateway: string }) => {
    setPaymentResult(details);
  };

  return (
    <div className="flex-1 flex flex-col space-y-6 pb-12">
      <AnalyticsTopbar
        title="Payments & Checkout Center"
        subtitle="Secure Stripe, PayPal and Razorpay single-item payment integrations simulator"
      />

      <div className="px-6 space-y-6">
        {!paymentResult ? (
          <CheckoutForm onSuccess={handleSuccess} />
        ) : (
          <div className="card-base p-8 max-w-lg mx-auto text-center space-y-4 relative overflow-hidden select-none">
            {/* Glow */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl pointer-events-none bg-accent/20" />
            
            <div className="w-12 h-12 rounded-full bg-accent/15 text-accent flex items-center justify-center text-xl mx-auto">
              ✓
            </div>
            
            <div>
              <h3 className="text-base font-bold text-foreground">Payment Captured Successfully</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Webhook integration processed ledger credit entry</p>
            </div>

            <div className="border border-border/80 bg-secondary/15 rounded-xl p-4 text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-mono text-foreground font-semibold">{paymentResult.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Processed Amount:</span>
                <span className="font-mono text-primary font-bold">${paymentResult.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gateway:</span>
                <span className="font-mono text-foreground font-semibold uppercase">{paymentResult.gateway}</span>
              </div>
            </div>

            <button
              onClick={() => setPaymentResult(null)}
              className="btn-outline text-xs px-4 py-2 w-full mt-2"
            >
              Simulate Another Checkout Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
