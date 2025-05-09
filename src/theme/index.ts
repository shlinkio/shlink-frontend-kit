import { useEffect, useState } from 'react';

export const MAIN_COLOR = '#4696e5';

export const MAIN_COLOR_ALPHA = 'rgba(70, 150, 229, 0.4)';

export const HIGHLIGHTED_COLOR = '#f77f28';

export const HIGHLIGHTED_COLOR_ALPHA = 'rgba(247, 127, 40, 0.4)';

export const PRIMARY_LIGHT_COLOR = 'white';

export const PRIMARY_DARK_COLOR = '#161b22';

export type Theme = 'dark' | 'light';

export const changeThemeInMarkup = (theme: Theme) => document.querySelector('html')?.setAttribute('data-theme', theme);

export const isDarkThemeEnabled = (): boolean => document.querySelector('html')?.getAttribute('data-theme') === 'dark';

export const getSystemPreferredTheme = (_matchMedia = window.matchMedia.bind(window)): Theme => (
  _matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
);

export const useTheme = (initialTheme?: Theme) => {
  const [theme, setTheme] = useState(() => initialTheme ?? getSystemPreferredTheme());

  useEffect(() => {
    changeThemeInMarkup(theme);
  }, [theme]);

  return [theme, setTheme] as const;
};
