import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import type { FC, HTMLProps, Ref } from 'react';
import type { Size } from '../types';

export type CloseButtonProps = {
  label?: string;
  onClick?: HTMLProps<HTMLButtonElement>['onClick'];
  className?: string;
  size?: Size;
  solid?: boolean;
  ref?: Ref<HTMLButtonElement>;
};

export const CloseButton: FC<CloseButtonProps> = ({ onClick, className, label = 'Close', size = 'lg', solid, ref }) => (
  <button
    ref={ref}
    type="button"
    onClick={onClick}
    className={clsx(
      'rounded-md focus-ring cursor-pointer',
      {
        'opacity-50 highlight:opacity-80 transition-opacity': !solid,
      },
      className,
    )}
    aria-label={label}
  >
    <FontAwesomeIcon icon={faClose} size={size === 'lg' ? 'xl' : size === 'md' ? 'lg' : undefined} />
  </button>
);
