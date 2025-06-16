import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import type { HTMLProps } from 'react';
import { forwardRef } from 'react';
import type { Size } from '../types';

export type CloseButtonProps = {
  label?: string;
  onClick?: HTMLProps<HTMLButtonElement>['onClick'];
  className?: string;
  size?: Size;
  solid?: boolean;
};

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>((
  { onClick, className, label = 'Close', size = 'lg', solid },
  ref,
) => (
  <button
    ref={ref}
    type="button"
    onClick={onClick}
    className={clsx(
      'tw:rounded-md tw:focus-ring tw:cursor-pointer',
      {
        'tw:opacity-50 tw:highlight:opacity-80 tw:transition-opacity': !solid,
      },
      className,
    )}
    aria-label={label}
  >
    <FontAwesomeIcon icon={faClose} size={size === 'lg' ? 'xl' : size === 'md' ? 'lg' : undefined} />
  </button>
));
