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
      'tw:rounded-md tw:text-center',
      {
        'tw:p-2': size === 'sm',
        'tw:p-4': size === 'md',
        'tw:p-6': size === 'lg',
        'tw:[&]:text-white': variant !== 'warning',
        'tw:bg-brand': variant === 'success',
        'tw:bg-danger': variant === 'error',
        'tw:bg-warning tw:text-black': variant === 'warning',
      },
      className,
    )}
  >
    {children}
  </div>
);
