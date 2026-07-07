'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Send, ArrowRight } from 'lucide-react';

const quickPrompts = [
  'Explain React Server Components',
  'Give me a 5-question quiz',
  'Create my study plan',
  "What should I learn next?",
];

/**
 * AITutorCard — Compact AI tutor widget on the dashboard.
 * Shows quick-access prompts and a mini chat input.
 */
export function AITutorCard() {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    setQuery(text);
    setIsTyping(true);
    setResponse(null);

    // Simulate AI response
    await new Promise((r) => setTimeout(r, 1500));
    setIsTyping(false);
    setResponse(
      text.toLowerCase().includes('react')
        ? 'React Server Components (RSC) are components that run exclusively on the server, allowing you to fetch data directly without client-side JavaScript overhead. They reduce bundle size and improve initial page load performance.'
        : 'Great question! Based on your current progress, I recommend focusing on your Machine Learning module next. You\'re 34% through — completing 2 more lessons today would maintain your streak!'
    );
  };

  const handlePromptClick = (prompt: string) => {
    handleSend(prompt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(query);
    setQuery('');
  };

  return (
    <section
      className="card overflow-hidden p-0"
      aria-labelledby="ai-tutor-heading"
      style={{
        background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.06) 100%)',
        border: '1px solid rgba(99,102,241,0.2)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: '1px solid rgba(99,102,241,0.15)' }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(99, 102, 241, 0.2)' }}
            aria-hidden="true"
          >
            <Sparkles size={16} style={{ color: 'var(--color-primary-400)' }} />
          </div>
          <div>
            <h2
              id="ai-tutor-heading"
              className="text-sm font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              AI Tutor
            </h2>
            <p className="text-xs" style={{ color: 'var(--color-primary-400)' }}>
              38/50 queries today
            </p>
          </div>
        </div>

        {/* Quota progress */}
        <div
          className="w-20 progress-track"
          style={{ height: 4 }}
          aria-label="AI query usage: 38 of 50"
        >
          <div
            className="progress-fill primary"
            style={{ width: '76%' }}
            role="progressbar"
            aria-valuenow={38}
            aria-valuemin={0}
            aria-valuemax={50}
          />
        </div>
      </div>

      <div className="p-4">
        {/* Quick Prompts */}
        {!response && !isTyping && (
          <div className="mb-4">
            <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
              Quick prompts:
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Quick AI prompts">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handlePromptClick(prompt)}
                  className="text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-150 interactive"
                  style={{
                    background: 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    color: 'var(--color-primary-400)',
                  }}
                  aria-label={`Ask AI: ${prompt}`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* AI Response */}
        {(isTyping || response) && (
          <div
            className="mb-4 p-3 rounded-xl text-sm"
            style={{
              background: 'rgba(99, 102, 241, 0.06)',
              border: '1px solid rgba(99,102,241,0.15)',
              minHeight: 64,
            }}
            role="region"
            aria-live="polite"
            aria-label="AI Tutor response"
          >
            {isTyping ? (
              <div className="flex items-center gap-2" aria-label="AI is thinking">
                <div className="flex gap-1" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: 'var(--color-primary-400)',
                        animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                  AI is thinking…
                </span>
              </div>
            ) : (
              <>
                {query && (
                  <p className="text-xs mb-2 font-medium" style={{ color: 'var(--text-secondary)' }}>
                    You asked: "{query}"
                  </p>
                )}
                <p style={{ color: 'var(--text-primary)', lineHeight: 1.5 }}>{response}</p>
                <button
                  type="button"
                  onClick={() => { setResponse(null); setQuery(''); }}
                  className="text-xs mt-2 hover:underline"
                  style={{ color: 'var(--color-primary-400)' }}
                >
                  Ask another question
                </button>
              </>
            )}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex gap-2" aria-label="AI Tutor chat input">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about your courses…"
            className="input-field flex-1"
            style={{ minHeight: 40, fontSize: '0.875rem', padding: '8px 12px' }}
            aria-label="Type your question for the AI Tutor"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!query.trim() || isTyping}
            className="btn btn-primary flex-shrink-0"
            style={{ minHeight: 40, padding: '8px 14px' }}
            aria-label="Send question to AI Tutor"
          >
            <Send size={16} aria-hidden="true" />
          </button>
        </form>

        {/* Full AI link */}
        <Link
          href="/ai-assistant"
          className="flex items-center justify-center gap-1 mt-3 text-xs font-medium hover:underline"
          style={{ color: 'var(--color-primary-400)' }}
          aria-label="Open full AI Assistant"
        >
          Open full AI Assistant
          <ArrowRight size={12} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
