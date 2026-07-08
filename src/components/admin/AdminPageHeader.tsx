import React from 'react';

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  badgeColor?: string;
  actions?: React.ReactNode;
}

export default function AdminPageHeader({ title, description, badge, badgeColor = 'bg-primary/15 text-primary', actions }: AdminPageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {badge && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`}>{badge}</span>
          )}
        </div>
        {description && <p className="text-sm text-slate-400">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
}
