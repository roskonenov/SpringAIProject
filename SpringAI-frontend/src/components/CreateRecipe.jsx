import React, { useState } from 'react'
import useTypingText from '../hooks/useTypingText';

const CreateRecipe = () => {
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const displayText = useTypingText(chatResponse, 25);

  const generateRecipe = async () => {
    await fetch(`http://localhost:8080/create-recipe?ingredients=${ingredients}&cuisine=${cuisine}&dietaryRestrictions=${dietaryRestrictions}`)
      .then(res => res.text())
      .then(data => { setChatResponse(data) })
      .catch(err => console.error("Error generating response : ", err));
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
            placeholder='Enter ingredients (comma seperated)'
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label htmlFor="cuisine">Cuisine</label>
          <input
            type="text"
            value={cuisine}
            placeholder='Enter preferred cuisine'
            onChange={(e) => setCuisine(e.target.value)}
          />
        </div>
        <div className='input-container'>
          <label htmlFor="dietaryRestrictions">Dietary restrictions</label>
          <input
            type="text"
            value={dietaryRestrictions}
            placeholder='Enter dietaryRestrictions'
            onChange={(e) => setDietaryRestrictions(e.target.value)}
          />
        </div>
      </div>
      <button className='sec-btn' onClick={generateRecipe}>Make recipe</button>
      {chatResponse &&
        <div className='response-container'>
          <p className='typing'>{displayText}
            <span className='cursor'>|</span>
          </p>
        </div>}
    </div>
  )
}

export default CreateRecipe