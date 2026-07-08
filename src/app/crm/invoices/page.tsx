'use client';

import React, { useState, useEffect } from 'react';
import { useCRM } from '../context/CRMContext';
import { Invoice } from '@/lib/crmData';

export default function InvoicesPage() {
  const { invoices, addInvoice, updateInvoiceStatus } = useCRM();
  
  const [mounted, setMounted] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [selectedInv, setSelectedInv] = useState<Invoice | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [itemPrice, setItemPrice] = useState('150000');
  const [itemQty, setItemQty] = useState('1');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update selected invoice reference if changed in context
  useEffect(() => {
    if (selectedInv) {
      const current = invoices.find(i => i.id === selectedInv.id);
      if (current) {
        setSelectedInv(current);
      } else {
        setSelectedInv(null);
      }
    }
  }, [invoices, selectedInv]);

  if (!mounted) return null;

  // Filter invoices
  const filteredInvoices = invoices.filter(inv => {
    return statusFilter === 'All' || inv.status === statusFilter;
  });

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !itemDesc) return;
    
    const amount = Number(itemPrice) * Number(itemQty);
    addInvoice({
      clientName,
      clientEmail,
      amount,
      status: 'Draft',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days due
      items: [
        {
          description: itemDesc,
          quantity: Number(itemQty),
          unitPrice: Number(itemPrice),
          total: amount
        }
      ]
    });
    setAddModalOpen(false);
    setClientName('');
    setClientEmail('');
    setItemDesc('');
    setItemPrice('150000');
    setItemQty('1');
  };

  const handleMarkPaid = (inv: Invoice) => {
    updateInvoiceStatus(inv.id, 'Paid');
    alert(`💳 Invoice ${inv.invoiceNumber} paid successfully! Payment logged to Payments Ledger.`);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto flex relative h-full">
      
      {/* ─── INVOICES LIST ─── */}
      <div className="flex-1 space-y-6 overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-white font-display">Invoices Registry</h1>
            <p className="text-slate-400 text-xs mt-1">
              Issue professional invoices, track collection volumes, and apply tax regulations.
            </p>
          </div>
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 bg-indigo-650 hover:bg-indigo-550 text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-indigo-600/10"
          >
            🧾 Create Invoice
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Bills Issued</p>
            <h4 className="text-xl font-black text-white mt-1">{invoices.length}</h4>
          </div>
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Collected</p>
            <h4 className="text-xl font-black text-emerald-400 mt-1">
              ₹{invoices.filter(i => i.status === 'Paid').reduce((s, i) => s + i.totalAmount, 0).toLocaleString('en-IN')}
            </h4>
          </div>
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Outstanding Receivables</p>
            <h4 className="text-xl font-black text-amber-400 mt-1">
              ₹{invoices.filter(i => i.status === 'Unpaid' || i.status === 'Overdue').reduce((s, i) => s + i.totalAmount, 0).toLocaleString('en-IN')}
            </h4>
          </div>
          <div className="bg-[#0A0D16] border border-slate-800/80 p-4 rounded-2xl">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Draft Volume</p>
            <h4 className="text-xl font-black text-slate-400 mt-1">
              ₹{invoices.filter(i => i.status === 'Draft').reduce((s, i) => s + i.totalAmount, 0).toLocaleString('en-IN')}
            </h4>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-[#0A0D16] border border-slate-800/60 p-4 rounded-2xl flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Billing Filter</span>
          <div className="flex bg-[#111625] p-1 border border-slate-800 rounded-xl">
            {(['All', 'Paid', 'Unpaid', 'Overdue', 'Draft'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                  ${statusFilter === tab ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#0A0D16] border border-slate-800/60 rounded-2xl overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider bg-slate-900/20">
                <th className="p-4">Invoice #</th>
                <th className="p-4">Client Name</th>
                <th className="p-4">Issue Date</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map(inv => (
                  <tr
                    key={inv.id}
                    onClick={() => setSelectedInv(inv)}
                    className="hover:bg-slate-900/30 cursor-pointer transition-colors"
                  >
                    <td className="p-4 font-mono font-bold text-indigo-400">{inv.invoiceNumber}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-bold text-slate-200">{inv.clientName}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{inv.clientEmail}</p>
                      </div>
                    </td>
                    <td className="p-4 text-slate-400">{inv.issueDate}</td>
                    <td className="p-4 font-semibold text-slate-200">₹{inv.totalAmount.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold
                        ${inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                          inv.status === 'Overdue' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          inv.status === 'Unpaid' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedInv(inv)}
                        className="px-2.5 py-1 bg-slate-850 hover:bg-slate-750 text-slate-300 hover:text-white rounded-lg transition-colors font-medium"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No invoices generated under this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── SIDE DETAIL PANEL (INVOICE SLIP) ─── */}
      {selectedInv && (
        <div className="w-80 ml-6 flex-shrink-0 bg-[#0A0D16] border border-slate-800/80 rounded-2xl p-5 space-y-5 flex flex-col h-fit animate-in slide-in-from-right duration-200">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Invoice Details</h3>
              <p className="text-[10px] text-indigo-400 font-mono mt-0.5">{selectedInv.invoiceNumber}</p>
            </div>
            <button onClick={() => setSelectedInv(null)} className="text-slate-500 hover:text-slate-300">✕ Close</button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Client</h4>
              <p className="text-sm font-bold text-slate-200 mt-1">{selectedInv.clientName}</p>
              <p className="text-[10px] text-slate-400">{selectedInv.clientEmail}</p>
            </div>

            {/* Line Items */}
            <div className="space-y-2 border-t border-slate-850 pt-3">
              <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-500">Item Summary</span>
              <div className="space-y-2">
                {selectedInv.items.map((item, idx) => (
                  <div key={idx} className="bg-[#111625]/40 border border-slate-850 p-2.5 rounded-xl text-xs space-y-1">
                    <p className="font-bold text-slate-300">{item.description}</p>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Qty: {item.quantity} · Rate: ₹{item.unitPrice.toLocaleString('en-IN')}</span>
                      <span className="font-bold text-slate-300">₹{item.total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculations details */}
            <div className="space-y-2 border-t border-slate-850 pt-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span>₹{selectedInv.amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-400 border-b border-slate-850/50 pb-2">
                <span>GST (18% standard):</span>
                <span>₹{selectedInv.taxAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm text-white font-black pt-1">
                <span>Total Amount:</span>
                <span className="text-indigo-400">₹{selectedInv.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 border-t border-slate-850 pt-3">
              {selectedInv.status !== 'Paid' && (
                <button
                  onClick={() => handleMarkPaid(selectedInv)}
                  className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-emerald-500/10"
                >
                  ✓ Record Payment
                </button>
              )}
              {selectedInv.status === 'Draft' && (
                <button
                  onClick={() => {
                    updateInvoiceStatus(selectedInv.id, 'Unpaid');
                    alert(`Invoice ${selectedInv.invoiceNumber} locked and sent to client outbox.`);
                  }}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-550 text-white font-bold rounded-xl text-xs transition-colors"
                >
                  ✉️ Finalize & Send Bill
                </button>
              )}
              <button
                onClick={() => {
                  alert(`PDF compiled successfully for ${selectedInv.invoiceNumber}. Starting system print dialog mockup.`);
                }}
                className="w-full py-2 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs transition-colors"
              >
                🖨️ Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── CREATE INVOICE DIALOG ─── */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0B0E19] border border-slate-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-800/60 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-200">🧾 Draft Invoice</h3>
              <button onClick={() => setAddModalOpen(false)} className="text-slate-500 hover:text-slate-300">✕</button>
            </div>
            <form onSubmit={handleCreateInvoice} className="p-6 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Client Billing Name *</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="E.g., Tata Consultancy Services"
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Client Email *</label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="finance@tcs.com"
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Item Description *</label>
                <input
                  type="text"
                  required
                  value={itemDesc}
                  onChange={(e) => setItemDesc(e.target.value)}
                  placeholder="E.g., 100 Annual Enterprise Subscriptions"
                  className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Unit Price (INR)</label>
                  <input
                    type="number"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Quantity</label>
                  <input
                    type="number"
                    value={itemQty}
                    onChange={(e) => setItemQty(e.target.value)}
                    className="w-full bg-[#111524] border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-855 text-slate-400 hover:text-white rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-650 hover:bg-indigo-550 text-white rounded-xl text-xs font-bold"
                >
                  Draft Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
