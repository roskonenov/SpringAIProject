import { useEffect, useState } from 'react'
import './App.css'
import AskAi from './components/AskAi';
import ImageGenerator from './components/ImageGenerator';
import CreateRecipe from './components/CreateRecipe';
import DarkModeToggler from './components/DarkModeToggler';

function App() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('dark-mode')
  );
  const [selectedTab, setSelectedTab] = useState('ask-ai');

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');

    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('dark-mode', String(isDark));
  }, [isDark]);

  return (
    <>
      <DarkModeToggler
        isDark={isDark}
        onChange={setIsDark}
      />
      <div className='button-container'>
        <button
          className={selectedTab === 'ask-ai' ? 'focus' : ''}
          onClick={() => setSelectedTab('ask-ai')}
        >Ask AI</button>
        <button
          className={selectedTab === 'generate-image' ? 'focus' : ''}
          onClick={() => setSelectedTab('generate-image')}
        >Generate Image</button>
        <button
          className={selectedTab === 'create-recipe' ? 'focus' : ''}
          onClick={() => setSelectedTab('create-recipe')}
        >Create Recipe</button>
      </div>

      <div>
        {selectedTab === 'ask-ai' && <AskAi />}
        {selectedTab === 'generate-image' && <ImageGenerator />}
        {selectedTab === 'create-recipe' && <CreateRecipe />}
      </div>
    </>
  )
}

export default App
