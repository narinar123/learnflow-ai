'use client';
import dynamic from 'next/dynamic';

const MockInterviewClient = dynamic(() => import('./MockInterviewClient'), { ssr: false });

export default function MockInterviewPage() {
  return <MockInterviewClient />;
}

