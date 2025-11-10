const ONE_OR_MORE_SPACES_REGEX = /\s+/g;

/**
 * Normalizes a tag, making it lowercase, trimmed and replacing space characters with dashes
 */
export const normalizeTag = (tag: string) => tag.trim().toLowerCase().replace(ONE_OR_MORE_SPACES_REGEX, '-');
