import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { useTimeout } from '../../../src';
import { SearchCombobox, TagsAutoComplete } from '../../../src/tailwind';

const colors = [
  { name: 'red', value: '#FF0000' },
  { name: 'green', value: '#00FF00' },
  { name: 'blue', value: '#0000FF' },
  { name: 'yellow', value: '#FFFF00' },
  { name: 'cyan', value: '#00FFFF' },
  { name: 'magenta', value: '#FF00FF' },
  { name: 'black', value: '#000000' },
  { name: 'white', value: '#FFFFFF' },
  { name: 'gray', value: '#808080' },
  { name: 'maroon', value: '#800000' },
  { name: 'olive', value: '#808000' },
  { name: 'purple', value: '#800080' },
  { name: 'teal', value: '#008080' },
  { name: 'navy', value: '#000080' },
  { name: 'silver', value: '#C0C0C0' },
  { name: 'lime', value: '#00FF00' },
  { name: 'aqua', value: '#00FFFF' },
  { name: 'fuchsia', value: '#FF00FF' },
  { name: 'orange', value: '#FFA500' },
  { name: 'brown', value: '#A52A2A' },
];

const ColorItem: FC<typeof colors[number]> = ({ name, value }) => (
  <div className="tw:inline-flex tw:items-center tw:gap-2">
    <div aria-hidden className="tw:w-4 tw:h-4 tw:rounded-full" style={{ backgroundColor: value }} />
    {name}
  </div>
);

const SyncSearch: FC = () => {
  const [syncSearchResults, setSyncSearchResults] = useState<Map<string, typeof colors[number]>>();
  const [syncSelectedItem, setSyncSelectedItem] = useState<typeof colors[number]>();
  const onSyncSearch = useCallback((searchTerm: string) => {
    if (!searchTerm) {
      setSyncSearchResults(undefined);
      return;
    }

    setSyncSearchResults(new Map(
      colors
        .filter(({ name }) => name.match(new RegExp(searchTerm, 'i')))
        .map((color) => [color.name, color]),
    ));
  }, []);

  return (
    <div className="tw:flex tw:flex-col tw:gap-y-2">
      <h2>Sync search</h2>
      <SearchCombobox
        onSearch={onSyncSearch}
        onSelectSearchResult={setSyncSelectedItem}
        renderSearchResult={(color) => <ColorItem {...color} />}
        searchResults={syncSearchResults}
        placeholder="Search colors synchronously..."
      />
      {syncSelectedItem && (
        <div className="tw:flex tw:gap-3">
          Last selected color is: <ColorItem {...syncSelectedItem} />
        </div>
      )}
    </div>
  );
};

const AsyncSearch: FC = () => {
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
      setAsyncSearchResults(new Map(
        colors
          .filter(({ name }) => name.match(new RegExp(searchTerm, 'i')))
          .map((color) => [color.name, color]),
      ));
      setAsyncLoading(false);
    });
  }, [setTimeout]);

  return (
    <div className="tw:flex tw:flex-col tw:gap-y-2">
      <h2>Async search</h2>
      <SearchCombobox
        onSearch={onAsyncSearch}
        onSelectSearchResult={setAsyncSelectedItem}
        renderSearchResult={(color) => <ColorItem {...color} />}
        searchResults={asyncSearchResults}
        placeholder="Search colors asynchronously..."
        loading={asyncLoading}
      />
      {asyncSelectedItem && (
        <div className="tw:flex tw:gap-3">
          Last selected color is: <ColorItem {...asyncSelectedItem} />
        </div>
      )}
    </div>
  );
};

const TagsAutoCompleteExample: FC<{ immutable: boolean }> = ({ immutable }) => {
  const [selectedTags, setSelectedTags] = useState(immutable ? [] : ['blue', 'yellow']);

  return (
    <div className="tw:flex tw:flex-col tw:gap-y-2">
      <h2>Tags autocomplete</h2>
      <TagsAutoComplete
        tags={colors.map(({ name }) => name)}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
        getColorForTag={(tag) => colors.find(({ name }) => name === tag)?.value ?? '#99A1AF'}
        placeholder={immutable ? 'Select tags from list...' : 'Select or add tags...'}
        immutable={immutable}
      />
    </div>
  );
};

export const SearchComboboxPage: FC = () => {
  return (
    <div className="tw:flex tw:flex-col tw:gap-y-4">
      <SyncSearch />
      <AsyncSearch />
      <TagsAutoCompleteExample immutable={false} />
      <TagsAutoCompleteExample immutable={true} />
    </div>
  );
};
