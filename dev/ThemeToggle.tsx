import type { FC } from 'react';
import { Label, ToggleSwitch, useTheme } from '../src';

export const ThemeToggle: FC = () => {
  const [theme, setTheme] = useTheme();

  return (
    <Label className="flex items-center gap-x-1.5">
      <ToggleSwitch checked={theme === 'dark'} onChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
      Dark theme
    </Label>
  );
};
