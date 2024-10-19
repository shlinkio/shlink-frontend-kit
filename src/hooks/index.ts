import { useCallback, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { parseQueryString } from '../utils';

type ToggleResult = [boolean, () => void, () => void, () => void];

export const useToggle = (initialValue = false): ToggleResult => {
  const [flag, setFlag] = useState(initialValue);
  const toggleFlag = useCallback(() => setFlag((prev) => !prev), []);
  const setToTrue = useCallback(() => setFlag(true), []);
  const setToFalse = useCallback(() => setFlag(false), []);

  return [flag, toggleFlag, setToTrue, setToFalse];
};

export type TimeoutToggle = typeof useTimeoutToggle;

export const useTimeoutToggle = (
  initialValue = false,
  delay = 2000,

  // Test seams
  setTimeout = window.setTimeout,
  clearTimeout = window.clearTimeout,
): [boolean, () => void] => {
  const [flag, setFlag] = useState<boolean>(initialValue);
  const initialValueRef = useRef(initialValue);
  const timeout = useRef<number>();
  const callback = useCallback(() => {
    setFlag(!initialValueRef.current);

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => setFlag(initialValueRef.current), delay);
  }, [clearTimeout, delay, setTimeout]);

  return [flag, callback];
};

export const useElementRef = <T>() => useRef<T | null>(null);

export const useParsedQuery = <T>(): T => {
  const { search } = useLocation();
  return useMemo(() => parseQueryString<T>(search), [search]);
};
