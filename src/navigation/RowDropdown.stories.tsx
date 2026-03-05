import type { Meta, StoryObj } from '@storybook/react-vite';
import { size } from '../../.storybook/utils/storybook';
import type { RowDropdownProps } from './RowDropdown';
import { RowDropdown } from './RowDropdown';

const meta = {
  component: RowDropdown,
  tags: ['autodocs'],
  argTypes: {
    buttonLabel: { type: 'string' },
    buttonSize: size,
  },
} satisfies Meta<typeof RowDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = {
  foo: 'Foo',
  bar: 'Bar',
  baz: 'Baz',
} as const;

const itemsEntries = Object.entries(items);

const Render = (args: RowDropdownProps) => (
  <RowDropdown {...args}>
    {itemsEntries.map(([key, value]) => <RowDropdown.Item key={key}>{value}</RowDropdown.Item>)}
  </RowDropdown>
);

export const Base: Story = {
  args: {},
  render: Render,
};

export const Small: Story = {
  args: {
    buttonSize: 'sm',
  },
  render: Render,
};

export const Large: Story = {
  args: {
    buttonSize: 'lg',
  },
  render: Render,
};
