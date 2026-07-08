// @ts-nocheck
'use client';
export const dynamic = 'force-dynamic';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Play, Square, Sparkles } from 'lucide-react';
import { AppLayout } from '@/components/ui/AppLayout';
import { useChat } from '@ai-sdk/react';
import { toast } from 'sonner';

export default function VoiceTutorPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const { messages, append, isLoading } = useChat({
    api: '/api/ai/chat',
    onFinish: async (message) => {
      // When AI finishes text response, convert to speech
      try {
        const res = await fetch('/api/ai/voice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: message.content }),
        });
        
        if (res.ok) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          if (audioRef.current) {
            audioRef.current.src = url;
            audioRef.current.play();
            setIsPlaying(true);
          }
        }
      } catch (err) {
        toast.error('Failed to generate speech');
      }
    }
  });

  // Basic Web Speech API for Speech-to-Text
  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Speech recognition not supported in this browser.');
      return;
    }
    
    setIsRecording(true);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      append({ role: 'user', content: transcript });
      setIsRecording(false);
    };
    
    recognition.onerror = () => {
      setIsRecording(false);
      toast.error('Error during speech recognition.');
    };
    
    recognition.onend = () => {
      setIsRecording(false);
    };
    
    recognition.start();
  };

  return (
    <AppLayout>
      <div className="animate-fade-in max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-100px)] flex flex-col">
        
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
            <Mic size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Voice Tutor</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Talk to your AI tutor naturally</p>
          </div>
        </div>

        <div className="flex-1 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
          
          {/* Audio Element */}
          <audio 
            ref={audioRef} 
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            className="hidden" 
          />

          {/* Visualizer Rings */}
          <div className="relative flex items-center justify-center w-64 h-64 mb-12">
            <div className={`absolute inset-0 border-2 border-indigo-500/20 rounded-full transition-transform duration-700 ${isPlaying || isRecording ? 'scale-150 opacity-0 animate-ping' : 'scale-100 opacity-100'}`} />
            <div className={`absolute inset-4 border-2 border-purple-500/30 rounded-full transition-transform duration-700 delay-150 ${isPlaying || isRecording ? 'scale-125 opacity-0 animate-ping' : 'scale-100 opacity-100'}`} />
            <div className={`absolute inset-8 border-2 border-pink-500/40 rounded-full transition-transform duration-700 delay-300 ${isPlaying || isRecording ? 'scale-110 opacity-0 animate-ping' : 'scale-100 opacity-100'}`} />
            
            <div className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/20 transition-colors duration-500 ${
              isRecording ? 'bg-red-500' : isPlaying ? 'bg-indigo-500' : 'bg-[var(--bg-surface-2)] border border-[var(--border-color)]'
            }`}>
              {isRecording ? (
                <Mic size={40} className="text-white animate-pulse" />
              ) : isPlaying ? (
                <Sparkles size={40} className="text-white animate-spin-slow" />
              ) : (
                <Mic size={40} className="text-[var(--text-secondary)]" />
              )}
            </div>
          </div>

          <div className="text-center space-y-4 max-w-lg mb-12">
            <h2 className="text-xl font-semibold text-[var(--text-primary)]">
              {isRecording ? "Listening..." : isLoading ? "Thinking..." : isPlaying ? "Speaking..." : "Tap to speak"}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] h-10">
              {messages.length > 0 ? messages[messages.length - 1].content.substring(0, 100) + '...' : "I'm ready to help you learn. Try asking about a topic you're struggling with."}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={startRecording}
              disabled={isRecording || isLoading || isPlaying}
              className="flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mic size={20} />
              Start Speaking
            </button>
            {isPlaying && (
              <button
                onClick={() => {
                  audioRef.current?.pause();
                  setIsPlaying(false);
                }}
                className="flex items-center gap-2 px-8 py-4 bg-[var(--bg-surface-2)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-red-500/50 rounded-full font-semibold transition-all"
              >
                <Square size={20} className="text-red-400" />
                Stop Audio
              </button>
            )}
          </div>

        </div>

      </div>
    </AppLayout>
  );
}
