// @ts-nocheck
import React from 'react';
import { clsx } from 'clsx';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ComponentType<any>;
  action?: React.ReactNode;
}

export function PageHeader({ title, description, icon: Icon, action }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <Icon className="h-6 w-6 text-indigo-400" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
          {description && (
            <p className="text-sm text-gray-400 mt-1">{description}</p>
          )}
        </div>
      </div>
      {action && (
        <div className="flex-shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
