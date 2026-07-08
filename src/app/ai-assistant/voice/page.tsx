'use client';
import dynamic from 'next/dynamic';

const VoiceAssistantClient = dynamic(() => import('./VoiceAssistantClient'), { ssr: false });

export default function VoiceAssistantPage() {
  return <VoiceAssistantClient />;
}
