import { clsx } from 'clsx';
import { forwardRef } from 'react';
import type { BooleanControlProps } from './BooleanControl';
import { BooleanControl } from './BooleanControl';

export type CheckboxProps = BooleanControlProps;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...rest }, ref) => (
  <BooleanControl
    ref={ref}
    className={clsx('rounded-sm w-4 h-4 checked:bg-(image:--tick) bg-center', className)}
    {...rest}
  />
));
