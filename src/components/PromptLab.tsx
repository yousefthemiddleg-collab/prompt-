import { useState, useRef } from 'react';
import { analyzePrompt, AI_MODELS } from '../lib/promptAnalyzer';
import { supabase } from '../lib/supabase';
import type { PromptAnalysis } from '../lib/promptAnalyzer';

export default function PromptLab() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<PromptAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleAnalyze = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setResult(null);

    const analysis = analyzePrompt(input);

    await supabase.from('prompt_submissions').insert({
      original_prompt: input,
      enhanced_prompt: analysis.enhanced_prompt,
      rating: analysis.rating,
      target_ai: analysis.target_ai,
      feedback: analysis.feedback,
    });

    setTimeout(() => {
      setResult(analysis);
      setLoading(false);
    }, 900);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.enhanced_prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRoute = () => {
    if (!result) return;
    const ai = AI_MODELS[result.target_ai as keyof typeof AI_MODELS];
    if (ai) window.open(ai.url, '_blank');
  };

  const ratingColor = (r: number) => {
    if (r >= 8) return '#22c55e';
    if (r >= 5) return '#f59e0b';
    return '#ef4444';
  };

  const ratingLabel = (r: number) => {
    if (r >= 9) return 'Excellent';
    if (r >= 7) return 'Good';
    if (r >= 5) return 'Average';
    if (r >= 3) return 'Weak';
    return 'Poor';
  };

  return (
    <section id="lab" className="lab-section">
      <div className="section-header">
        <span className="section-label">PROMPT LAB</span>
        <h2>Enhance &amp; Route Your Prompt</h2>
        <p>Paste your prompt below. We'll score it, enhance it, and route it to the ideal AI model.</p>
      </div>

      <div className="lab-container">
        <div className="input-wrapper">
          <div className="input-header">
            <span className="input-label">Your Prompt</span>
            <span className="char-count">{charCount} chars</span>
          </div>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            placeholder="Enter your prompt here... The more context you provide, the better the enhancement."
            className="prompt-textarea"
            rows={6}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleAnalyze();
            }}
          />
          <div className="input-footer">
            <span className="keyboard-hint">Ctrl+Enter to submit</span>
            <button
              className={`analyze-btn ${loading ? 'loading' : ''}`}
              onClick={handleAnalyze}
              disabled={!input.trim() || loading}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  Analyzing...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  Enhance Prompt
                </>
              )}
            </button>
          </div>
        </div>

        {result && (
          <div className="result-panel">
            <div className="result-top">
              <div className="rating-display">
                <div className="rating-circle" style={{ '--rating-color': ratingColor(result.rating) } as React.CSSProperties}>
                  <span className="rating-number">{result.rating}</span>
                  <span className="rating-denom">/10</span>
                </div>
                <div className="rating-info">
                  <span className="rating-label" style={{ color: ratingColor(result.rating) }}>
                    {ratingLabel(result.rating)}
                  </span>
                  <span className="rating-sublabel">Original score</span>
                </div>
              </div>

              <div className="ai-route">
                <span className="route-label">Recommended AI</span>
                <button className="ai-badge" onClick={handleRoute}>
                  <span
                    className="ai-dot"
                    style={{ background: AI_MODELS[result.target_ai as keyof typeof AI_MODELS]?.color }}
                  />
                  {result.target_ai}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="feedback-box">
              <div className="feedback-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <p>{result.feedback}</p>
            </div>

            <div className="enhanced-section">
              <div className="enhanced-header">
                <span className="enhanced-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  Enhanced Prompt
                </span>
                <button className="copy-btn" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="enhanced-text">{result.enhanced_prompt}</div>
            </div>

            <div className="action-row">
              <button className="route-btn primary" onClick={handleRoute}>
                Open in {result.target_ai}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button className="route-btn secondary" onClick={() => { setResult(null); setInput(''); setCharCount(0); }}>
                Try Another
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
