// @ts-nocheck
import React from 'react';
import { clsx } from 'clsx';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, trendUp, className }: StatCardProps) {
  return (
    <div className={clsx(
      "relative overflow-hidden rounded-2xl bg-gray-900/40 border border-white/5 p-6 backdrop-blur-sm",
      "hover:bg-gray-800/60 transition-all duration-300 group",
      className
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 group-hover:bg-indigo-500/10 transition-colors">
          <Icon className="h-6 w-6 text-indigo-400 group-hover:text-indigo-300" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className={clsx("font-medium", trendUp ? "text-emerald-400" : "text-rose-400")}>
            {trendUp ? '+' : '-'}{trend}
          </span>
          <span className="ml-2 text-gray-500">vs last month</span>
        </div>
      )}
      
      {/* Decorative gradient blob */}
      <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-indigo-500/10 blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
    </div>
  );
}
