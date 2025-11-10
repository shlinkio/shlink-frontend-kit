import { useCallback, useState } from 'react';
import { normalizeTag } from '../helpers';

export type TagsSearchOptions = {
  /** Full list of tags to search on */
  tags: string[];
  /** Tags that are already selected, to ignore them while searching */
  selectedTags: string[];
  /** How to do the search term matching on tags, via `startsWith` or `includes` */
  searchMode: 'startsWith' | 'includes';
  /** Max amount of matching tags to return. Defaults to 5 */
  searchLimit?: number;
  /**
   * Whether new entries are allowed or not.
   * When this is true, it will be allowed to add the search term verbatim in the search result.
   */
  allowAdding?: boolean;
};

export type TagsSearchResult = {
  /**
   * A Map with the list of tags that match the search result, with the tag used both as key and value.
   * Returned as a Map for convenience to use with SearchCombobox.
   *
   * When no tags match the search term, or the search term is empty, then `undefined` is returned.
   *
   * @see {SearchCombobox}
   */
  searchResults: Map<string, string> | undefined;

  /** A callback used to perform a search in the list of tags */
  onSearch: (searchTerm: string) => void;
};

/**
 * Allows to search on a list of tags and only return the ones that match.
 * Search can be done by `startsWith` or `includes`.
 */
export function useTagsSearch(
  { tags, selectedTags, searchMode, searchLimit = 5, allowAdding = false }: TagsSearchOptions,
): TagsSearchResult {
  const [searchResults, setSearchResults] = useState<Map<string, string>>();
  const onSearch = useCallback((searchTerm: string) => {
    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
    if (!normalizedSearchTerm) {
      setSearchResults(undefined);
      return;
    }

    const matches: string[] = tags
      .filter((t) => {
        // Exclude any tag which is already selected
        if (selectedTags.includes(t)) {
          return false;
        }

        const lowerTag = t.toLowerCase();
        return lowerTag[searchMode](normalizedSearchTerm);
      })
      // Do not show more than 5 matches
      .slice(0, searchLimit);

    if (allowAdding) {
      // Add an extra item to just "create" the input verbatim
      matches.push(`Add "${normalizedSearchTerm.split(',').map(normalizeTag).join(',')}" tag`);
    }

    setSearchResults(new Map(matches.map((tag) => [tag, tag])));
  }, [allowAdding, searchLimit, searchMode, selectedTags, tags]);

  return { searchResults, onSearch };
}
