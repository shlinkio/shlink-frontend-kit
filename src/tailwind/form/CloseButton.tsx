import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import type { FC, HTMLProps } from 'react';

export type CloseButtonProps = {
  label?: string;
  onClick?: HTMLProps<HTMLButtonElement>['onClick'];
};

export const CloseButton: FC<CloseButtonProps> = ({ onClick, label = 'Close' }) => (
  <button
    type="button"
    onClick={onClick}
    className={clsx(
      'tw:opacity-50 tw:highlight:opacity-80 tw:transition-opacity',
      'tw:rounded-md tw:focus-ring',
    )}
    aria-label={label}
  >
    <FontAwesomeIcon icon={faClose} size="xl" />
  </button>
);
