import React, { useState, useRef } from 'react';
import useTypingText from '../hooks/useTypingText';
import Spinner from './Spinner';
import { API_BASE_URL } from '../config';

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['.mp3', '.wav', '.m4a', '.ogg', '.webm', '.flac', '.aac'];

const AudioTranscriber = () => {
    const [file, setFile] = useState(null);
    const [transcribtion, setTranscribtion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [validationError, setValidationError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileSelection = (e) => {
        const selectedFile = e.target.files && e.target.files[0];
        setTranscribtion('');
        setValidationError('');

        if (!selectedFile) {
            setFile(null);
            return;
        }

        // 1. Check for empty file
        if (selectedFile.size === 0) {
            setValidationError('The selected file is empty (0 bytes). Please select a valid audio file.');
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
        }

        // 2. Check for valid audio extension and MIME type
        const fileName = selectedFile.name.toLowerCase();
        const hasValidExtension = ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext));
        const isAudioMime = selectedFile.type.startsWith('audio/') || selectedFile.type === '';

        if (!hasValidExtension && !isAudioMime) {
            setValidationError(`Invalid file format. Supported audio formats: ${ALLOWED_EXTENSIONS.join(', ')}.`);
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
        }

        // 3. Check file size limit
        if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
            const fileSizeMB = (selectedFile.size / (1024 * 1024)).toFixed(2);
            setValidationError(`File is too large (${fileSizeMB} MB). Maximum allowed size is ${MAX_FILE_SIZE_MB} MB.`);
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
        }

        setFile(selectedFile);
    };

    const displayText = useTypingText(transcribtion, 25);

    const handleFileTranscribtion = async () => {
        if (!file || isLoading) return;

        setIsLoading(true);
        setTranscribtion('');
        setValidationError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch(`${API_BASE_URL}/ai-transcribe-audio`, {
                method: 'POST',
                body: formData
            });

            if (!res.ok) {
                if (res.status === 413) {
                    throw new Error(`File exceeds server limit of ${MAX_FILE_SIZE_MB} MB.`);
                }
                throw new Error(`Server error: ${res.status}`);
            }

            const data = await res.text();
            setTranscribtion(data);
        } catch (err) {
            console.error("Error transcribe audio : ", err);
            setTranscribtion(`Failed to transcribe audio (${err.message}).`);
        } finally {
            setIsLoading(false);
        }
    };

    const fileSizeFormatted = file ? (file.size / (1024 * 1024)).toFixed(2) : 0;

    return (
        <>
            <h2>Transcribe text from Audio file</h2>
            <div className='input-container'>
                <div className='custom-file-picker'>
                    <input
                        id="audio-file-input"
                        ref={fileInputRef}
                        type="file"
                        accept="audio/*, .mp3, .wav, .m4a, .ogg, .webm, .flac, .aac"
                        onChange={handleFileSelection}
                        disabled={isLoading}
                        style={{ display: 'none' }}
                    />
                    <label
                        htmlFor="audio-file-input"
                        className={`file-picker-btn ${isLoading ? 'disabled' : ''}`}
                    >
                        Choose File
                    </label>
                    <span className='file-picker-name' title={file ? file.name : 'No file chosen'}>
                        {file ? file.name : 'No file chosen'}
                    </span>
                </div>
                <p className='audio-hint'>
                    Supported formats: MP3, WAV, M4A, OGG, WEBM, FLAC, AAC (max {MAX_FILE_SIZE_MB} MB)
                </p>
            </div>

            {validationError && (
                <div className='validation-error' role="alert">
                    ⚠️ {validationError}
                </div>
            )}

            {file && !validationError && (
                <div className='file-info'>
                    🎵 <strong>{file.name}</strong> ({fileSizeFormatted} MB)
                </div>
            )}

            <button
                className='sec-btn'
                onClick={handleFileTranscribtion}
                disabled={isLoading || !file}
            >
                {isLoading ? 'Transcribing...' : 'Transcribe file'}
            </button>

            {isLoading && <Spinner text="Transcribing audio with Whisper AI..." />}

            {!isLoading && transcribtion &&
                <div className='response-container'>
                    <p className='typing'>{displayText}
                        <span className='cursor'>|</span>
                    </p>
                </div>}
        </>
    );
};

export default AudioTranscriber;
