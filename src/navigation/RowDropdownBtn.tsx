import { faEllipsisV as menuIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FC, PropsWithChildren } from 'react';
import { DropdownBtn } from './DropdownBtn';

export type DropdownBtnMenuProps = PropsWithChildren<{
  minWidth?: number;

  /** Accessible label for screen readers. Defaults to "Options" */
  label?: string;
}>;

/** @deprecated */
export const RowDropdownBtn: FC<DropdownBtnMenuProps> = ({ children, minWidth, label = 'Options' }) => (
  <DropdownBtn
    text={<FontAwesomeIcon className="px-1" icon={menuIcon} />}
    aria-label={label}
    size="sm"
    minWidth={minWidth}
    end
    noCaret
    inline
  >
    {children}
  </DropdownBtn>
);
