import { clsx } from 'clsx';
import type { FC } from 'react';
import { useCallback, useRef , useState  } from 'react';
import { isLightColor } from '../../utils';
import { CloseButton } from './CloseButton';
import type { SearchComboboxProps } from './SearchCombobox';
import { SearchCombobox } from './SearchCombobox';

export type TagItemProps = {
  name: string;
  color: string;
};

const TagItem: FC<TagItemProps> = ({ name, color }) => (
  <div className="tw:inline-flex tw:items-center tw:gap-2">
    <div aria-hidden className="tw:w-4 tw:h-4 tw:rounded-full" style={{ backgroundColor: color }} />
    {name}
  </div>
);

const ONE_OR_MORE_SPACES_REGEX = /\s+/g;

/**
 * Normalizes a tag, making it lowercase, trimmed and replacing space characters with dashes
 */
const normalizeTag = (tag: string) => tag.trim().toLowerCase().replace(ONE_OR_MORE_SPACES_REGEX, '-');

export type TagsAutocompleteProps = Pick<SearchComboboxProps<string>, 'placeholder' | 'size' | 'disabled'> & {
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
};

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
  const [searchResults, setSearchResults] = useState<Map<string, string>>();
  const onSearch = useCallback((searchTerm: string) => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    if (!normalizedSearchTerm) {
      setSearchResults(undefined);
      return;
    }

    const matches: (string)[] = tags
      .filter((t) => {
        // Exclude any tag which is already selected
        if (selectedTags.includes(t)) {
          return false;
        }

        const lowerTag = t.toLowerCase();
        return searchMode === 'startsWith'
          ? lowerTag.startsWith(normalizedSearchTerm)
          : lowerTag.includes(normalizedSearchTerm);
      })
      // Do not show more than 5 matches
      .slice(0, 5);

    if (!immutable) {
      // Add an extra item to just "create" the input verbatim
      matches.push(`Add "${normalizeTag(normalizedSearchTerm)}" tag`);
    }

    setSearchResults(new Map(matches.map((tag) => [tag, tag])));
  }, [immutable, searchMode, selectedTags, tags]);

  const addTag = useCallback((tag: string) => {
    const match = tag.match(/Add\s+"([^"]+)"\s+tag/);
    const tagsToAdd = (match?.[1] ?? tag).split(',').map(normalizeTag);

    onTagsChange?.([...new Set([...selectedTags, ...tagsToAdd])]);
  }, [onTagsChange, selectedTags]);
  const removeTag = useCallback((deletedTag: string) => {
    onTagsChange?.(selectedTags.filter((tag) => tag !== deletedTag));
  }, [onTagsChange, selectedTags]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={clsx(
        'tw:rounded-md tw:flex tw:flex-wrap tw:gap-1',
        'tw:border tw:border-lm-input-border tw:dark:border-dm-input-border',
        'tw:cursor-text tw:focus-within:focus-within-ring',
        {
          'tw:p-0.5': size === 'sm',
          'tw:p-1.25': size === 'md',
          'tw:p-2': size === 'lg',

          'tw:bg-lm-disabled-input tw:dark:bg-dm-disabled-input': disabled,
          'tw:bg-lm-primary tw:dark:bg-dm-primary': !disabled,
          // Use different background color when rendered inside a card
          'tw:group-[&]/card:bg-lm-input tw:group-[&]/card:dark:bg-dm-input': !disabled,
        },
        containerClassName,
      )}
      onClick={(e) => {
        if (e.target !== inputRef.current) {
          inputRef.current?.focus();
        }
      }}
    >
      {selectedTags.map((tag, index) => {
        const tagColor = getColorForTag?.(tag) ?? '#99a1af';

        return (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
          <span
            key={`${tag}${index}`}
            className={clsx(
              'tw:inline-flex tw:items-center tw:gap-1 tw:font-bold tw:[&]:rounded-md',
              {
                'tw:px-1 tw:text-sm': size === 'sm',
                'tw:py-0.25 tw:px-1.5': size === 'md',
                'tw:py-0.5 tw:px-1.5': size === 'lg',
              },
            )}
            style={{
              backgroundColor: tagColor,
              color: isLightColor(tagColor) ? '#000' : '#fff',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {tag}
            <CloseButton label={`Remove ${tag}`} solid size="sm" onClick={() => removeTag(tag)} />
          </span>
        );
      })}
      <SearchCombobox
        variant="unstyled"
        listboxSpan="auto"
        containerClassName="tw:flex tw:items-center"
        listboxClassName="tw:whitespace-nowrap"
        inputClassName={clsx(
          'tw:no-clear-button',
          {
            'tw:px-1 tw:text-sm': size === 'sm',
            'tw:px-2 tw:h-[26px]': size === 'md',
            'tw:px-3 tw:text-xl': size === 'lg',
          },
        )}
        searchResults={searchResults}
        onSearch={onSearch}
        onSelectSearchResult={addTag}
        renderSearchResult={(tag) =>
          tag.match(/Add\s+"([^"]+)"\s+tag/)
            ? tag
            : <TagItem name={tag} color={getColorForTag?.(tag) ?? '#99A1AF'} />
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
