import { useCallback, useRef, useState } from 'react';
import { useTimeout } from './use-timeout';

export const useTimeoutToggle = (
  initialValue = false,
  delay = 2000,

  // Test seams
  setTimeout_ = globalThis.setTimeout.bind(globalThis),
  clearTimeout_ = globalThis.clearTimeout.bind(globalThis),
): [boolean, () => void] => {
  const { setTimeout } = useTimeout(delay, setTimeout_, clearTimeout_);
  const [flag, setFlag] = useState(initialValue);
  const initialValueRef = useRef(initialValue);

  const callback = useCallback(() => {
    // The value is set and then "reverted" using the ref, rather than the usual `setFlag(prev => !prev)` to make sure
    // the values before and after the timeout are predictable, even if the callback is invoked again before the timeout
    // resolves.
    // In practice, calling multiple times to this callback just "extends" the time until the flag is reverted.
    setFlag(!initialValueRef.current);
    setTimeout(() => setFlag(initialValueRef.current));
  }, [setTimeout]);

  return [flag, callback];
};

export type TimeoutToggle = typeof useTimeoutToggle;
