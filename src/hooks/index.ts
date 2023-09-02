import { useCallback, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

type ToggleResult = [boolean, () => void, () => void, () => void];

export const useToggle = (initialValue = false): ToggleResult => {
  const [flag, setFlag] = useState(initialValue);
  const toggleFlag = useCallback(() => setFlag((prev) => !prev), []);
  const setToTrue = useCallback(() => setFlag(true), []);
  const setToFalse = useCallback(() => setFlag(false), []);

  return [flag, toggleFlag, setToTrue, setToFalse];
};

export const useDomId = (): string => {
  const { current: id } = useRef(`dom-${uuid()}`);
  return id;
};

export const useElementRef = <T>() => useRef<T | null>(null);
