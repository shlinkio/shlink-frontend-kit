import { clsx } from 'clsx';
import type { FC } from 'react';
import { useCallback, useState  } from 'react';
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

export type TagsAutoCompleteProps = Pick<SearchComboboxProps<string>, 'placeholder' | 'size' | 'disabled'> & {
  tags: string[];
  selectedTags?: string[];
  onTagsChange?: (tags: string[]) => void;
  placeholder?: string;
  getColorForTag?: (tag: string) => string;
};

export const TagsAutoComplete: FC<TagsAutoCompleteProps> = (
  { tags, selectedTags = [], onTagsChange, getColorForTag, size = 'md', disabled, ...rest },
) => {
  const [searchResults, setSearchResults] = useState<Map<string, string>>();
  const onSearch = useCallback((searchTerm: string) => {
    if (!searchTerm) {
      setSearchResults(undefined);
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    const matches: (string)[] = tags
      .filter((t) => {
        // Exclude any tag which is already selected
        if (selectedTags.includes(t)) {
          return false;
        }

        // Include tags starting with the search term only
        return t.toLowerCase().startsWith(lowerSearchTerm);
      })
      // Do not show more than 5 matches
      .slice(0, 5);

    // Add an extra item to just "create" the input verbatim
    matches.push(`Add "${lowerSearchTerm}" tag`);

    setSearchResults(new Map(matches.map((tag) => [tag, tag])));
  }, [selectedTags, tags]);

  const addTag = useCallback((tag: string) => {
    const match = tag.match(/Add\s+"([^"]+)"\s+tag/);
    const addedTag = match?.[1] ?? tag;

    onTagsChange?.([...new Set([...selectedTags, addedTag])]);
  }, [onTagsChange, selectedTags]);
  const removeTag = useCallback((deletedTag: string) => {
    onTagsChange?.(selectedTags.filter((tag) => tag !== deletedTag));
  }, [onTagsChange, selectedTags]);

  return (
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
      )}
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
        inputClassName={clsx(
          'tw:no-clear-button tw:h-[26px]',
          {
            'tw:px-1 tw:text-sm': size === 'sm',
            'tw:px-2 ': size === 'md',
            'tw:px-3 tw:text-xl': size === 'lg',
          },
        )}
        searchResults={searchResults}
        onSearch={onSearch}
        onSelectSearchResult={addTag}
        renderSearchResult={(tag) => tag.match(/Add\s+"([^"]+)"\s+tag/) ? tag : <TagItem name={tag} color={getColorForTag?.(tag) ?? '#99A1AF'} />}
        onKeyDown={(e) => {
          if (e.key === 'Backspace') {
            removeTag(selectedTags[selectedTags.length -1 ]);
          }
        }}
        size={size}
        disabled={disabled}
        {...rest}
      />
    </div>
  );
};
