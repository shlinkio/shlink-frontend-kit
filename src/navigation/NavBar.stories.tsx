import type { Meta } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { LoremIpsum } from '../../.storybook/utils/LoremIpsum';
import { Dropdown } from './Dropdown';
import { NavBar } from './NavBar';

export default {
  component: NavBar,
  tags: ['autodocs'],
} satisfies Meta<typeof NavBar>;

export const Basic = () => (
  <MemoryRouter>
    <div className="flex flex-col gap-y-2">
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
      <LoremIpsum repeat={3} />
    </div>
  </MemoryRouter>
);
