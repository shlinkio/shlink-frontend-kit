import type { FC } from 'react';
import { useTheme } from '../src';
import { Label, ToggleSwitch } from '../src/tailwind';

export const ThemeToggle: FC = () => {
  const [theme, setTheme] = useTheme();

  return (
    <Label className="tw:flex tw:items-center tw:gap-x-1.5">
      <ToggleSwitch checked={theme === 'dark'} onChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
      Dark theme
    </Label>
  );
};
