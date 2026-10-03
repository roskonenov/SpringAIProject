import React, { useState } from 'react'
import useTypingText from '../hooks/useTypingText';
import Spinner from './Spinner';
import { API_BASE_URL } from '../config';

const AskAi = () => {
    const [prompt, setPrompt] = useState('');
    const [chatResponse, setChatResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const askAi = async () => {
        if (!prompt.trim() || isLoading) return;
        setIsLoading(true);
        setChatResponse('');
        try {
            const res = await fetch(`${API_BASE_URL}/ask-ai-options?prompt=${encodeURIComponent(prompt)}`);
            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }
            const data = await res.text();
            setChatResponse(data);
        } catch (err) {
            console.error("Error generating response : ", err);
            setChatResponse(`Failed to connect to AI server (${err.message}).`);
        } finally {
            setIsLoading(false);
        }
    };

    const displayText = useTypingText(chatResponse, 25);
    return (
        <div>
            <h2>Talk to AI</h2>
            <div className='input-container'>
                <input type="text"
                    placeholder='Enter your prompt to AI'
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && askAi()}
                    disabled={isLoading}
                />
                <button className='sec-btn' onClick={askAi} disabled={isLoading}>
                    {isLoading ? 'Thinking...' : 'Ask AI'}
                </button>
            </div>
            {isLoading && <Spinner text="AI is thinking..." />}
            {!isLoading && chatResponse &&
                <div className='response-container'>
                    <p className='typing'>{displayText}
                        <span className='cursor'>|</span>
                    </p>
                </div>}
        </div>
    )
}

export default AskAi
