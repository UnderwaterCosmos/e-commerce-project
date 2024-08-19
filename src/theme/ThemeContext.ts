import React from 'react';

export interface IThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeContext = React.createContext<IThemeContextProps>({
  theme: '',
  setTheme: () => {},
});
