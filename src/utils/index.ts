/**
 * Parses provided query string into an object.
 * Parameters ending with "[]" will be considered arrays and returned as a single prop with all values.
 */
export const parseQueryString = <T>(search: string) => {
  const searchParams = new URLSearchParams(search);
  const params: Record<string, string | string[]> = {};

  searchParams.forEach((value, key) => {
    if (key.endsWith('[]')) {
      const normalizedKey = key.slice(0, -2);
      params[normalizedKey] ??= [];
      (params[normalizedKey] as string[]).push(value);
    } else {
      params[key] = value;
    }
  });

  return params as T;
};

/**
 * Stringify an object of query parameters.
 * Keys explicitly defined with undefined value will be skipped.
 * Arrays will be appended multiple times with the "[]" suffix in the param name.
 * All values are cast to string.
 */
export const stringifyQueryParams = (params: Record<string, unknown | unknown[] | undefined>): string => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(`${key}[]`, `${v}`));
    } else {
      searchParams.append(key, `${value}`);
    }
  }

  return searchParams.toString();
};
