import { clsx } from 'clsx';
import type { FC } from 'react';
import type { BooleanControlProps } from './BooleanControl';
import { BooleanControl } from './BooleanControl';

export type CheckboxProps = BooleanControlProps;

export const Checkbox: FC<CheckboxProps> = ({ className, ...rest }) => (
  <BooleanControl
    className={clsx('tw:rounded-sm tw:w-4 tw:h-4 tw:checked:bg-(image:--tick) tw:bg-center', className)}
    {...rest}
  />
);
