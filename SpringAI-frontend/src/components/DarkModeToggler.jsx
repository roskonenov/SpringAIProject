import { useEffect, useState } from "react";

const DarkModeToggler = () => {
      const [isDark, setIsDark] = useState(
        localStorage.getItem('dark-mode') ||
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );

      useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');

    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('dark-mode', String(isDark));
  }, [isDark]);

    return (
        <div>
            <button
                className="dark-mode"
                role='switch'
                aria-checked={isDark}
                onClick={() => setIsDark(isDark => !isDark)}>
                {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
        </div>
    )
}

export default DarkModeToggler