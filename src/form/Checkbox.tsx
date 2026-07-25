import { clsx } from 'clsx';
import type { FC } from 'react';
import type { BooleanControlProps } from './BooleanControl';
import { BooleanControl } from './BooleanControl';

export type CheckboxProps = BooleanControlProps;

export const Checkbox: FC<CheckboxProps> = ({ className, ...rest }) => (
  <BooleanControl
    className={clsx('rounded-sm min-w-4 w-4 h-4 checked:bg-(image:--tick) bg-center', className)}
    {...rest}
  />
);
