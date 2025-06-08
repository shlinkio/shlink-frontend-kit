import type { FC } from 'react';
import { useCallback , useState } from 'react';
import { LabelledInput, Menu } from '../../../src/tailwind';

export const MenuPage: FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(2);
  const toggleMenu = useCallback((menu: number) => {
    setSelectedMenu((prev) => prev === menu ? null : menu);
  }, []);

  return (
    <div className="tw:flex tw:flex-col tw:gap-y-4">
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Menu</h2>
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
      </div>

      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Menu with links and misc items</h2>
        <Menu
          focusableElementsSelector={'[role="menuitem"]:not([disabled]):not([aria-disabled]),input:not([disabled])'}
        >
          <Menu.Item to="">One</Menu.Item>
          <Menu.Item to="" disabled>Two (disabled)</Menu.Item>
          <Menu.Item to="">Three</Menu.Item>
          <Menu.Separator />
          <Menu.Misc className="tw:flex tw:gap-3">
            <div className="tw:w-1/2">
              <LabelledInput label="Foo" />
            </div>
            <div className="tw:w-1/2">
              <LabelledInput label="Bar" />
            </div>
          </Menu.Misc>
        </Menu>
      </div>
    </div>
  );
};
