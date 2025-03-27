import type { FC } from 'react';
import { ToggleSwitch, useTheme } from '../src';

export const ThemeToggle: FC = () => {
  const [theme, setTheme] = useTheme();

  return (
    <ToggleSwitch checked={theme === 'dark'} onChange={(checked) => setTheme(checked ? 'dark' : 'light')}>
      Dark theme
    </ToggleSwitch>
  );
};
