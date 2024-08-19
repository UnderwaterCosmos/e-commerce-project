import React from 'react';

import { ThemeContext } from '../theme/ThemeContext';
import { useLocalStorage } from './useLocalStorage';

interface IUseTheme {
  themeToggler: () => void;
  theme: string;
}

export function useTheme(): IUseTheme {
  const themeName = useLocalStorage('theme');
  const { theme, setTheme } = React.useContext(ThemeContext);

  const webApp = document.querySelector('html')!;

  const themeToggler = () => {
    if (theme === 'dark') {
      webApp.classList.remove('dark');
      themeName.setItem('light');
      setTheme('light');
    } else {
      webApp.classList.add('dark');
      themeName.setItem('dark');
      setTheme('dark');
    }
  };

  return { theme, themeToggler };
}
