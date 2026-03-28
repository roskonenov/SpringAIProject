import React, { useState } from 'react'
import useTypingText from '../hooks/useTypingText';

const AudioTranscriber = () => {
    const [file, setFile] = useState(null);
    const [transcribtion, setTranscribtion] = useState('');

    const handleFileSelection = (e) => {
        setFile(e.target.files[0]);
    }

    const displayText = useTypingText(transcribtion, 25);

    const handleFileTranscribtion = async () => {
        if(!file || !file.type.startsWith('audio/')) return;

        const formData = new FormData();
        formData.append('file', file)

     await fetch('http://localhost:8080/ai-transcribe-audio', {
        method: 'POST',
        body: formData
     }).then(res => res.json())
     .then(data => setTranscribtion(data.text))
     .catch(err => console.error("Error transcribe audio : ", err));

    }
    return (
        <>
            <h2>Transcribe text from Audio file</h2>
            <div className='input-container'>

                <input
                    type="file"
                    accept='audio/*'
                    onChange={handleFileSelection}
                />

            </div>
            <button className='sec-btn' onClick={handleFileTranscribtion}>Transcribe file</button>
            {transcribtion &&
                <div className='response-container'>
                    <p className='typing'>{displayText}
                        <span className='cursor'>|</span>
                    </p>
                </div>}
        </>
    )
}

export default AudioTranscriber