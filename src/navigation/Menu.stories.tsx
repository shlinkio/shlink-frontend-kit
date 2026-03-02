import type { Meta } from '@storybook/react-vite';
import { useCallback, useState } from 'react';
import { MemoryRouter } from 'react-router';
import { LabelledInput } from '../form';
import { Menu } from './Menu';

export default {
  component: Menu,
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export const Base = () => {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(2);
  const toggleMenu = useCallback((menu: number) => {
    setSelectedMenu((prev) => prev === menu ? null : menu);
  }, []);

  return (
    <Menu>
      <Menu.Title>Numbers:</Menu.Title>
      <Menu.Item selected={selectedMenu === 1} onClick={() => toggleMenu(1)}>One</Menu.Item>
      <Menu.Item selected={selectedMenu === 2} onClick={() => toggleMenu(2)}>Two</Menu.Item>
      <Menu.Separator />
      <Menu.Title>More numbers:</Menu.Title>
      <Menu.Item selected={selectedMenu === 3} onClick={() => toggleMenu(3)}>Three</Menu.Item>
      <Menu.Item selected={selectedMenu === 4} onClick={() => toggleMenu(4)} disabled={true}>
        Four (disabled)
      </Menu.Item>
    </Menu>
  );
};

export const WithLinksAndMiscItems = () => (
  <MemoryRouter>
    <Menu
      focusableElementsSelector={'[role="menuitem"]:not([disabled]):not([aria-disabled]),input:not([disabled])'}
    >
      <Menu.Item to="">One</Menu.Item>
      <Menu.Item to="" disabled>Two (disabled)</Menu.Item>
      <Menu.Item to="">Three</Menu.Item>
      <Menu.Separator />
      <Menu.Misc className="flex gap-3">
        <div className="w-1/2">
          <LabelledInput label="Foo" />
        </div>
        <div className="w-1/2">
          <LabelledInput label="Bar" />
        </div>
      </Menu.Misc>
    </Menu>
  </MemoryRouter>
);
