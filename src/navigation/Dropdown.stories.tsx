import type { Meta } from '@storybook/react-vite';
import { useCallback, useState } from 'react';
import { LabelledInput } from '../form';
import { Dropdown } from './Dropdown';

export default {
  component: Dropdown,
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

const items = {
  foo: 'Foo',
  bar: 'Bar',
  baz: 'Baz',
} as const;

const itemsEntries = Object.entries(items);

export const Basic = () => {
  const [selected, setSelected] = useState<string>();
  const toggleSelected = useCallback((value: string) => setSelected((prev) => prev === value ? undefined : value), []);

  return (
    <Dropdown buttonContent={selected ?? <i>Click me</i>}>
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
};

export const MenuGrowsToButtonSize = () => (
  <Dropdown buttonContent="Select something from the menu">
    {itemsEntries.map(([key, value]) => <Dropdown.Item key={key}>{value}</Dropdown.Item>)}
  </Dropdown>
);

export const RightAlignedDropdown = () => (
  <div className="flex justify-end">
    <Dropdown buttonContent="Right menu" menuAlignment="right">
      {itemsEntries.map(([key, value]) => <Dropdown.Item key={key}>{value} with very long text</Dropdown.Item>)}
    </Dropdown>
  </div>
);

export const Sizes = () => (
  <div className="flex gap-2 flex-wrap items-center">
    <Dropdown buttonContent="Small" buttonSize="sm">
      {itemsEntries.map(([key, value]) => <Dropdown.Item key={key}>{value}</Dropdown.Item>)}
    </Dropdown>
    <Dropdown buttonContent="Medium (default)" buttonSize="md">
      {itemsEntries.map(([key, value]) => <Dropdown.Item key={key}>{value}</Dropdown.Item>)}
    </Dropdown>
    <Dropdown buttonContent="Large" buttonSize="lg">
      {itemsEntries.map(([key, value]) => <Dropdown.Item key={key}>{value}</Dropdown.Item>)}
    </Dropdown>
  </div>
);

export const Variants = () => (
  <div className="flex gap-3 flex-wrap items-center">
    <Dropdown buttonContent="Caretless" caretless>
      {itemsEntries.map(([key, value]) => <Dropdown.Item key={key}>{value}</Dropdown.Item>)}
    </Dropdown>
    <Dropdown buttonContent="Link" buttonVariant="link">
      {itemsEntries.map(([key, value]) => <Dropdown.Item key={key}>{value}</Dropdown.Item>)}
    </Dropdown>
    <Dropdown buttonContent="Text" buttonVariant="text">
      {itemsEntries.map(([key, value]) => <Dropdown.Item key={key}>{value}</Dropdown.Item>)}
    </Dropdown>
    <Dropdown buttonContent="Disabled" buttonDisabled>
      {itemsEntries.map(([key, value]) => <Dropdown.Item key={key}>{value}</Dropdown.Item>)}
    </Dropdown>
  </div>
);
