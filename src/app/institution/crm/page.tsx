'use client';

import React from 'react';
import { PageHeader } from '@/components/institution/PageHeader';
import { MessagesSquare } from 'lucide-react';

export default function CrmPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Student CRM" 
        description="Communication, engagement, and ticket resolution."
        icon={MessagesSquare}
      />
      <div className="rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-xl p-6">
        <p className="text-gray-400">Messaging interface and support tickets will go here.</p>
      </div>
    </div>
  );
}
