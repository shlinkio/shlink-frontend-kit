import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import type { FC } from 'react';
import type { DropdownProps } from './Dropdown';
import { Dropdown } from './Dropdown';

export type RowDropdownProps = Omit<DropdownProps, 'caretless' | 'buttonContent' | 'buttonVariant'>;

/**
 * A Dropdown designed to be used as the options menu in a table row
 */
const BaseRowDropdown: FC<RowDropdownProps> = ({ buttonLabel = 'Options', buttonSize = 'md', ...rest }) => (
  <Dropdown
    buttonContent={(
      <FontAwesomeIcon
        icon={faEllipsisV}
        className={clsx({ 'px-1': buttonSize === 'sm' })}
      />
    )}
    caretless
    buttonLabel={buttonLabel}
    buttonSize={buttonSize}
    {...rest}
  />
);

export const RowDropdown = Object.assign(BaseRowDropdown, {
  Item: Dropdown.Item,
  Separator: Dropdown.Separator,
  Title: Dropdown.Title,
  Misc: Dropdown.Misc,
});
