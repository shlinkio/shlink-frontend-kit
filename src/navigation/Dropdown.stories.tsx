import type { Meta, StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';
import { boolean, size } from '../../.storybook/utils/storybook';
import { LabelledInput } from '../form';
import { Dropdown } from './Dropdown';

const meta = {
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    buttonDisabled: boolean,
    menuOffset: { type: 'number' },
    buttonSize: size,
    buttonVariant: { options: ['button', 'link', 'text'] },
    menuAlignment: { options: ['left', 'right'] },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = {
  foo: 'Foo',
  bar: 'Bar',
  baz: 'Baz',
} as const;

const itemsEntries = Object.entries(items);

export const Base: Story = {
  args: {
    buttonContent: 'Click me',
  },
  render: (args) => {
    const [selected, setSelected] = useState<string>();
    const toggleSelected = useCallback(
      (value: string) => setSelected((prev) => prev === value ? undefined : value),
      [],
    );

    return (
      <Dropdown {...args} buttonContent={selected ?? <i>Click me</i>}>
        {Object.entries(items).map(([key, value]) => (
          <Dropdown.Item key={key} selected={selected === value} onClick={() => toggleSelected(value)}>
            {value}
          </Dropdown.Item>
        ))}
        <Dropdown.Separator />
        <Dropdown.Title>More stuff</Dropdown.Title>
        <Dropdown.Misc>
          <div className="flex items-center gap-3 min-w-92">
            <div className="w-1/2">
              <LabelledInput label="Foo" />
            </div>
            <div className="w-1/2">
              <LabelledInput label="Bar" />
            </div>
          </div>
        </Dropdown.Misc>
      </Dropdown>
    );
  },
};

export const MenuGrowsToButtonSize: Story = {
  name: 'Menu grows to button size',
  args: {
    buttonContent: 'Select something from this big menu',
    children: itemsEntries.map(([key, value]) => <Dropdown.Item key={key}>{value}</Dropdown.Item>),
  },
};

export const RightAligned: Story = {
  args: {
    buttonContent: 'Right menu',
    menuAlignment: 'right',
    children: itemsEntries.map(([key, value]) => <Dropdown.Item key={key}>{value} with very long text</Dropdown.Item>),
  },
  render: (args) => (
    <div className="flex justify-end">
      <Dropdown {...args} />
    </div>
  ),
};

export const Small: Story = {
  args: {
    buttonContent: 'Small',
    buttonSize: 'sm',
    children: itemsEntries.map(([key, value]) => <Dropdown.Item key={key}>{value}</Dropdown.Item>),
  },
};

export const Large: Story = {
  args: {
    buttonContent: 'Large',
    buttonSize: 'lg',
    children: itemsEntries.map(([key, value]) => <Dropdown.Item key={key}>{value}</Dropdown.Item>),
  },
};

export const Caretless: Story = {
  args: {
    buttonContent: 'Caretless',
    caretless: true,
    children: itemsEntries.map(([key, value]) => <Dropdown.Item key={key}>{value}</Dropdown.Item>),
  },
};

export const Link: Story = {
  args: {
    buttonContent: 'Link',
    buttonVariant: 'link',
    children: itemsEntries.map(([key, value]) => <Dropdown.Item key={key}>{value}</Dropdown.Item>),
  },
};

export const Text: Story = {
  args: {
    buttonContent: 'Text',
    buttonVariant: 'text',
    children: itemsEntries.map(([key, value]) => <Dropdown.Item key={key}>{value}</Dropdown.Item>),
  },
};

export const Disabled: Story = {
  args: {
    buttonContent: 'Disabled',
    buttonDisabled: true,
    children: itemsEntries.map(([key, value]) => <Dropdown.Item key={key}>{value}</Dropdown.Item>),
  },
};
