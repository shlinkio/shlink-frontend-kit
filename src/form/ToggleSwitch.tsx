import { clsx } from 'clsx';
import { forwardRef } from 'react';
import type { BooleanControlProps } from './BooleanControl';
import { BooleanControl } from './BooleanControl';

export type ToggleSwitchProps = BooleanControlProps;

export const ToggleSwitch = forwardRef<HTMLInputElement, ToggleSwitchProps>(({ className, ...rest }, ref) => (
  <BooleanControl
    ref={ref}
    className={clsx(
      'rounded-full w-8 h-4',
      'bg-(image:--circle-grey-dark) dark:bg-(image:--circle-grey-light) checked:bg-(image:--circle-white)',
      'focus-visible:not-checked:bg-(image:--circle-blue-light)',
      'checked:bg-right transition-[background-position]',
      className,
    )}
    {...rest}
  />
));
