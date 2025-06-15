import type { FC } from 'react';
import { NavBar } from '../../../src/tailwind/navigation/NavBar';

export const NavBarPage: FC = () => {
  return (
    <div className="tw:flex tw:flex-col tw:gap-y-4">
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>NavBar</h2>
        <NavBar brand={<>Shlink</>}>
          <NavBar.MenuItem>Foo</NavBar.MenuItem>
          <NavBar.MenuItem>Bar</NavBar.MenuItem>
        </NavBar>
        More stuff under the menu
      </div>
    </div>
  );
};
