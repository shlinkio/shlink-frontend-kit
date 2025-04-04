import clsx from 'clsx';
import type { HTMLProps, PropsWithChildren } from 'react';
import { forwardRef } from 'react';
import type { BaseInputProps } from './Input';

type SelectElementProps = Omit<HTMLProps<HTMLSelectElement>, 'size' | 'checked' | 'defaultChecked'>;

export type SelectProps = PropsWithChildren<SelectElementProps & BaseInputProps>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  className,
  size = 'md',
  feedback,
  style = {},
  disabled,
  ...rest
}, ref) => (
  <select
    ref={ref}
    className={clsx(
      'tw:w-full tw:appearance-none tw:pr-9',
      'tw:bg-(image:--chevron-down) tw:bg-no-repeat',
      {
        'tw:focus-ring': !feedback,
        'tw:focus-ring-danger': feedback === 'error',
      },
      'tw:rounded-md tw:border',
      {
        'tw:border-lm-input-border tw:dark:border-dm-input-border': !feedback,
        'tw:border-danger': feedback === 'error',
      },
      {
        'tw:pl-2 tw:py-1 tw:text-sm': size === 'sm',
        'tw:pl-3 tw:py-1.5': size === 'md',
        'tw:pl-4 tw:py-2 tw:text-xl': size === 'lg',
        'tw:bg-lm-disabled-input tw:dark:bg-dm-disabled-input': disabled,
        // Apply different background color when rendered inside a card
        'tw:bg-lm-primary tw:dark:bg-dm-primary tw:group-[&]/card:bg-lm-input tw:group-[&]/card:dark:bg-dm-input': !disabled,
      },
      className,
    )}
    style={{
      ...style,
      background: 'right 0.75rem center / 16px 12px',
    }}
    disabled={disabled}
    {...rest}
  />
));
