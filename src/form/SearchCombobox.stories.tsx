import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { fn } from 'storybook/test';
import { colors } from '../../.storybook/utils/colors';
import { useTimeout } from '../hooks';
import { SearchCombobox } from './SearchCombobox';

const meta = {
  component: SearchCombobox<typeof colors[0]>,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchCombobox<typeof colors[0]>>;

export default meta;

type Story = StoryObj<typeof meta>;

const ColorItem: FC<typeof colors[number]> = ({ name, value }) => (
  <div className="inline-flex items-center gap-2">
    <div aria-hidden className="w-4 h-4 rounded-full" style={{ backgroundColor: value }} />
    {name}
  </div>
);

const matchingColorsToMap = (searchTerm: string) => new Map(
  colors
    .filter(({ name }) => name.match(new RegExp(searchTerm, 'i')))
    .map((color) => [color.name, color]),
);

export const Sync: Story = {
  args: {
    placeholder: 'Search colors synchronously...',
    onSearch: () => fn(),
    onSelectSearchResult: () => fn(),
    renderSearchResult: (color) => <ColorItem {...color} />,
  },
  render: (args) => {
    const [syncSearchResults, setSyncSearchResults] = useState<Map<string, typeof colors[number]>>();
    const [syncSelectedItem, setSyncSelectedItem] = useState<typeof colors[number]>();
    const onSyncSearch = useCallback(
      (searchTerm: string) => setSyncSearchResults(!searchTerm ? undefined : matchingColorsToMap(searchTerm)),
      [],
    );

    return (
      <>
        <SearchCombobox
          {...args}
          onSearch={onSyncSearch}
          onSelectSearchResult={setSyncSelectedItem}
          searchResults={syncSearchResults}
        />
        {syncSelectedItem && (
          <div className="flex gap-3 mt-2">
            Last selected color is: <ColorItem {...syncSelectedItem} />
          </div>
        )}
      </>
    );
  },
};

export const Async: Story = {
  args: {
    placeholder: 'Search colors asynchronously...',
    onSearch: () => fn(),
    onSelectSearchResult: () => fn(),
    renderSearchResult: (color) => <ColorItem {...color} />,
  },
  render: (args) => {
    const { setTimeout } = useTimeout(1000);
    const [asyncSearchResults, setAsyncSearchResults] = useState<Map<string, typeof colors[number]>>();
    const [asyncSelectedItem, setAsyncSelectedItem] = useState<typeof colors[number]>();
    const [asyncLoading, setAsyncLoading] = useState(false);
    const onAsyncSearch = useCallback((searchTerm: string) => {
      if (!searchTerm) {
        setAsyncSearchResults(undefined);
        return;
      }

      setAsyncLoading(true);
      setTimeout(() => {
        setAsyncSearchResults(matchingColorsToMap(searchTerm));
        setAsyncLoading(false);
      });
    }, [setTimeout]);

    return (
      <>
        <SearchCombobox
          {...args}
          onSearch={onAsyncSearch}
          onSelectSearchResult={setAsyncSelectedItem}
          searchResults={asyncSearchResults}
          loading={asyncLoading}
        />
        {asyncSelectedItem && (
          <div className="flex gap-3 mt-2">
            Last selected color is: <ColorItem {...asyncSelectedItem} />
          </div>
        )}
      </>
    );
  },
};
