'use client';

import React from 'react';
import { PageHeader } from '@/components/institution/PageHeader';
import { Award } from 'lucide-react';

export default function CertificatesPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Certificates" 
        description="Design, generate, and issue digital certificates."
        icon={Award}
      />
      <div className="rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-xl p-6">
        <p className="text-gray-400">Certificate generation tools will go here.</p>
      </div>
    </div>
  );
}
