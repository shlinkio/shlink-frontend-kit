import { useCallback, useRef, useState } from 'react';
import { useTimeout } from './use-timeout';

export type TimeoutToggleOptions = {
  /**
   * What should the flag value be initially.
   * This will drive the behavior of the callback, which will set the opposite value, and then go back to the initial
   * value after a delay.
   *
   * Defaults to false.
   */
  initialValue?: boolean;

  /** Delay in ms after which the flag should return to its initial value. Defaults to 2000 */
  delay?: number;
};

const DEFAULT_DELAY = 2000;

/**
 * Passing individual args is deprecated. Pass an object of options instead.
 */
export const useTimeoutToggle = (
  initialValueOrOptions: TimeoutToggleOptions | boolean = {},
  secondArg?: number,

  // Test seams
  setTimeout_ = globalThis.setTimeout,
  clearTimeout_ = globalThis.clearTimeout,
): [boolean, () => void] => {
  const { initialValue = false, delay = DEFAULT_DELAY } = typeof initialValueOrOptions === 'boolean' ? {
    initialValue: initialValueOrOptions,
    delay: secondArg,
  } : initialValueOrOptions;

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
