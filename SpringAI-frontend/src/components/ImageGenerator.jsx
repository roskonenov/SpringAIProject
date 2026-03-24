import { useState } from "react"

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  const generateImage = async () => {
    await fetch(`http://localhost:8080/generate-image?prompt=${prompt}&n=2&height=512&width=512`)
      .then(res => res.json())
      .then(data => setImageUrls(data))
      .catch(err => console.error("Error generating image : ", err))
  };
  return (
    <div>
      <h2>ImageGenerator</h2>
      <input
        type="text"
        value={prompt}
        placeholder='Describe the image you want'
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="sec-btn"
        onClick={generateImage}
      >
        Generate Image
      </button>

      <div className="image-container">
        {imageUrls.map((url, index) => (
          <a href={url} key={index} target="_blank">
            <img  src={url} alt={`Generated ${index}`} />
          </a>
        ))}
        {[...Array(4 - imageUrls.length)].map((_, index) => (
          <div key={imageUrls.length + index} className="empty-slot"></div>
        ))}
      </div>

    </div>
  )
}

export default ImageGenerator