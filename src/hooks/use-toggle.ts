import { useCallback, useState } from 'react';

export type ToggleResult = [boolean, () => void, () => void, () => void];

export const useToggle = (initialValue = false): ToggleResult => {
  const [flag, setFlag] = useState(initialValue);
  const toggleFlag = useCallback(() => setFlag((prev) => !prev), []);
  const setToTrue = useCallback(() => setFlag(true), []);
  const setToFalse = useCallback(() => setFlag(false), []);

  return [flag, toggleFlag, setToTrue, setToFalse];
};
