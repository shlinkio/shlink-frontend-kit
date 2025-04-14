import { useCallback, useState } from 'react';

/** @deprecated */
export type ToggleResultTuple = [boolean, () => void, () => void, () => void];

export type ToggleResultObject = {
  flag: boolean;
  toggle: () => void;
  setToTrue: () => void;
  setToFalse: () => void;
};

export type ToggleResult = ToggleResultTuple | ToggleResultObject;

/** @deprecated Returning result as tuple is deprecated */
export function useToggle(initialValue?: boolean, asObject?: false): ToggleResultTuple;
/**
 * @param asObject - Whether the result should be returned as an object or as a tuple.
 *                   Deprecated. Future releases will always return an object.
 */
export function useToggle(initialValue: boolean, asObject: true): ToggleResultObject;
export function useToggle(initialValue = false, asObject = false): ToggleResult {
  const [flag, setFlag] = useState(initialValue);
  const toggle = useCallback(() => setFlag((prev) => !prev), []);
  const setToTrue = useCallback(() => setFlag(true), []);
  const setToFalse = useCallback(() => setFlag(false), []);

  return asObject
    ? { flag, toggle, setToTrue, setToFalse }
    : [flag, toggle, setToTrue, setToFalse];
}
