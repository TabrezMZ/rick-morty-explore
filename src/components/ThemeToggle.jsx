import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
      style={{
        backgroundColor: 'var(--primary)',
        color: 'white',
        padding: '0.4rem 1rem',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginLeft: 'auto',
      }}
    >
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default ThemeToggle;
