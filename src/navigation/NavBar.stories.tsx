import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoremIpsum } from '../../.storybook/utils/LoremIpsum';
import { nonEditableReactNode } from '../../.storybook/utils/storybook';
import { Dropdown } from './Dropdown';
import { NavBar } from './NavBar';

const meta = {
  component: NavBar,
  tags: ['autodocs'],
  argTypes: {
    children: nonEditableReactNode,
  },
} satisfies Meta<typeof NavBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    brand: 'Shlink',
    children: (
      <>
        <NavBar.MenuItem to="">Foo</NavBar.MenuItem>
        <NavBar.MenuItem to="" active>Bar</NavBar.MenuItem>
        <NavBar.MenuItem to="">Baz</NavBar.MenuItem>
        <NavBar.Dropdown buttonContent="Options">
          <Dropdown.Item>First option</Dropdown.Item>
          <Dropdown.Item selected>Second option</Dropdown.Item>
          <Dropdown.Item>Third option</Dropdown.Item>
        </NavBar.Dropdown>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-y-2">
        <Story />
        <LoremIpsum repeat={3} />
      </div>
    ),
  ],
};
