import type { FC } from 'react';
import { Dropdown, NavBar } from '../../src';

export const NavBarPage: FC = () => {
  return (
    <div className="tw:flex tw:flex-col tw:gap-y-4">
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>NavBar</h2>
        <NavBar brand={<>Shlink</>}>
          <NavBar.MenuItem to="">Foo</NavBar.MenuItem>
          <NavBar.MenuItem to="" active>Bar</NavBar.MenuItem>
          <NavBar.MenuItem to="">Baz</NavBar.MenuItem>
          <NavBar.Dropdown buttonContent="Options">
            <Dropdown.Item>First option</Dropdown.Item>
            <Dropdown.Item selected>Second option</Dropdown.Item>
            <Dropdown.Item>Third option</Dropdown.Item>
          </NavBar.Dropdown>
        </NavBar>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
          justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
          elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
          amet,
          lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
          vel,
          posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
          leo.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
          justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
          elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
          amet,
          lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
          vel,
          posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
          leo.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
          justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
          elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
          amet,
          lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
          vel,
          posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
          leo.
        </p>
      </div>
    </div>
  );
};
