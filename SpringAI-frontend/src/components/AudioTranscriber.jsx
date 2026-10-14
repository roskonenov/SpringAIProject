import React, { useState, useRef } from 'react';
import {
  FiMic,
  FiUploadCloud,
  FiFileText,
  FiCheckCircle,
  FiAlertTriangle,
  FiCopy,
  FiCheck,
  FiZap,
  FiMusic
} from 'react-icons/fi';
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
  const [isDragOver, setIsDragOver] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const validateAndSetFile = (selectedFile) => {
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
    const hasValidExtension = ALLOWED_EXTENSIONS.some((ext) => fileName.endsWith(ext));
    const isAudioMime = selectedFile.type.startsWith('audio/') || selectedFile.type === '';

    if (!hasValidExtension && !isAudioMime) {
      setValidationError(
        `Invalid file format. Supported audio formats: ${ALLOWED_EXTENSIONS.join(', ')}.`
      );
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // 3. Check file size limit
    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      const fileSizeMB = (selectedFile.size / (1024 * 1024)).toFixed(2);
      setValidationError(
        `File is too large (${fileSizeMB} MB). Maximum allowed size is ${MAX_FILE_SIZE_MB} MB.`
      );
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setFile(selectedFile);
  };

  const handleFileSelection = (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const displayText = useTypingText(transcribtion, 20);

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
      console.error('Error transcribe audio : ', err);
      setTranscribtion(`Failed to transcribe audio (${err.message}).`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!transcribtion) return;
    navigator.clipboard.writeText(transcribtion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fileSizeFormatted = file ? (file.size / (1024 * 1024)).toFixed(2) : 0;

  return (
    <div className="cyber-view-pane">
      <div className="pane-header">
        <div className="pane-title-badge">
          <FiMic className="pane-icon" />
          <span>MODULE // 04</span>
        </div>
        <h2>Whisper Neural Audio Decoder</h2>
        <p className="pane-subtitle">Direct acoustic-to-text neural transcription powered by Spring AI Whisper</p>
      </div>

      <div className="cyber-upload-card">
        <div
          className={`cyber-dropzone ${isDragOver ? 'drag-over' : ''} ${file ? 'has-file' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <input
            id="audio-file-input"
            ref={fileInputRef}
            type="file"
            accept="audio/*, .mp3, .wav, .m4a, .ogg, .webm, .flac, .aac"
            onChange={handleFileSelection}
            disabled={isLoading}
            style={{ display: 'none' }}
          />

          <div className="dropzone-inner">
            <div className="upload-icon-halo">
              <FiUploadCloud className="upload-icon" />
            </div>
            <h3 className="dropzone-heading">
              {file ? 'Replace audio payload' : 'Drop acoustic payload here'}
            </h3>
            <p className="dropzone-sub">
              or <span className="browse-link">browse system directories</span>
            </p>
            <div className="audio-tags-list">
              {['MP3', 'WAV', 'M4A', 'OGG', 'FLAC', 'AAC'].map((fmt) => (
                <span key={fmt} className="audio-fmt-badge">
                  {fmt}
                </span>
              ))}
              <span className="max-size-pill">MAX {MAX_FILE_SIZE_MB}MB</span>
            </div>
          </div>
        </div>

        {validationError && (
          <div className="validation-error cyber-alert-card" role="alert">
            <FiAlertTriangle className="alert-icon" />
            <span>{validationError}</span>
          </div>
        )}

        {file && !validationError && (
          <div className="file-info cyber-file-badge">
            <div className="file-badge-left">
              <FiMusic className="file-badge-icon" />
              <div className="file-badge-details">
                <span className="file-badge-name" title={file.name}>
                  {file.name}
                </span>
                <span className="file-badge-meta">
                  Payload Size: {fileSizeFormatted} MB • Ready for inference
                </span>
              </div>
            </div>
            <FiCheckCircle className="file-ready-icon" />
          </div>
        )}

        <div className="upload-actions">
          <button
            className="sec-btn cyber-action-btn primary-glow"
            onClick={handleFileTranscribtion}
            disabled={isLoading || !file}
          >
            <FiZap className="btn-icon" />
            <span>{isLoading ? 'Decoupling & Transcribing...' : 'Decode Audio Stream'}</span>
          </button>
        </div>
      </div>

      {isLoading && <Spinner text="Neural Whisper model processing acoustic tensors..." />}

      {!isLoading && transcribtion && (
        <div className="response-container cyber-terminal-panel">
          <div className="terminal-header">
            <div className="terminal-controls">
              <span className="dot dot-cyan"></span>
              <span className="dot dot-emerald"></span>
              <span className="dot dot-blue"></span>
              <span className="terminal-title">TRANSCRIPTION // STREAM RESULT</span>
            </div>
            <button
              className="terminal-copy-btn"
              onClick={handleCopy}
              title="Copy transcription"
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

export default AudioTranscriber;

