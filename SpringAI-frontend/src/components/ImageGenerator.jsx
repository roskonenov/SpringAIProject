import { useState } from 'react';
import { FiImage, FiZap, FiExternalLink, FiAlertTriangle } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import Spinner from './Spinner';
import { API_BASE_URL } from '../config';

const IMAGE_SUGGESTIONS = [
  'Cyberpunk neon metropolis at rain dusk',
  'Bioluminescent quantum android in crystalline forest',
  'Futuristic holographic AI core glowing in deep space'
];

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const generateImage = async (overridePrompt) => {
    const textToQuery = typeof overridePrompt === 'string' ? overridePrompt : prompt;
    if (!textToQuery.trim() || isLoading) return;

    if (typeof overridePrompt === 'string') {
      setPrompt(overridePrompt);
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch(
        `${API_BASE_URL}/generate-image?prompt=${encodeURIComponent(textToQuery)}&n=2&height=512&width=512`
      );
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const data = await res.json();
      setImageUrls(data);
    } catch (err) {
      console.error('Error generating image : ', err);
      setErrorMessage(`Failed to generate image (${err.message}).`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="cyber-view-pane">
      <div className="pane-header">
        <div className="pane-title-badge">
          <FiImage className="pane-icon" />
          <span>MODULE // 02</span>
        </div>
        <h2>Visual Neural Synthesis</h2>
        <p className="pane-subtitle">Generate high-dimensional synthetic visual artifacts using Spring AI Image Engine</p>
      </div>

      <div className="input-container cyber-input-card">
        <div className="cyber-input-wrapper">
          <span className="terminal-prefix">&gt;🎨</span>
          <input
            type="text"
            className="cyber-input"
            value={prompt}
            placeholder="Describe visual concept for synthetic diffusion..."
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generateImage()}
            disabled={isLoading}
          />
          <button
            className="sec-btn cyber-action-btn"
            onClick={() => generateImage()}
            disabled={isLoading || !prompt.trim()}
          >
            <FiZap className="btn-icon" />
            <span>{isLoading ? 'Synthesizing...' : 'Synthesize'}</span>
          </button>
        </div>

        <div className="prompt-suggestions">
          <span className="suggestions-label">
            <HiSparkles /> Visual Seeds:
          </span>
          <div className="chips-container">
            {IMAGE_SUGGESTIONS.map((item, index) => (
              <button
                key={index}
                type="button"
                className="suggestion-chip"
                onClick={() => generateImage(item)}
                disabled={isLoading}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading && <Spinner text="Neural diffusion lattice synthesizing visual artifacts..." />}

      {errorMessage && (
        <div className="validation-error cyber-alert-card" role="alert">
          <FiAlertTriangle className="alert-icon" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="image-container cyber-gallery-grid">
        {imageUrls.map((url, index) => (
          <a
            href={url}
            key={index}
            target="_blank"
            rel="noreferrer"
            className="cyber-image-card"
          >
            <img src={url} alt={`Generated Neural Artifact ${index + 1}`} />
            <div className="image-overlay">
              <span className="image-overlay-pill">
                <FiExternalLink /> Expand Artifact
              </span>
            </div>
          </a>
        ))}
        {[...Array(Math.max(0, 4 - imageUrls.length))].map((_, index) => (
          <div key={imageUrls.length + index} className="empty-slot cyber-empty-slot">
            <div className="slot-corner top-left">+</div>
            <div className="slot-corner top-right">+</div>
            <div className="slot-corner bottom-left">+</div>
            <div className="slot-corner bottom-right">+</div>
            <div className="slot-content">
              <span className="slot-code">MATRIX_NODE_{imageUrls.length + index + 1}</span>
              <span className="slot-text">Awaiting Render</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGenerator;

