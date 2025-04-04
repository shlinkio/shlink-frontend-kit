import { clsx } from 'clsx';
import { forwardRef } from 'react';
import type { BooleanControlProps } from './BooleanControl';
import { BooleanControl } from './BooleanControl';

export type ToggleSwitchProps = BooleanControlProps;

export const ToggleSwitch = forwardRef<HTMLInputElement, ToggleSwitchProps>(({ className, ...rest }, ref) => (
  <BooleanControl
    ref={ref}
    className={clsx(
      'tw:rounded-full tw:w-8 tw:h-4',
      'tw:bg-(image:--circle-grey-dark) tw:dark:bg-(image:--circle-grey-light) tw:checked:bg-(image:--circle-white)',
      'tw:focus-visible:not-checked:bg-(image:--circle-light-blue)',
      'tw:checked:bg-right tw:transition-[background-position]',
      className,
    )}
    {...rest}
  />
));
