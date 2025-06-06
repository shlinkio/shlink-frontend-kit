import type { FC } from 'react';
import { useCallback , useState } from 'react';
import { Menu } from '../../../src/tailwind';

export const MenuPage: FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(1);
  const toggleMenu = useCallback((menu: number) => {
    setSelectedMenu((prev) => prev === menu ? null : menu);
  }, []);

  return (
    <div className="tw:flex tw:flex-col tw:gap-y-4">
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Buttons menu</h2>
        <Menu>
          <Menu.Title>Numbers:</Menu.Title>
          <Menu.Item selected={selectedMenu === 1} onClick={() => toggleMenu(1)}>One</Menu.Item>
          <Menu.Item selected={selectedMenu === 2} onClick={() => toggleMenu(2)}>Two</Menu.Item>
          <Menu.Separator />
          <Menu.Title>More numbers:</Menu.Title>
          <Menu.Item selected={selectedMenu === 3} onClick={() => toggleMenu(3)}>Three</Menu.Item>
        </Menu>
      </div>
    </div>
  );
};
