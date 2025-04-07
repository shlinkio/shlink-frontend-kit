import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useCallback, useId, useRef } from 'react';
import { Listbox } from '../content';
import type { SearchInputProps } from './SearchInput';
import { SearchInput } from './SearchInput';

type BaseInputProps = Omit<
  SearchInputProps,
  'role' | 'aria-autocomplete' | 'aria-expanded' | 'aria-controls' | 'onChange'
>;

export type ComboboxProps<Item> = BaseInputProps & {
  /** If defined, it will display a listbox with the search results */
  searchResults?: Map<string, Item>;
  /** Invoked when the search input value changes */
  onSearch: (searchTerm: string) => void;
  /** Invoked when the active search result is selected */
  onSelectSearchResult: (item: Item) => void;
  /** To customize the look and feel of a search result */
  renderSearchResult: (item: Item) => ReactNode;

  /**
   * Determines how the listbox should span when visible.
   * - `full`: Be always as big as the input, regardless its content.
   * - `auto`: Take only the needed space to display its content, up to the width of the input.
   *
   * Defaults to `full`.
   */
  listboxSpan?: 'full' | 'auto';
};

/**
 * This component combines a SearchInput with a Listbox, to behave close to an editable combobox with autocomplete, as
 * described in https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/.
 * The main difference is that the input is used only to search in the listbox, and once an item is selected, the input
 * is cleared and the listbox is closed.
 */
export function SearchCombobox<Item>({
  searchResults,
  onSearch,
  onSelectSearchResult,
  renderSearchResult,
  size = 'md',
  listboxSpan = 'full',
  onBlur,
  onFocus,
  ...rest
}: ComboboxProps<Item>) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const applySearchResult = useCallback((item: Item) => {
    onSelectSearchResult(item);
    onSearch('');
    searchInputRef.current!.value = '';
  }, [onSearch, onSelectSearchResult]);

  return (
    <div className="tw:relative">
      <SearchInput
        onChange={onSearch}
        size={size}
        ref={searchInputRef}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={!!searchResults}
        aria-controls={listboxId}
        onBlur={(e) => {
          onBlur?.(e);
          // Clears search when focus is lost, so that the listbox is closed
          onSearch('');
        }}
        onFocus={(e) => {
          onFocus?.(e);
          // "Recover" search when focus is set, so that the listbox is open for current value
          onSearch(e.target.value);
        }}
        {...rest}
      />
      {searchResults && (
        <Listbox
          id={listboxId}
          items={searchResults}
          anchor={searchInputRef}
          onSelectItem={applySearchResult}
          renderItem={renderSearchResult}
          className={clsx(
            'tw:absolute tw:top-full tw:mt-1 tw:z-10',
            {
              'tw:min-w-60 tw:max-w-full': listboxSpan === 'auto',
              'tw:w-full': listboxSpan === 'full',
            },
          )}
          aria-label="Matching items"
          noItemsMessage="No results found matching search"
        />
      )}
    </div>
  );
}
