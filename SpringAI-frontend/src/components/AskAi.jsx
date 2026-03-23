import React, { useState } from 'react'
import useTypingText from '../hooks/useTypingText';

const AskAi = () => {
    const [prompt, setPrompt] = useState('');
    const [chatResponse, setChatResponse] = useState('');

    const askAi = async () => {
        await fetch(`http://localhost:8080/ask-ai-options?prompt=${prompt}`)
            .then(res => res.text())
            .then(data => { setChatResponse(data) })
            .catch(err => console.error("Error generating response : ", err));
    };

    const displayText = useTypingText(chatResponse, 25);
    return (
        <div>
            <h2>Talk to AI</h2>
            <input type="text"
                placeholder='Enter your prompt to AI'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button className='sec-btn' onClick={askAi}>Ask AI</button>
            {chatResponse &&
                <div className='response-container'>
                    <p className='typing'>{displayText}
                    <span className='cursor'>|</span>
                    </p>
                </div>}
        </div>
    )
}

export default AskAi