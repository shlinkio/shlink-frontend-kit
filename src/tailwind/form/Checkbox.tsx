import { clsx } from 'clsx';
import { forwardRef } from 'react';
import type { BooleanControlProps } from './BooleanControl';
import { BooleanControl } from './BooleanControl';

export type CheckboxProps = BooleanControlProps;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, ...rest }, ref) => (
  <BooleanControl
    ref={ref}
    className={clsx('tw:rounded-sm tw:w-4 tw:h-4 tw:checked:bg-(image:--tick) tw:bg-center', className)}
    {...rest}
  />
));
