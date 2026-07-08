'use client';
import dynamic from 'next/dynamic';

const CareerCoachClient = dynamic(() => import('./CareerCoachClient'), { ssr: false });

export default function CareerCoachPage() {
  return <CareerCoachClient />;
}
