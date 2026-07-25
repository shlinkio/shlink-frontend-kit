import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { parseQueryString } from '../utils';

export const useParsedQuery = <T>(): T => {
  const { search } = useLocation();
  return useMemo(() => parseQueryString<T>(search), [search]);
};
