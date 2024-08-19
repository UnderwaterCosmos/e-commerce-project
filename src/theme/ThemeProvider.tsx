import React from 'react';

import { ThemeContext } from './ThemeContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface IProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: IProps) {
  const themeName = useLocalStorage('theme');
  const [theme, setTheme] = React.useState(themeName.getItem() || 'light');

  React.useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html')!.classList.add('dark');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
