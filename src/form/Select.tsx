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
  disabled,
  ...rest
}, ref) => (
  <select
    ref={ref}
    className={clsx(
      'w-full rounded-md border appearance-none pr-9',
      'bg-(image:--chevron-down) bg-no-repeat bg-position-[right_0.75rem_center] bg-size-[16px_12px]',
      {
        'focus-ring': !feedback,
        'focus-ring-danger': feedback === 'error',

        'border-lm-input-border dark:border-dm-input-border': !feedback,
        'border-danger': feedback === 'error',

        'pl-2 py-1 text-sm': size === 'sm',
        'pl-3 py-1.5': size === 'md',
        'pl-4 py-2 text-xl': size === 'lg',

        'bg-lm-disabled-input dark:bg-dm-disabled-input': disabled,
        // Apply different background color when rendered inside a card
        'bg-lm-primary dark:bg-dm-primary group-[&]/card:bg-lm-input group-[&]/card:dark:bg-dm-input': !disabled,
      },
      className,
    )}
    disabled={disabled}
    {...rest}
  />
));
