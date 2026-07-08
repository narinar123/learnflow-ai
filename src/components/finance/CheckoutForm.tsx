'use client';

import React, { useState } from 'react';

interface CheckoutFormProps {
  onSuccess: (details: { id: string; amount: number; gateway: string }) => void;
}

export function CheckoutForm({ onSuccess }: CheckoutFormProps) {
  const [selectedGateway, setSelectedGateway] = useState<'stripe' | 'paypal' | 'razorpay'>('stripe');
  const [productAmount] = useState<number>(299.00);
  const [taxRate] = useState<number>(0.18); // 18% GST / VAT
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const discountAmount = productAmount * discount;
  const taxableAmount = productAmount - discountAmount;
  const calculatedTax = taxableAmount * taxRate;
  const totalAmount = taxableAmount + calculatedTax;

  const handlePromoApply = () => {
    if (promoCode.trim().toUpperCase() === 'LEARNFLOW50') {
      setDiscount(0.5);
      alert('Promo applied: 50% discount!');
    } else {
      alert('Invalid promo code');
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate integration webhook call delay
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess({
        id: `tx_${selectedGateway}_${Math.floor(10000 + Math.random() * 90000)}`,
        amount: totalAmount,
        gateway: selectedGateway
      });
    }, 2000);
  };

  return (
    <div className="card-base p-6 max-w-lg mx-auto space-y-6">
      <div>
        <h3 className="text-base font-bold text-foreground">Order Checkout Summary</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Secure payment integration gateway</p>
      </div>

      {/* Cart Summary Item */}
      <div className="border border-border rounded-xl p-4 bg-secondary/15 flex justify-between items-center text-xs">
        <div>
          <span className="font-semibold text-foreground">GUIDESOFT IT SOLUTIONS Enterprise Bundle</span>
          <p className="text-[10px] text-muted-foreground mt-0.5">Annual course access for 1 user seat</p>
        </div>
        <span className="font-mono font-bold text-foreground">${productAmount.toFixed(2)}</span>
      </div>

      {/* Promo Code */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Promo code (e.g. LEARNFLOW50)"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="input-field text-xs py-2 px-3"
        />
        <button
          type="button"
          onClick={handlePromoApply}
          className="btn-secondary text-xs px-4 py-2"
        >
          Apply
        </button>
      </div>

      <form onSubmit={handleCheckout} className="space-y-4">
        {/* Gateway Integrations Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
            Select Payment Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'stripe', label: 'Stripe', logo: '💳' },
              { id: 'paypal', label: 'PayPal', logo: '🟪' },
              { id: 'razorpay', label: 'Razorpay', logo: '⚡' }
            ].map((gate) => (
              <button
                key={gate.id}
                type="button"
                onClick={() => setSelectedGateway(gate.id as any)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all select-none ${
                  selectedGateway === gate.id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-card text-muted-foreground hover:bg-secondary/40'
                }`}
              >
                <span className="text-lg">{gate.logo}</span>
                <span className="text-[10px] font-bold mt-1 uppercase tracking-wide">{gate.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Breakdown */}
        <div className="space-y-2 border-t border-border pt-4 text-xs">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal:</span>
            <span className="font-mono">${productAmount.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-danger">
              <span>Promo Discount (50%):</span>
              <span className="font-mono">-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-muted-foreground">
            <span>Estimated VAT/GST (18%):</span>
            <span className="font-mono">${calculatedTax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-border/60 pt-2 font-bold text-sm text-foreground">
            <span>Order Total:</span>
            <span className="font-mono text-primary">${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full btn-primary py-3 font-bold text-xs"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing Secure {selectedGateway.toUpperCase()} payment...
            </span>
          ) : (
            `Pay $${totalAmount.toFixed(2)} via ${selectedGateway.toUpperCase()}`
          )}
        </button>
      </form>
    </div>
  );
}
