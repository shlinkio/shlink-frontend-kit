import { clsx } from 'clsx';
import type { FC } from 'react';
import { useCallback, useRef } from 'react';
import { isLightColor, normalizeTag, useTagsSearch } from '..';
import type { Size } from '../types';
import { CloseButton } from './CloseButton';
import type { SearchComboboxProps } from './SearchCombobox';
import { SearchCombobox } from './SearchCombobox';

export type TagItemProps = {
  name: string;
  color: string;
};

const TagItem: FC<TagItemProps> = ({ name, color }) => (
  <div className="inline-flex items-center gap-2">
    <div aria-hidden className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
    {name}
  </div>
);

type TagSearchResultProps = {
  tag: string;
  color: string;
  size: Size;
  onRemove: (tag: string) => void;
};

const TagSearchResult: FC<TagSearchResultProps> = ({ tag, color, size, onRemove }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
  <li
    className={clsx(
      'inline-flex items-center gap-1 font-bold [&]:rounded-md',
      {
        'px-1 text-sm': size === 'sm',
        'py-0.25 px-1.5': size === 'md',
        'py-0.5 px-1.5': size === 'lg',
      },
    )}
    style={{
      backgroundColor: color,
      color: isLightColor(color) ? '#000' : '#fff',
    }}
    onClick={(e) => e.stopPropagation()}
  >
    {tag}
    <CloseButton label={`Remove ${tag}`} solid size="sm" onClick={() => onRemove(tag)} />
  </li>
);

const DEFAULT_TAG_COLOR = '#99a1af';

export type TagsAutocompleteProps = {
  /** Full list of tags from which to build the suggestions */
  tags: string[];
  /** Tags currently selected */
  selectedTags?: string[];
  /** Invoked when tags are added or removed */
  onTagsChange?: (tags: string[]) => void;
  /** Invoked to determine what is the color of a tag */
  getColorForTag?: (tag: string) => string;
  /** Search input placeholder */
  placeholder?: string;
  /** Classes to be added to the wrapping container */
  containerClassName?: string;

  /**
   * Whether to allow adding new arbitrary tags, or only select from the list of tags.
   * Defaults to false.
   */
  immutable?: boolean;

  /**
   * How to filter the list of tags when searching:
   *   - `startsWith`: those that start with the search term
   *   -  `includes`: those that include the search term
   * Defaults to `startsWith`.
   */
  searchMode?: 'startsWith' | 'includes';
} & Pick<SearchComboboxProps<string>, 'placeholder' | 'size' | 'disabled' | 'aria-label'>;

export const TagsAutocomplete: FC<TagsAutocompleteProps> = ({
  tags,
  selectedTags = [],
  onTagsChange,
  getColorForTag,
  searchMode = 'startsWith',
  immutable = false,
  size = 'md',
  disabled,
  containerClassName,
  ...rest
}) => {
  const { searchResults, onSearch } = useTagsSearch({ tags, selectedTags, searchMode, allowAdding: !immutable });

  const addTag = useCallback((tag: string) => {
    const match = tag.match(/Add\s+"([^"]+)"\s+tag/);
    const tagsToAdd = (match?.[1] ?? tag).split(',').map(normalizeTag);

    onTagsChange?.([...new Set([...selectedTags, ...tagsToAdd])]);
  }, [onTagsChange, selectedTags]);
  const removeTag = useCallback(
    (deletedTag: string) => onTagsChange?.(selectedTags.filter((tag) => tag !== deletedTag)),
    [onTagsChange, selectedTags],
  );

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={clsx(
        'rounded-md flex flex-wrap gap-1',
        'border border-lm-input-border dark:border-dm-input-border',
        'cursor-text focus-within:focus-within-ring',
        {
          'p-0.5': size === 'sm',
          'p-1.25': size === 'md',
          'p-2': size === 'lg',

          'bg-lm-disabled-input dark:bg-dm-disabled-input': disabled,
          'bg-lm-primary dark:bg-dm-primary': !disabled,
          // Use different background color when rendered inside a card
          'group-[&]/card:bg-lm-input group-[&]/card:dark:bg-dm-input': !disabled,
        },
        containerClassName,
      )}
      onClick={(e) => {
        if (e.target !== inputRef.current) {
          inputRef.current?.focus();
        }
      }}
    >
      <ul className="m-0 p-0 flex flex-wrap gap-1">
        {selectedTags.map((tag, index) => {
          const tagColor = getColorForTag?.(tag) ?? DEFAULT_TAG_COLOR;
          return <TagSearchResult key={`${tag}${index}`} tag={tag} color={tagColor} onRemove={removeTag} size={size} />;
        })}
      </ul>
      <SearchCombobox
        variant="unstyled"
        listboxSpan="auto"
        containerClassName="flex items-center"
        listboxClassName="whitespace-nowrap"
        inputClassName={clsx(
          'no-clear-button',
          {
            'px-1 text-sm': size === 'sm',
            'px-2 h-[26px]': size === 'md',
            'px-3 text-xl': size === 'lg',
          },
        )}
        searchResults={searchResults}
        onSearch={onSearch}
        onSelectSearchResult={addTag}
        renderSearchResult={(tag) =>
          tag.match(/Add\s+"([^"]+)"\s+tag/)
            ? tag
            : <TagItem name={tag} color={getColorForTag?.(tag) ?? DEFAULT_TAG_COLOR} />
        }
        onKeyDown={(e) => {
          if (e.key === 'Backspace' && !searchResults) {
            removeTag(selectedTags[selectedTags.length -1 ]);
          }
        }}
        size={size}
        disabled={disabled}
        ref={inputRef}
        immediate
        {...rest}
      />
    </div>
  );
};
