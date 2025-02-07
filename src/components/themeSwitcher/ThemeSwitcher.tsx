import { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const getStoredTheme = () => localStorage.getItem('theme');
  const setStoredTheme = (theme: string) => localStorage.setItem('theme', theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getPreferredTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    setStoredTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <button
        className={`btn border-0 mx-2 rounded-5 ${theme === 'light' ? 'btn-outline-dark' : 'btn-outline-light'}`}
        title="change theme"
        onClick={toggleTheme}>
        <i className={theme === 'light' ? 'bi bi-brightness-high-fill' : 'bi bi-moon-stars-fill'}></i>
      </button>
    </>
  );
};

export default ThemeSwitcher;
