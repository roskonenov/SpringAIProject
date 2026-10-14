import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const DarkModeToggler = () => {
    const [isDark, setIsDark] = useState(() => {
        const savedMode = localStorage.getItem('springai-theme');
        if (savedMode !== null) {
            return savedMode === 'dark';
        }
        // Ensure default is always the requested green-blue-black cyber dark
        return true;
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('springai-theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <button
            className="futuristic-theme-toggle"
            role="switch"
            aria-checked={isDark}
            aria-label="Toggle visual theme"
            onClick={() => setIsDark(prev => !prev)}
            title={isDark ? "Switch to Light Protocol" : "Switch to Cyber Dark Mode"}
        >
            <span className={`toggle-track ${isDark ? 'is-dark' : 'is-light'}`}>
                <span className="toggle-thumb">
                    {isDark ? <FiMoon className="toggle-icon moon" /> : <FiSun className="toggle-icon sun" />}
                </span>
            </span>
            <span className="toggle-label">{isDark ? 'CYBER DARK' : 'LIGHT MATRIX'}</span>
        </button>
    );
};

export default DarkModeToggler;