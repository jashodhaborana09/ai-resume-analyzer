import { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') || 'light';
    setTheme(stored);
    document.documentElement.classList.toggle('dark', stored === 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  return (
    <button onClick={toggleTheme} className="rounded-full bg-slate-100 p-2 text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-200">
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeSwitcher;
