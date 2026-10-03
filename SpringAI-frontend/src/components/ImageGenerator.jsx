import { useState } from "react"
import Spinner from './Spinner';
import { API_BASE_URL } from '../config';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const generateImage = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await fetch(`${API_BASE_URL}/generate-image?prompt=${encodeURIComponent(prompt)}&n=2&height=512&width=512`);
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const data = await res.json();
      setImageUrls(data);
    } catch (err) {
      console.error("Error generating image : ", err);
      setErrorMessage(`Failed to generate image (${err.message}).`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h2>ImageGenerator</h2>
      <div className="input-container">
        <input
          type="text"
          value={prompt}
          placeholder='Describe the image you want'
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && generateImage()}
          disabled={isLoading}
        />
        <button
          className="sec-btn"
          onClick={generateImage}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Image'}
        </button>
      </div>

      {isLoading && <Spinner text="Creating your images with AI..." />}

      {errorMessage && (
        <div className='response-container'>
          <p style={{ color: '#d32f2f' }}>{errorMessage}</p>
        </div>
      )}

      <div className="image-container">
        {imageUrls.map((url, index) => (
          <a href={url} key={index} target="_blank" rel="noreferrer">
            <img src={url} alt={`Generated ${index}`} />
          </a>
        ))}
        {[...Array(Math.max(0, 4 - imageUrls.length))].map((_, index) => (
          <div key={imageUrls.length + index} className="empty-slot"></div>
        ))}
      </div>

    </div>
  )
}

export default ImageGenerator
