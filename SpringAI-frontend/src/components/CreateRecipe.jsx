import React, { useState } from 'react'
import useTypingText from '../hooks/useTypingText';
import Spinner from './Spinner';
import { API_BASE_URL } from '../config';

const CreateRecipe = () => {
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const displayText = useTypingText(chatResponse, 25);

  const generateRecipe = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setChatResponse('');
    try {
      const res = await fetch(`${API_BASE_URL}/create-recipe?ingredients=${encodeURIComponent(ingredients)}&cuisine=${encodeURIComponent(cuisine)}&dietaryRestrictions=${encodeURIComponent(dietaryRestrictions)}`);
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const data = await res.text();
      setChatResponse(data);
    } catch (err) {
      console.error("Error generating response : ", err);
      setChatResponse(`Failed to generate recipe (${err.message}).`);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <div>
        <h2>CreateRecipe</h2>
        <div className='input-container'>
          <label htmlFor="ingredients">Ingredients</label>
          <input
            id='ingredients'
            type="text"
            value={ingredients}
            placeholder='Enter ingredients (comma separated)'
            onChange={(e) => setIngredients(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className='input-container'>
          <label htmlFor="cuisine">Cuisine</label>
          <input
            type="text"
            value={cuisine}
            placeholder='Enter preferred cuisine'
            onChange={(e) => setCuisine(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className='input-container'>
          <label htmlFor="dietaryRestrictions">Dietary restrictions</label>
          <input
            type="text"
            value={dietaryRestrictions}
            placeholder='Enter dietary restrictions'
            onChange={(e) => setDietaryRestrictions(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>
      <button className='sec-btn' onClick={generateRecipe} disabled={isLoading}>
        {isLoading ? 'Creating Recipe...' : 'Make recipe'}
      </button>
      {isLoading && <Spinner text="Cooking up your recipe..." />}
      {!isLoading && chatResponse &&
        <div className='response-container'>
          <p className='typing'>{displayText}
            <span className='cursor'>|</span>
          </p>
        </div>}
    </div>
  )
}

export default CreateRecipe
