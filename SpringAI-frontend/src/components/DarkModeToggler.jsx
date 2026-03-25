
const DarkModeToggler = ({ isDark, onChange }) => {
    return (
        <div>
            <button
                className="dark-mode"
                role='switch'
                aria-checked={isDark}
                onClick={() => onChange(isDark => !isDark)}>
                {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
        </div>
    )
}

export default DarkModeToggler