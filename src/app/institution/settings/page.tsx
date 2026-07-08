'use client';

import React from 'react';
import { PageHeader } from '@/components/institution/PageHeader';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Institution Settings" 
        description="Global configurations, roles, and API integrations."
        icon={Settings}
      />
      <div className="rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-xl p-6">
        <p className="text-gray-400">Configuration panels will go here.</p>
      </div>
    </div>
  );
}
