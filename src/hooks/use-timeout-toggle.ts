import { useCallback, useRef, useState } from 'react';

export const useTimeoutToggle = (
  initialValue = false,
  delay = 2000,

  // Test seams
  setTimeout = window.setTimeout,
  clearTimeout = window.clearTimeout,
): [boolean, () => void] => {
  const [flag, setFlag] = useState<boolean>(initialValue);
  const initialValueRef = useRef(initialValue);
  const timeout = useRef<number>(undefined);
  const callback = useCallback(() => {
    setFlag(!initialValueRef.current);

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => setFlag(initialValueRef.current), delay);
  }, [clearTimeout, delay, setTimeout]);

  return [flag, callback];
};

export type TimeoutToggle = typeof useTimeoutToggle;
