import { clsx } from 'clsx';
import type { FC } from 'react';
import type { BooleanControlProps } from './BooleanControl';
import { BooleanControl } from './BooleanControl';

export type ToggleSwitchProps = BooleanControlProps;

export const ToggleSwitch: FC<ToggleSwitchProps> = ({ className, ...rest }) => (
  <BooleanControl
    className={clsx(
      'tw:rounded-full tw:w-8 tw:h-4',
      'tw:bg-(image:--circle-grey-dark) tw:dark:bg-(image:--circle-grey-light) tw:checked:bg-(image:--circle-white)',
      'tw:focus-visible:not-checked:bg-(image:--circle-light-blue)',
      'tw:checked:bg-right tw:transition-[background-position]',
      className,
    )}
    {...rest}
  />
);
