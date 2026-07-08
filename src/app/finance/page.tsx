'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FinanceIndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/finance/dashboard');
  }, [router]);

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-semibold text-muted-foreground animate-pulse">
          Loading Finance Dashboard...
        </span>
      </div>
    </div>
  );
}
