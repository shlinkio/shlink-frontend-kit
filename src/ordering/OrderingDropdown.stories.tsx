import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import type { Order } from './ordering';
import type { OrderingDropdownProps } from './OrderingDropdown';
import { OrderingDropdown } from './OrderingDropdown';

const meta = {
  component: OrderingDropdown,
  tags: ['autodocs'],
  argTypes: {
    buttonVariant: {
      options: ['button', 'link', 'text'],
    },
  },
} satisfies Meta<typeof OrderingDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = {
  foo: 'Foo',
  bar: 'Bar',
  baz: 'Baz',
};

const ControlledOrderingDropdown = (props: OrderingDropdownProps) => {
  const [order, onChange] = useState<Order<keyof typeof items>>({});
  return <OrderingDropdown {...props} order={order} onChange={onChange} />;
};

export const Base: Story = {
  args: {
    items,
    order: {},
    onChange: () => fn(),
  },
  render: ControlledOrderingDropdown,
};

export const AsLink: Story = {
  args: {
    items,
    buttonVariant: 'link',
    order: {},
    onChange: () => fn(),
  },
  render: ControlledOrderingDropdown,
};

export const AsText: Story = {
  args: {
    items,
    buttonVariant: 'text',
    order: {},
    onChange: () => fn(),
  },
  render: ControlledOrderingDropdown,
};

export const NonPrefixed: Story = {
  args: {
    items,
    prefixed: false,
    order: {},
    onChange: () => fn(),
  },
  render: ControlledOrderingDropdown,
};

