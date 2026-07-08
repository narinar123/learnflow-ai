'use client';

import React, { useState } from 'react';
import { exportToPDF, exportToCSV, exportToExcel } from '@/lib/analytics/export-utils';

interface ExportButtonProps {
  data?: Record<string, unknown>[];
  filename?: string;
  pdfTitle?: string;
}

export function ExportButton({ data, filename = 'analytics_export', pdfTitle }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePDF = () => {
    exportToPDF(pdfTitle || 'Analytics Report');
    setIsOpen(false);
  };

  const handleCSV = () => {
    if (data) exportToCSV(data, `${filename}.csv`);
    setIsOpen(false);
  };

  const handleExcel = () => {
    if (data) exportToExcel(data, `${filename}.xls`);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left select-none z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-outline px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Export
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-1 w-36 rounded-xl border bg-card shadow-lg ring-1 ring-black/5 focus:outline-none z-50 overflow-hidden divide-y divide-border">
            <div className="py-1">
              <button
                onClick={handlePDF}
                className="w-full text-left px-4 py-2 text-xs font-semibold text-foreground hover:bg-secondary flex items-center gap-2"
              >
                <span>PDF Print</span>
              </button>
            </div>
            {data && (
              <div className="py-1">
                <button
                  onClick={handleCSV}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-foreground hover:bg-secondary flex items-center gap-2"
                >
                  <span>CSV File</span>
                </button>
                <button
                  onClick={handleExcel}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-foreground hover:bg-secondary flex items-center gap-2"
                >
                  <span>Excel Sheet</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
