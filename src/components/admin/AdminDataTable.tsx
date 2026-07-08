'use client';

import React, { useState, useCallback } from 'react';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface AdminDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  actions?: (row: T) => React.ReactNode;
  emptyMessage?: string;
  pageSize?: number;
}

function getValue<T>(obj: T, key: string): unknown {
  return (obj as Record<string, unknown>)[key];
}

export default function AdminDataTable<T>({
  data,
  columns,
  keyField,
  searchPlaceholder = 'Search...',
  searchKeys = [],
  actions,
  emptyMessage = 'No records found.',
  pageSize = 10,
}: AdminDataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);

  const filtered = data.filter(row => {
    if (!search) return true;
    const q = search.toLowerCase();
    return searchKeys.some(k => String(getValue(row, k as string) ?? '').toLowerCase().includes(q));
  });

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const av = String(getValue(a, sortKey) ?? '');
        const bv = String(getValue(b, sortKey) ?? '');
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      })
    : filtered;

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = useCallback((key: string) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  }, [sortKey]);

  const handleSearch = (q: string) => {
    setSearch(q);
    setPage(1);
  };

  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(108,71,255,0.15)', background: 'rgba(255,255,255,0.02)' }}>
      {/* Search bar */}
      <div className="px-5 py-4 border-b flex items-center gap-4" style={{ borderColor: 'rgba(108,71,255,0.1)' }}>
        <div className="flex items-center gap-2 flex-1 max-w-xs px-3 py-2 rounded-xl border"
          style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(108,71,255,0.2)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 shrink-0">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={e => handleSearch(e.target.value)}
            className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-full"
          />
        </div>
        <span className="text-xs text-slate-400 ml-auto">
          {filtered.length} {filtered.length === 1 ? 'record' : 'records'}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(108,71,255,0.1)' }}>
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400"
                  style={{ width: col.width }}
                >
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(String(col.key))}
                      className="flex items-center gap-1 hover:text-white transition-colors"
                    >
                      {col.header}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        style={{ opacity: sortKey === String(col.key) ? 1 : 0.4 }}>
                        {sortKey === String(col.key) && sortDir === 'asc'
                          ? <path d="m18 15-6-6-6 6" />
                          : <path d="m6 9 6 6 6-6" />}
                      </svg>
                    </button>
                  ) : col.header}
                </th>
              ))}
              {actions && <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-5 py-16 text-center text-slate-500 text-sm">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paged.map((row, i) => (
                <tr
                  key={String(getValue(row, keyField as string))}
                  style={{ borderBottom: i < paged.length - 1 ? '1px solid rgba(108,71,255,0.07)' : 'none' }}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  {columns.map(col => (
                    <td key={String(col.key)} className="px-5 py-3.5 text-sm text-slate-300">
                      {col.render
                        ? col.render(getValue(row, String(col.key)), row)
                        : String(getValue(row, String(col.key)) ?? '—')}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-5 py-3.5 text-right">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-5 py-4 border-t flex items-center justify-between" style={{ borderColor: 'rgba(108,71,255,0.1)' }}>
          <p className="text-xs text-slate-400">
            Page {page} of {totalPages} · {sorted.length} total
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 border disabled:opacity-30 hover:bg-white/10 hover:text-white transition-colors"
              style={{ borderColor: 'rgba(108,71,255,0.2)' }}
            >
              ← Prev
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="w-8 h-8 rounded-lg text-xs font-medium transition-colors"
                  style={{
                    background: page === p ? '#6C47FF' : 'transparent',
                    color: page === p ? 'white' : 'rgba(148,163,184,0.7)',
                    border: page === p ? 'none' : '1px solid rgba(108,71,255,0.2)',
                  }}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 border disabled:opacity-30 hover:bg-white/10 hover:text-white transition-colors"
              style={{ borderColor: 'rgba(108,71,255,0.2)' }}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
