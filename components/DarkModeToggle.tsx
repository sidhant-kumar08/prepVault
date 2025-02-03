import { useState, useEffect } from 'react';
import { MdOutlineWbSunny } from 'react-icons/md';
import { RxMoon } from 'react-icons/rx';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prev) => !prev);
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <button 
      onClick={toggleDarkMode}
      className="p-2 hover:bg-gray-200 dark:hover:text-black rounded-lg dark:text-white shadow-sm transition duration-200 ease-linear"
    >
      {isDark ? <MdOutlineWbSunny /> : <RxMoon />}
    </button>
  );
};

export default DarkModeToggle;
