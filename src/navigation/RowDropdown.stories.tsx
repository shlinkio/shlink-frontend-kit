import type { Meta } from '@storybook/react-vite';
import { RowDropdown } from './RowDropdown';

export default {
  component: RowDropdown,
  tags: ['autodocs'],
} satisfies Meta<typeof RowDropdown>;

const items = {
  foo: 'Foo',
  bar: 'Bar',
  baz: 'Baz',
} as const;

const itemsEntries = Object.entries(items);

export const Medium = () => (
  <RowDropdown>
    {itemsEntries.map(([key, value]) => <RowDropdown.Item key={key}>{value}</RowDropdown.Item>)}
  </RowDropdown>
);

export const Small = () => (
  <RowDropdown buttonSize="sm">
    {itemsEntries.map(([key, value]) => <RowDropdown.Item key={key}>{value}</RowDropdown.Item>)}
  </RowDropdown>
);

export const Large = () => (
  <RowDropdown buttonSize="lg">
    {itemsEntries.map(([key, value]) => <RowDropdown.Item key={key}>{value}</RowDropdown.Item>)}
  </RowDropdown>
);
