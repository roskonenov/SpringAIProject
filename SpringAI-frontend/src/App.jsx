import { useState } from 'react';
import './App.css';
import AskAi from './components/AskAi';
import ImageGenerator from './components/ImageGenerator';
import CreateRecipe from './components/CreateRecipe';
import DarkModeToggler from './components/DarkModeToggler';
import AudioTranscriber from './components/AudioTranscriber';
import { FiTerminal, FiImage, FiCpu, FiMic, FiActivity } from 'react-icons/fi';

const TABS = [
  { id: 'ask-ai', label: 'Ask AI', subtitle: 'Neural Chat', icon: FiTerminal },
  { id: 'generate-image', label: 'Generate Image', subtitle: 'Diffusion Matrix', icon: FiImage },
  { id: 'create-recipe', label: 'Create Recipe', subtitle: 'Culinary AI', icon: FiCpu },
  { id: 'transcribe-audio', label: 'Audio Transcriber', subtitle: 'Whisper Decoder', icon: FiMic }
];

function App() {
  const [selectedTab, setSelectedTab] = useState('ask-ai');

  return (
    <div className="cyber-app-shell">
      {/* Background Holographic Glow Elements */}
      <div className="ambient-glow glow-top-left" aria-hidden="true" />
      <div className="ambient-glow glow-bottom-right" aria-hidden="true" />

      {/* Cybernetic Navigation Header */}
      <header className="cyber-header">
        <div className="header-brand">
          <div className="logo-badge">
            <img src="/brain.svg" alt="SpringAI Logo" className="brand-logo" />
            <span className="logo-pulse-ring"></span>
          </div>
          <div className="brand-text">
            <div className="brand-title-row">
              <h1 className="brand-title">Spring<span className="gradient-text">AI</span></h1>
              <span className="brand-version-badge">v2.0 CYBER CORE</span>
            </div>
            <p className="brand-tagline">Advanced Neural Intelligence Platform</p>
          </div>
        </div>

        <div className="header-actions">
          <div className="system-status-pill">
            <span className="status-indicator-dot"></span>
            <span className="status-text">NEURAL CORE ONLINE</span>
          </div>
          <DarkModeToggler />
        </div>
      </header>

      {/* Futuristic Segmented Tab Navigation Dock */}
      <nav className="tab-dock-container" aria-label="Feature Tabs">
        <div className="button-container tab-dock" role="tablist">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                className={`tab-btn ${isActive ? 'focus active' : ''}`}
                onClick={() => setSelectedTab(tab.id)}
                type="button"
              >
                {/* Holographic laser scanline sweep effect on active tab */}
                {isActive && <span className="tab-laser-sweep" aria-hidden="true" />}

                {/* Sci-Fi HUD Corner Brackets */}
                {isActive && (
                  <>
                    <span className="tab-bracket top-left" aria-hidden="true" />
                    <span className="tab-bracket top-right" aria-hidden="true" />
                    <span className="tab-bracket bottom-left" aria-hidden="true" />
                    <span className="tab-bracket bottom-right" aria-hidden="true" />
                  </>
                )}

                <div className="tab-content-layout">
                  <span className="tab-icon-wrapper">
                    <Icon className="tab-icon" />
                    {isActive && <span className="icon-pulse-glow" aria-hidden="true" />}
                  </span>
                  <span className="tab-text-block">
                    <span className="tab-label-row">
                      <span className="tab-label">{tab.label}</span>
                      {isActive && (
                        <span className="tab-active-badge">
                          <span className="active-dot" />
                          <span>LIVE</span>
                        </span>
                      )}
                    </span>
                    <span className="tab-subtitle">{tab.subtitle}</span>
                  </span>
                </div>
                {isActive && <span className="tab-active-indicator" />}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Interactive Stage */}
      <main className="cyber-main-stage">
        <div className="hud-card-frame">
          <div className="hud-corner top-left"></div>
          <div className="hud-corner top-right"></div>
          <div className="hud-corner bottom-left"></div>
          <div className="hud-corner bottom-right"></div>
          
          <div className="active-module-content">
            {selectedTab === 'ask-ai' && <AskAi />}
            {selectedTab === 'generate-image' && <ImageGenerator />}
            {selectedTab === 'create-recipe' && <CreateRecipe />}
            {selectedTab === 'transcribe-audio' && <AudioTranscriber />}
          </div>
        </div>
      </main>

      {/* Futuristic Status Footer */}
      <footer className="cyber-footer">
        <div className="footer-content">
          <div className="footer-left">
            <FiActivity className="footer-icon" />
            <span>SPRING AI HYPER-STACK • FULL PROTOCOL SUITE</span>
          </div>
          <div className="footer-right">
            <span>SECURE NEURAL CHANNELS // 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

