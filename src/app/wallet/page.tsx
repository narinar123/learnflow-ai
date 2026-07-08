'use client';

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/ui/AppLayout';
import { 
  CreditCard, Award, DollarSign, Receipt, Sparkles, Check, 
  ArrowUpRight, ArrowDownLeft, ShieldCheck, Ticket, AlertCircle 
} from 'lucide-react';
import { toast } from 'sonner';

interface Transaction {
  id: string;
  type: 'coin_credit' | 'coin_debit' | 'cash_debit';
  title: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface Invoice {
  id: string;
  planName: string;
  amount: number;
  date: string;
  gateway: 'Razorpay' | 'Stripe';
  status: 'paid' | 'unpaid';
}

const DEFAULT_TRANSACTIONS: Transaction[] = [
  { id: 'tx_001', type: 'coin_credit', title: 'Solved Two Sum Problem in Coding Lab', amount: 100, date: '2026-07-07 15:44', status: 'completed' },
  { id: 'tx_002', type: 'coin_credit', title: 'Finished Section 2 Quiz: Python loops', amount: 50, date: '2026-07-06 18:22', status: 'completed' },
  { id: 'tx_003', type: 'cash_debit', title: 'LearnFlow Pro Plan Annual Subscription Renewal', amount: 5990, date: '2026-07-01 10:00', status: 'completed' },
  { id: 'tx_004', type: 'coin_credit', title: '7-Day Learning Streak Milestone Bonus', amount: 100, date: '2026-06-30 08:12', status: 'completed' },
  { id: 'tx_005', type: 'coin_debit', title: 'Redeemed Premium Resume Template', amount: 200, date: '2026-06-25 14:10', status: 'completed' }
];

const DEFAULT_INVOICES: Invoice[] = [
  { id: 'inv_001', planName: 'LearnFlow Pro — Annual Plan', amount: 5990, date: '2026-07-01', gateway: 'Razorpay', status: 'paid' },
  { id: 'inv_002', planName: 'LearnFlow Pro — Monthly Trial', amount: 599, date: '2026-06-01', gateway: 'Stripe', status: 'paid' }
];

export default function WalletPage() {
  const [coins, setCoins] = useState(350);
  const [couponCode, setCouponCode] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [activeTab, setActiveTab] = useState<'transactions' | 'invoices'>('transactions');

  // Sync state with localstorage
  useEffect(() => {
    const savedCoins = localStorage.getItem('student_wallet_coins');
    if (savedCoins) {
      setCoins(parseInt(savedCoins));
    } else {
      localStorage.setItem('student_wallet_coins', '350');
    }

    const savedTx = localStorage.getItem('student_transactions');
    if (savedTx) {
      setTransactions(JSON.parse(savedTx));
    } else {
      setTransactions(DEFAULT_TRANSACTIONS);
      localStorage.setItem('student_transactions', JSON.stringify(DEFAULT_TRANSACTIONS));
    }

    const savedInv = localStorage.getItem('student_invoices');
    if (savedInv) {
      setInvoices(JSON.parse(savedInv));
    } else {
      setInvoices(DEFAULT_INVOICES);
      localStorage.setItem('student_invoices', JSON.stringify(DEFAULT_INVOICES));
    }
  }, []);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    
    if (!code) return;

    if (code === 'STUDENT50') {
      const bonus = 200;
      const updatedCoins = coins + bonus;
      setCoins(updatedCoins);
      localStorage.setItem('student_wallet_coins', updatedCoins.toString());
      
      const newTx: Transaction = {
        id: `tx_${Date.now()}`,
        type: 'coin_credit',
        title: 'Redeemed Promo Coupon STUDENT50 bonus',
        amount: bonus,
        date: new Date().toISOString().slice(0, 16).replace('T', ' '),
        status: 'completed'
      };
      
      const updatedTx = [newTx, ...transactions];
      setTransactions(updatedTx);
      localStorage.setItem('student_transactions', JSON.stringify(updatedTx));
      
      setCouponCode('');
      toast.success('Coupon applied! Added 200 LearnFlow coins to your wallet.');
    } else if (code === 'PROFREE') {
      toast.success('Premium Pro plan upgrade applied. Check Membership settings.');
      setCouponCode('');
    } else {
      toast.error('Invalid or expired coupon code. Try entering "STUDENT50".');
    }
  };

  const handlePrintReceipt = (id: string) => {
    toast.info(`Instantiating print spooler for Invoice ${id}...`);
    setTimeout(() => {
      toast.success('Invoice receipt PDF compiled and ready.');
    }, 1200);
  };

  return (
    <AppLayout>
      <div className="animate-fade-in space-y-8 max-w-5xl mx-auto pb-10">
        
        {/* Banner header */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Billing & Learning Wallet
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            Manage your pricing subscription, redeem coin coupon codes, and review historical invoicing logs.
          </p>
        </div>

        {/* Dashboard Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Coins Balance */}
          <div 
            className="p-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col justify-between relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(245, 158, 11, 0.08) 100%)',
            }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Virtual Balance</span>
                <span className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
                  <Award size={18} />
                </span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-[var(--text-primary)]">{coins}</h3>
                <p className="text-[10px] text-[var(--text-secondary)] mt-1">LearnFlow Coins (earned from activities)</p>
              </div>
            </div>
            
            <div className="mt-6 pt-3 border-t border-[var(--border-color)] text-[10px] text-indigo-400 font-semibold flex items-center gap-1">
              <Sparkles size={12} />
              Earn more coins by finishing quizzes
            </div>
          </div>

          {/* Card 2: Subscription Status */}
          <div className="p-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Membership Subscription</span>
                <span className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                  <ShieldCheck size={18} />
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Pro Membership</h3>
                <p className="text-[10px] text-[var(--text-secondary)] mt-1">Renewal scheduled for May 15, 2027</p>
              </div>
            </div>
            
            <div className="mt-6 pt-3 border-t border-[var(--border-color)] text-[10px] text-[var(--text-secondary)] font-medium flex items-center justify-between">
              <span>Annual Cycle: Active</span>
              <button 
                onClick={() => toast.info('To cancel billing, contact LearnFlow support.')}
                className="text-rose-400 hover:underline font-bold"
              >
                Cancel Renewal
              </button>
            </div>
          </div>

          {/* Card 3: Coupon Redemption */}
          <div className="p-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider">Redeem Promo Code</span>
                <Ticket size={18} className="text-slate-400" />
              </div>
              
              <form onSubmit={handleApplyCoupon} className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="e.g. STUDENT50"
                  className="input-field text-xs py-1.5"
                  style={{ minHeight: '36px' }}
                />
                <button
                  type="submit"
                  className="btn btn-primary px-3 py-1.5 min-h-[36px] text-xs font-bold shrink-0"
                >
                  Apply
                </button>
              </form>
            </div>

            <div className="mt-6 pt-3 border-t border-[var(--border-color)] text-[9px] text-[var(--text-secondary)] leading-tight flex items-center gap-1">
              <AlertCircle size={10} className="text-indigo-400 shrink-0" />
              <span>Coupon "STUDENT50" awards +200 coins immediately.</span>
            </div>
          </div>

        </div>

        {/* Tab logs split */}
        <div className="space-y-6">
          <div className="flex gap-3 border-b border-[var(--border-color)] pb-px" role="tablist">
            {[
              { id: 'transactions', label: 'Wallet Coin Transactions' },
              { id: 'invoices', label: 'Invoices & Receipts' }
            ].map(tab => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-3 font-semibold text-xs border-b-2 transition-all duration-200 -mb-px ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-400 font-bold'
                    : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div>
            {activeTab === 'transactions' ? (
              // TRANSACTIONS LEDGER LIST
              <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden divide-y divide-[var(--border-color)]">
                {transactions.length === 0 ? (
                  <div className="p-10 text-center text-xs text-[var(--text-secondary)]">No wallet ledger transactions recorded.</div>
                ) : (
                  transactions.map(tx => {
                    const isCredit = tx.type === 'coin_credit';
                    const isCash = tx.type === 'cash_debit';
                    
                    return (
                      <div key={tx.id} className="p-4 flex items-center justify-between gap-4 text-xs">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${
                            isCredit
                              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                              : isCash
                                ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                                : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                          }`}>
                            {isCredit ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                          </div>
                          
                          <div className="min-w-0">
                            <p className="font-semibold text-[var(--text-primary)] truncate">{tx.title}</p>
                            <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">{tx.date}</p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className={`font-bold ${isCredit ? 'text-emerald-400' : 'text-slate-400'}`}>
                            {isCredit ? '+' : '-'}{isCash ? `₹${tx.amount.toLocaleString('en-IN')}` : `${tx.amount} Coins`}
                          </span>
                          <span className="block text-[8px] text-slate-500 mt-0.5">Completed</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              // INVOICES LIST
              <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden divide-y divide-[var(--border-color)]">
                {invoices.length === 0 ? (
                  <div className="p-10 text-center text-xs text-[var(--text-secondary)]">No billing invoices found.</div>
                ) : (
                  invoices.map(inv => (
                    <div key={inv.id} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-[var(--text-primary)]">{inv.planName}</h4>
                        <div className="flex gap-4 text-[10px] text-[var(--text-secondary)]">
                          <span>Date: {inv.date}</span>
                          <span>Gateway: {inv.gateway}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-left sm:text-right shrink-0">
                          <p className="text-xs font-bold text-[var(--text-primary)]">₹{inv.amount.toLocaleString('en-IN')}</p>
                          <span className="inline-flex px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase mt-0.5">
                            Paid
                          </span>
                        </div>
                        
                        <button
                          onClick={() => handlePrintReceipt(inv.id)}
                          className="btn btn-secondary px-3 py-1.5 min-h-[32px] text-[10px] flex items-center gap-1"
                        >
                          <Receipt size={12} />
                          Receipt
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
