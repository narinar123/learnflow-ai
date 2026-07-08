'use client';

import React from 'react';
import { PageHeader } from '@/components/institution/PageHeader';
import { Building2 } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Institution Profile" 
        description="Manage the main details of the institution."
        icon={Building2}
      />
      <div className="rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-xl p-6">
        <p className="text-gray-400">Settings and general information will go here.</p>
      </div>
    </div>
  );
}
