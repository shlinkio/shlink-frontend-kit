import { useCallback, useState } from 'react';

export type ToggleResult = {
  flag: boolean;
  toggle: () => void;
  setToTrue: () => void;
  setToFalse: () => void;
};

export function useToggle(initialValue = false): ToggleResult {
  const [flag, setFlag] = useState(initialValue);
  const toggle = useCallback(() => setFlag((prev) => !prev), []);
  const setToTrue = useCallback(() => setFlag(true), []);
  const setToFalse = useCallback(() => setFlag(false), []);

  return { flag, toggle, setToTrue, setToFalse };
}
