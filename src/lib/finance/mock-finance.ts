// ─── Enterprise Finance Module — Mock Data & Types ──────────────────────────

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed' | 'pending' | 'refunded';
  gateway: 'stripe' | 'paypal' | 'razorpay';
  method: 'card' | 'wallet' | 'bank_transfer' | 'upi';
  customerName: string;
  customerEmail: string;
  description: string;
  createdAt: string;
  tax: number;
  fee: number;
}

export interface Payout {
  id: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  recipientName: string;
  recipientEmail: string;
  gateway: 'bank_transfer' | 'stripe_connect' | 'paypal';
  createdAt: string;
  referenceNumber: string;
}

export interface Wallet {
  balance: number;
  currency: string;
  ledger: {
    id: string;
    type: 'deposit' | 'withdrawal' | 'payment' | 'refund';
    amount: number;
    description: string;
    createdAt: string;
  }[];
}

export interface TaxRate {
  id: string;
  name: string;
  rate: number; // percentage, e.g. 18 for 18%
  type: 'VAT' | 'GST' | 'Sales_Tax';
  country: string;
  active: boolean;
}

// ── Mock Data ────────────────────────────────────────────────────────────────

export const mockWallet: Wallet = {
  balance: 14820.50,
  currency: 'USD',
  ledger: [
    { id: 'w-ledger-001', type: 'deposit', amount: 5000.00, description: 'Bank transfer credit', createdAt: '2026-07-07 10:12' },
    { id: 'w-ledger-002', type: 'payment', amount: -280.00, description: 'Purchased Python Mastery Course', createdAt: '2026-07-06 14:45' },
    { id: 'w-ledger-003', type: 'refund', amount: 99.00, description: 'Refund for duplicate class ticket', createdAt: '2026-07-05 09:30' },
    { id: 'w-ledger-004', type: 'withdrawal', amount: -1500.00, description: 'Withdrawn to bank account', createdAt: '2026-07-04 17:00' },
    { id: 'w-ledger-005', type: 'deposit', amount: 12000.00, description: 'Enterprise sponsor funding', createdAt: '2026-07-01 08:00' }
  ]
};

export const mockTransactions: Transaction[] = [
  {
    id: 'tx_stripe_98412',
    amount: 299.00,
    currency: 'USD',
    status: 'succeeded',
    gateway: 'stripe',
    method: 'card',
    customerName: 'Priya Sharma',
    customerEmail: 'priya@learnflow.ai',
    description: 'Data Science Career Path Enrollment',
    createdAt: '2026-07-07 18:24',
    tax: 45.60,
    fee: 9.12
  },
  {
    id: 'tx_paypal_88194',
    amount: 149.00,
    currency: 'USD',
    status: 'succeeded',
    gateway: 'paypal',
    method: 'wallet',
    customerName: 'Alex Rivera',
    customerEmail: 'alex@rivera.net',
    description: 'UI/UX Starter Bundle Upgrade',
    createdAt: '2026-07-07 12:15',
    tax: 22.70,
    fee: 4.80
  },
  {
    id: 'tx_razor_77215',
    amount: 89.00,
    currency: 'USD',
    status: 'succeeded',
    gateway: 'razorpay',
    method: 'upi',
    customerName: 'Rohan Patel',
    customerEmail: 'rohan@patel.in',
    description: 'React Advanced Masterclass',
    createdAt: '2026-07-06 20:30',
    tax: 16.02,
    fee: 2.67
  },
  {
    id: 'tx_stripe_99411',
    amount: 499.00,
    currency: 'USD',
    status: 'refunded',
    gateway: 'stripe',
    method: 'card',
    customerName: 'Jake Miller',
    customerEmail: 'jake@miller.org',
    description: 'AI Engineer Path Enterprise License',
    createdAt: '2026-07-05 11:00',
    tax: 76.10,
    fee: 15.20
  },
  {
    id: 'tx_paypal_88301',
    amount: 199.00,
    currency: 'USD',
    status: 'failed',
    gateway: 'paypal',
    method: 'card',
    customerName: 'Aria Chen',
    customerEmail: 'aria@chen.dev',
    description: 'Cloud Architect Certification Prep',
    createdAt: '2026-07-04 15:45',
    tax: 30.30,
    fee: 6.00
  }
];

export const mockPayouts: Payout[] = [
  {
    id: 'pay_001',
    amount: 1840.00,
    currency: 'USD',
    status: 'paid',
    recipientName: 'Dr. Sarah Jenkins',
    recipientEmail: 'sarah.j@learnflow.ai',
    gateway: 'stripe_connect',
    createdAt: '2026-07-07 09:00',
    referenceNumber: 'REF-STRIPE-94281'
  },
  {
    id: 'pay_002',
    amount: 950.00,
    currency: 'USD',
    status: 'pending',
    recipientName: 'Prof. Wei Chen',
    recipientEmail: 'wei.c@learnflow.ai',
    gateway: 'bank_transfer',
    createdAt: '2026-07-07 14:00',
    referenceNumber: 'REF-BANK-77381'
  },
  {
    id: 'pay_003',
    amount: 1200.00,
    currency: 'USD',
    status: 'failed',
    recipientName: 'Emma Watson',
    recipientEmail: 'emma@watson.co.uk',
    gateway: 'paypal',
    createdAt: '2026-07-06 11:30',
    referenceNumber: 'REF-PAYPAL-88391'
  }
];

export const mockTaxRates: TaxRate[] = [
  { id: 'tax-us', name: 'US Sales Tax (Avg)', rate: 8.5, type: 'Sales_Tax', country: 'United States', active: true },
  { id: 'tax-eu', name: 'EU VAT Standard', rate: 20.0, type: 'VAT', country: 'Germany', active: true },
  { id: 'tax-in', name: 'India GST Education', rate: 18.0, type: 'GST', country: 'India', active: true },
  { id: 'tax-uk', name: 'UK VAT standard', rate: 20.0, type: 'VAT', country: 'United Kingdom', active: false }
];
