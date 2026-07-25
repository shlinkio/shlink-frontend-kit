import { clsx } from 'clsx';
import type { FC, PropsWithChildren } from 'react';
import type { Size } from '../types';

export type ResultProps = PropsWithChildren<{
  variant: 'success' | 'error' | 'warning';
  className?: string;
  size?: Size;
}>;

/**
 * Component used to display the result of an operation, which can be a success, failure or warning.
 */
export const Result: FC<ResultProps> = ({ variant, className, size = 'md', children }) => (
  <div
    className={clsx(
      'rounded-md text-center',
      {
        'p-2': size === 'sm',
        'p-4': size === 'md',
        'p-6': size === 'lg',
        '[&]:text-white': variant !== 'warning',
        'bg-lm-brand dark:bg-dm-brand': variant === 'success',
        'bg-danger': variant === 'error',
        'bg-warning text-black': variant === 'warning',
      },
      className,
    )}
  >
    {children}
  </div>
);
