import React, { useState } from 'react';
import { FiCpu, FiCopy, FiCheck, FiSliders, FiZap } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import useTypingText from '../hooks/useTypingText';
import Spinner from './Spinner';
import { API_BASE_URL } from '../config';

const RECIPE_PRESETS = [
  {
    name: 'Cyber Salmon Bowl',
    ingredients: 'Salmon, Avocado, Brown rice, Edamame, Sesame oil',
    cuisine: 'Japanese Fusion',
    dietary: 'Gluten-Free, High-Protein'
  },
  {
    name: 'Truffle Tagliatelle',
    ingredients: 'Fresh Pasta, Truffle Oil, Wild Mushrooms, Parmesan, Garlic',
    cuisine: 'Modern Italian',
    dietary: 'Vegetarian'
  },
  {
    name: 'Neon Green Thai Curry',
    ingredients: 'Crispy Tofu, Coconut Milk, Bamboo Shoots, Thai Basil, Lime',
    cuisine: 'Thai',
    dietary: 'Vegan, Dairy-Free'
  }
];

const CreateRecipe = () => {
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const displayText = useTypingText(chatResponse, 20);

  const applyPreset = (preset) => {
    setIngredients(preset.ingredients);
    setCuisine(preset.cuisine);
    setDietaryRestrictions(preset.dietary);
  };

  const generateRecipe = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setChatResponse('');
    try {
      const res = await fetch(
        `${API_BASE_URL}/create-recipe?ingredients=${encodeURIComponent(
          ingredients
        )}&cuisine=${encodeURIComponent(cuisine)}&dietaryRestrictions=${encodeURIComponent(
          dietaryRestrictions
        )}`
      );
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const data = await res.text();
      setChatResponse(data);
    } catch (err) {
      console.error('Error generating response : ', err);
      setChatResponse(`Failed to generate recipe (${err.message}).`);
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

  return (
    <div className="cyber-view-pane">
      <div className="pane-header">
        <div className="pane-title-badge">
          <FiCpu className="pane-icon" />
          <span>MODULE // 03</span>
        </div>
        <h2>Culinary Synthesis Matrix</h2>
        <p className="pane-subtitle">Multi-parameter gastronomic algorithmic generation via Spring AI</p>
      </div>

      <div className="cyber-recipe-form-card">
        <div className="preset-bar">
          <span className="preset-label">
            <HiSparkles /> Quick Matrix Presets:
          </span>
          <div className="chips-container">
            {RECIPE_PRESETS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                className="suggestion-chip"
                onClick={() => applyPreset(p)}
                disabled={isLoading}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="form-grid">
          <div className="cyber-form-group">
            <label htmlFor="ingredients" className="cyber-label">
              <span className="label-code">[PARAM_01]</span> Raw Ingredients
            </label>
            <input
              id="ingredients"
              className="cyber-input"
              type="text"
              value={ingredients}
              placeholder="e.g. Chicken breast, rosemary, garlic, olive oil"
              onChange={(e) => setIngredients(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="cyber-form-group">
            <label htmlFor="cuisine" className="cyber-label">
              <span className="label-code">[PARAM_02]</span> Target Cuisine
            </label>
            <input
              id="cuisine"
              className="cyber-input"
              type="text"
              value={cuisine}
              placeholder="e.g. Mediterranean, Japanese, Fusion"
              onChange={(e) => setCuisine(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="cyber-form-group">
            <label htmlFor="dietaryRestrictions" className="cyber-label">
              <span className="label-code">[PARAM_03]</span> Dietary Constraints
            </label>
            <input
              id="dietaryRestrictions"
              className="cyber-input"
              type="text"
              value={dietaryRestrictions}
              placeholder="e.g. Keto, Gluten-Free, Low-Sodium"
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="form-action-bar">
          <button
            className="sec-btn cyber-action-btn primary-glow"
            onClick={generateRecipe}
            disabled={isLoading || (!ingredients.trim() && !cuisine.trim())}
          >
            <FiZap className="btn-icon" />
            <span>{isLoading ? 'Synthesizing Formula...' : 'Synthesize Recipe Matrix'}</span>
          </button>
        </div>
      </div>

      {isLoading && <Spinner text="Neural culinary synthesis in progress..." />}

      {!isLoading && chatResponse && (
        <div className="response-container cyber-terminal-panel">
          <div className="terminal-header">
            <div className="terminal-controls">
              <span className="dot dot-cyan"></span>
              <span className="dot dot-emerald"></span>
              <span className="dot dot-blue"></span>
              <span className="terminal-title">FORMULA // SYNTHESIS RESULT</span>
            </div>
            <button
              className="terminal-copy-btn"
              onClick={handleCopy}
              title="Copy recipe"
            >
              {copied ? (
                <>
                  <FiCheck className="copy-icon active" /> Copied
                </>
              ) : (
                <>
                  <FiCopy className="copy-icon" /> Copy Formula
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

export default CreateRecipe;

