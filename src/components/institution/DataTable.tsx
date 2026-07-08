import React from 'react';
import { clsx } from 'clsx';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
}

export function DataTable<T extends { id: string }>({ data, columns, searchPlaceholder = "Search..." }: DataTableProps<T>) {
  return (
    <div className="rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-xl overflow-hidden flex flex-col">
      <div className="p-4 border-b border-white/10 flex items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full rounded-lg border-0 bg-white/5 py-2 pl-10 pr-3 text-sm text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:leading-6"
            placeholder={searchPlaceholder}
          />
        </div>
        <div className="flex gap-2">
          {/* Action buttons could go here */}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/5">
          <thead className="bg-white/5">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-6"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-transparent">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                {columns.map((col) => (
                  <td key={`${item.id}-${col.key}`} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-300 sm:pl-6">
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between border-t border-white/10 bg-white/5 px-4 py-3 sm:px-6 mt-auto">
        <div className="flex flex-1 justify-between sm:hidden">
          <button className="relative inline-flex items-center rounded-md border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:bg-white/5">
            Previous
          </button>
          <button className="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-gray-300 hover:bg-white/5">
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-400">
              Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">{data.length}</span> of{' '}
              <span className="font-medium text-white">{data.length}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-white/10 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button aria-current="page" className="relative z-10 inline-flex items-center bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-400 ring-1 ring-inset ring-indigo-500/50 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                1
              </button>
              <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-white/10 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
