import { clsx } from 'clsx';
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
        'outline-none',
        variant === 'default' && [
          'w-full',
          {
            'focus-ring': !feedback,
            'focus-ring-danger': feedback === 'error',

            'px-2 py-1 text-sm': size === 'sm',
            'px-3 py-1.5': size === 'md',
            'px-4 py-2 text-xl': size === 'lg',

            'rounded-md border': !borderless,
            'border-lm-input-border dark:border-dm-input-border': !borderless && !feedback,
            'border-danger': !borderless && feedback === 'error',

            'bg-lm-disabled-input dark:bg-dm-disabled-input': disabled,
            'bg-lm-primary dark:bg-dm-primary': !disabled,
            // Use different background color when rendered inside a card
            'group-[&]/card:bg-lm-input group-[&]/card:dark:bg-dm-input': !disabled,
          },
        ],
        className,
      )}
      disabled={disabled}
      {...rest}
    />
  );
});
