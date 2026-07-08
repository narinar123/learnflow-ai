'use client';

import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';

export default function PaymentsPage() {
  const { payments } = useCRM();
  const [mounted, setMounted] = useState(false);
  const [gatewayFilter, setGatewayFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Filter payments
  const filteredPayments = payments.filter(pay => {
    const matchesGateway = gatewayFilter === 'All' || pay.gateway === gatewayFilter;
    const matchesStatus = statusFilter === 'All' || pay.status === statusFilter;
    return matchesGateway && matchesStatus;
  });

  // Calculate MRR/ARR indicators based on paid enterprise contracts
  const totalRevenueSecured = payments
    .filter(p => p.status === 'Success')
    .reduce((sum, p) => sum + p.amount, 0);

  const averageContractValue = payments.length > 0 ? totalRevenueSecured / payments.filter(p => p.status === 'Success').length : 0;
  
  // Simulated MRR (Total Secured Revenue divided by 12 months placeholder + retail subscription estimation)
  const mrr = Math.round((totalRevenueSecured / 12) + 245000);
  const arr = mrr * 12;

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-white font-display">Payments Ledger</h1>
        <p className="text-slate-400 text-xs mt-1">
          Monitor transactional payments, subscription billing collections, and payment gateway logs.
        </p>
      </div>

      {/* Financial Indicators */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Sales Cleared</p>
          <h4 className="text-xl font-black text-emerald-400 mt-1">₹{totalRevenueSecured.toLocaleString('en-IN')}</h4>
        </div>
        <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Estimated MRR</p>
          <h4 className="text-xl font-black text-white mt-1">₹{mrr.toLocaleString('en-IN')}</h4>
        </div>
        <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Estimated ARR</p>
          <h4 className="text-xl font-black text-white mt-1">₹{arr.toLocaleString('en-IN')}</h4>
        </div>
        <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Avg Contract Value</p>
          <h4 className="text-xl font-black text-indigo-400 mt-1">₹{Math.round(averageContractValue).toLocaleString('en-IN')}</h4>
        </div>
      </div>

      {/* Filter panel */}
      <div className="bg-[#0A0D16] border border-slate-800/60 p-4 rounded-2xl flex flex-wrap gap-4 items-center">
        
        {/* Gateway filter */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Gateway:</span>
          <select
            value={gatewayFilter}
            onChange={(e) => setGatewayFilter(e.target.value)}
            className="bg-[#111625] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">All Gateways</option>
            <option value="Razorpay">Razorpay</option>
            <option value="Stripe">Stripe</option>
          </select>
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#111625] border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

      </div>

      {/* Payments Table */}
      <div className="bg-[#0A0D16] border border-slate-800/60 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider bg-slate-900/20">
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Gateway</th>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Cleared Amount</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850">
            {filteredPayments.map(pay => (
              <tr key={pay.id} className="hover:bg-slate-900/30 transition-colors">
                <td className="p-4 font-mono text-indigo-400 font-semibold">{pay.transactionId}</td>
                <td className="p-4 font-bold text-slate-200">{pay.customerName}</td>
                <td className="p-4 text-slate-300">{pay.gateway}</td>
                <td className="p-4 text-slate-400">{new Date(pay.timestamp).toLocaleString()}</td>
                <td className="p-4 font-semibold text-slate-200">₹{pay.amount.toLocaleString('en-IN')}</td>
                <td className="p-4">
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold
                    ${pay.status === 'Success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                      pay.status === 'Failed' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                    {pay.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
