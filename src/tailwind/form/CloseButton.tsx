import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import type { HTMLProps } from 'react';
import { forwardRef } from 'react';

export type CloseButtonProps = {
  label?: string;
  onClick?: HTMLProps<HTMLButtonElement>['onClick'];
  className?: string;
};

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>((
  { onClick, className, label = 'Close' },
  ref,
) => (
  <button
    ref={ref}
    type="button"
    onClick={onClick}
    className={clsx(
      'tw:opacity-50 tw:highlight:opacity-80 tw:transition-opacity',
      'tw:rounded-md tw:focus-ring tw:cursor-pointer',
      className,
    )}
    aria-label={label}
  >
    <FontAwesomeIcon icon={faClose} size="xl" />
  </button>
));
