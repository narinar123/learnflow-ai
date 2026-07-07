'use client';

import React, { useState, useMemo } from 'react';

export interface Column<T = Record<string, unknown>> {
  header: string;
  accessor: keyof T | string;
  render?: (value: unknown, row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  onRowClick?: (row: T) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  actions?: (row: T) => React.ReactNode;
  selectable?: boolean;
  rowsPerPageOptions?: number[];
  className?: string;
}

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="skeleton-wave h-4 rounded-md" style={{ width: `${60 + Math.random() * 30}%` }} />
        </td>
      ))}
    </tr>
  );
}

export function DataTable<T extends Record<string, unknown>>({
  columns, data, isLoading = false, emptyMessage = 'No records found', emptyIcon,
  onRowClick, searchable = true, searchPlaceholder = 'Search...', actions,
  selectable = false, rowsPerPageOptions = [10, 25, 50], className = '',
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(rowsPerPageOptions[0]);

  const filtered = useMemo(() => {
    let d = data;
    if (search.trim()) {
      const q = search.toLowerCase();
      d = d.filter(row =>
        columns.some(col => {
          const val = row[col.accessor as keyof T];
          return String(val ?? '').toLowerCase().includes(q);
        })
      );
    }
    if (sortCol) {
      d = [...d].sort((a, b) => {
        const av = a[sortCol as keyof T] ?? '';
        const bv = b[sortCol as keyof T] ?? '';
        const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return d;
  }, [data, search, sortCol, sortDir, columns]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleSort = (accessor: string, sortable?: boolean) => {
    if (!sortable) return;
    if (sortCol === accessor) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(accessor); setSortDir('asc'); }
  };

  const toggleAll = () => {
    if (selected.size === paged.length) setSelected(new Set());
    else setSelected(new Set(paged.map((_, i) => (page - 1) * perPage + i)));
  };

  const toggleRow = (idx: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  const allCols = actions ? [...columns, { header: 'Actions', accessor: '__actions__' as keyof T }] : columns;

  return (
    <div className={`card-base overflow-hidden ${className}`}>
      {/* Search */}
      {searchable && (
        <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="relative max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder={searchPlaceholder}
              className="input-field pl-9 py-2 text-sm"
              aria-label="Search table"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm" role="grid">
          <thead>
            <tr style={{ background: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>
              {selectable && (
                <th className="px-4 py-3 w-10">
                  <input type="checkbox" checked={selected.size === paged.length && paged.length > 0} onChange={toggleAll} className="rounded" aria-label="Select all" />
                </th>
              )}
              {allCols.map(col => (
                <th
                  key={String(col.accessor)}
                  className={`px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide ${col.sortable ? 'cursor-pointer select-none hover:text-primary' : ''}`}
                  style={{ color: 'var(--muted-foreground)', width: col.width }}
                  onClick={() => toggleSort(String(col.accessor), col.sortable)}
                  role={col.sortable ? 'columnheader' : undefined}
                  aria-sort={sortCol === String(col.accessor) ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined}
                >
                  <span className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && sortCol === String(col.accessor) && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        {sortDir === 'asc' ? <polyline points="18 15 12 9 6 15" /> : <polyline points="6 9 12 15 18 9" />}
                      </svg>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={allCols.length + (selectable ? 1 : 0)} />)
              : paged.length === 0
              ? (
                <tr>
                  <td colSpan={allCols.length + (selectable ? 1 : 0)} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-3" style={{ color: 'var(--muted-foreground)' }}>
                      {emptyIcon ?? (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      )}
                      <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{emptyMessage}</p>
                    </div>
                  </td>
                </tr>
              )
              : paged.map((row, ri) => {
                const absIdx = (page - 1) * perPage + ri;
                return (
                  <tr
                    key={ri}
                    className={`border-t transition-colors ${onRowClick ? 'cursor-pointer hover:bg-muted/50' : ''} ${selected.has(absIdx) ? 'bg-primary/5' : ''}`}
                    style={{ borderColor: 'var(--border)' }}
                    onClick={() => onRowClick?.(row)}
                    role={onRowClick ? 'button' : undefined}
                    tabIndex={onRowClick ? 0 : undefined}
                    onKeyDown={e => { if (onRowClick && (e.key === 'Enter' || e.key === ' ')) onRowClick(row); }}
                  >
                    {selectable && (
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                        <input type="checkbox" checked={selected.has(absIdx)} onChange={() => toggleRow(absIdx)} className="rounded" aria-label={`Select row ${ri + 1}`} />
                      </td>
                    )}
                    {columns.map(col => (
                      <td key={String(col.accessor)} className="px-4 py-3" style={{ color: 'var(--foreground)' }}>
                        {col.render
                          ? col.render(row[col.accessor as keyof T], row)
                          : String(row[col.accessor as keyof T] ?? '—')}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                        {actions(row)}
                      </td>
                    )}
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isLoading && filtered.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 border-t text-sm" style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={perPage}
              onChange={e => { setPerPage(Number(e.target.value)); setPage(1); }}
              className="input-field py-1 px-2 text-xs w-16"
              aria-label="Rows per page"
            >
              {rowsPerPageOptions.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <span>{(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</span>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-ghost p-1.5 disabled:opacity-40" aria-label="Previous page">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="btn-ghost p-1.5 disabled:opacity-40" aria-label="Next page">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
