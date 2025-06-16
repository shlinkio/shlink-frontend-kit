import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import type { Size } from '../types';

export type BaseInputProps = {
  size?: Size;
  feedback?: 'error';

  /**
   * Whether the input should have an opinionated style or not. Defaults to 'default'.
   * An unstyled input can be useful to wrap or customize.
   */
  variant?: 'default' | 'unstyled';
};

export type InputProps =
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'checked' | 'defaultChecked'> & BaseInputProps & {
    borderless?: boolean;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  borderless = false,
  size = 'md',
  feedback,
  variant = 'default',
  className,
  disabled,
  ...rest
}, ref) => {
  return (
    <input
      ref={ref}
      className={clsx(
        'tw:outline-none',
        variant === 'default' && [
          'tw:w-full',
          {
            'tw:focus-ring': !feedback,
            'tw:focus-ring-danger': feedback === 'error',

            'tw:px-2 tw:py-1 tw:text-sm': size === 'sm',
            'tw:px-3 tw:py-1.5': size === 'md',
            'tw:px-4 tw:py-2 tw:text-xl': size === 'lg',

            'tw:rounded-md tw:border': !borderless,
            'tw:border-lm-input-border tw:dark:border-dm-input-border': !borderless && !feedback,
            'tw:border-danger': !borderless && feedback === 'error',

            'tw:bg-lm-disabled-input tw:dark:bg-dm-disabled-input': disabled,
            'tw:bg-lm-primary tw:dark:bg-dm-primary': !disabled,
            // Use different background color when rendered inside a card
            'tw:group-[&]/card:bg-lm-input tw:group-[&]/card:dark:bg-dm-input': !disabled,
          },
        ],
        className,
      )}
      disabled={disabled}
      {...rest}
    />
  );
});
