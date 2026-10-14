import React, { useState } from 'react';
import { FiSend, FiTerminal, FiCopy, FiCheck } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import useTypingText from '../hooks/useTypingText';
import Spinner from './Spinner';
import { API_BASE_URL } from '../config';

const SUGGESTIONS = [
  'Explain Quantum Computing in simple terms',
  'Design a high-scale microservices architecture',
  'Write a cyberpunk science-fiction scenario'
];

const AskAi = () => {
  const [prompt, setPrompt] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const askAi = async (overridePrompt) => {
    const textToQuery = typeof overridePrompt === 'string' ? overridePrompt : prompt;
    if (!textToQuery.trim() || isLoading) return;

    if (typeof overridePrompt === 'string') {
      setPrompt(overridePrompt);
    }

    setIsLoading(true);
    setChatResponse('');
    try {
      const res = await fetch(`${API_BASE_URL}/ask-ai-options?prompt=${encodeURIComponent(textToQuery)}`);
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const data = await res.text();
      setChatResponse(data);
    } catch (err) {
      console.error('Error generating response : ', err);
      setChatResponse(`Failed to connect to AI server (${err.message}).`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!chatResponse) return;
    navigator.clipboard.writeText(chatResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayText = useTypingText(chatResponse, 20);

  return (
    <div className="cyber-view-pane">
      <div className="pane-header">
        <div className="pane-title-badge">
          <FiTerminal className="pane-icon" />
          <span>MODULE // 01</span>
        </div>
        <h2>Neural Conversational Core</h2>
        <p className="pane-subtitle">Direct high-throughput neural stream interface with Spring AI backend</p>
      </div>

      <div className="input-container cyber-input-card">
        <div className="cyber-input-wrapper">
          <span className="terminal-prefix">&gt;_</span>
          <input
            type="text"
            className="cyber-input"
            placeholder="Type your inquiry to the neural core..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && askAi()}
            disabled={isLoading}
          />
          <button
            className="sec-btn cyber-action-btn"
            onClick={() => askAi()}
            disabled={isLoading || !prompt.trim()}
          >
            <FiSend className="btn-icon" />
            <span>{isLoading ? 'Processing...' : 'Execute'}</span>
          </button>
        </div>

        <div className="prompt-suggestions">
          <span className="suggestions-label">
            <HiSparkles /> Quick Inquiries:
          </span>
          <div className="chips-container">
            {SUGGESTIONS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                className="suggestion-chip"
                onClick={() => askAi(item)}
                disabled={isLoading}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading && <Spinner text="Neural network synthesizing output..." />}

      {!isLoading && chatResponse && (
        <div className="response-container cyber-terminal-panel">
          <div className="terminal-header">
            <div className="terminal-controls">
              <span className="dot dot-cyan"></span>
              <span className="dot dot-emerald"></span>
              <span className="dot dot-blue"></span>
              <span className="terminal-title">OUTPUT // NEURAL STREAM</span>
            </div>
            <button
              className="terminal-copy-btn"
              onClick={handleCopy}
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <FiCheck className="copy-icon active" /> Copied
                </>
              ) : (
                <>
                  <FiCopy className="copy-icon" /> Copy Stream
                </>
              )}
            </button>
          </div>
          <div className="terminal-body">
            <p className="typing">
              {displayText}
              <span className="cursor">█</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AskAi;

