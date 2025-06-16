import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import type { FC, HTMLProps } from 'react';
import { useEffect, useId } from 'react';
import type { LinkProps } from 'react-router';
import { Link,useLocation  } from 'react-router';
import { useToggle } from '../../hooks';
import { Button } from '../form';
import type { RequiredReactNode } from '../types';
import type { DropdownProps } from './Dropdown';
import { Dropdown as BaseDropdown } from './Dropdown';

type ItemProps = {
  active?: boolean;
};

const MenuItem: FC<LinkProps & ItemProps> = ({ className, active, ...props }) => (
  <li role="menuitem" className="tw:w-full tw:flex" data-active={active}>
    <Link
      className={clsx(
        'tw:px-2 tw:py-3',
        'tw:max-md:w-full tw:max-md:px-3 tw:max-md:py-2',
        'tw:text-white tw:no-underline tw:highlight:opacity-100 tw:transition-opacity',
        {
          'tw:opacity-60': !active,
          'tw:opacity-100': active,
        },
        className,
      )}
      {...props}
    />
  </li>
);

const Dropdown: FC<Omit<DropdownProps, 'menuAlignment' | 'buttonVariant' | 'menuOffset'> & ItemProps> = (
  { containerClassName, buttonClassName, menuClassName, active, ...props },
) => {
  return (
    <li role="menuitem" aria-haspopup className="tw:w-full tw:flex" data-active={active}>
      <BaseDropdown
        containerClassName={clsx('tw:max-md:w-full', containerClassName)}
        buttonVariant="text"
        buttonClassName={clsx(
          'tw:px-2 tw:py-3',
          'tw:max-md:w-full tw:max-md:px-3 tw:max-md:py-2',
          'tw:text-white tw:highlight:opacity-100 tw:transition-opacity',
          {
            'tw:opacity-60': !active,
            'tw:opacity-100': active,
          },
          buttonClassName,
        )}
        menuAlignment="right"
        menuOffset={-3}
        menuClassName={clsx('tw:mx-2', menuClassName)}
        {...props}
      />
    </li>
  );
};

export type NavBarProps = HTMLProps<HTMLElement> & {
  brand: RequiredReactNode;
};

export const BaseNavBar: FC<NavBarProps> = ({ className, brand, children }) => {
  const { flag: menuOpen, toggle: toggleMenu, setToFalse: closeMenu } = useToggle(false, true);
  const menuId = useId();
  const toggleButtonId = useId();

  // In mobile devices, collapse the navbar when the pathname changes
  const { pathname } = useLocation();
  useEffect(() => closeMenu(), [pathname, closeMenu]);

  return (
    <nav
      className={clsx(
        'tw:w-full tw:relative',
        'tw:bg-lm-main tw:dark:bg-dm-main',
        'tw:flex tw:max-md:flex-col tw:items-center tw:justify-between',
        className,
      )}
    >
      <div className="tw:w-full tw:relative">
        <h4
          className={clsx(
            'tw:text-white tw:px-4 tw:py-3',
            'tw:max-md:w-full tw:max-md:flex tw:max-md:flex-col tw:items-center',
          )}
        >
          {brand}
        </h4>
        <Button
          id={toggleButtonId}
          variant="secondary"
          className={clsx(
            'tw:absolute tw:right-0 tw:top-[50%] tw:translate-y-[-50%]',
            'tw:md:hidden tw:mx-2 tw:[&]:px-2',
            'tw:opacity-60 tw:highlight:opacity-100 tw:transition-opacity',
            'tw:[&]:text-inherit tw:[&]:border-white tw:[&]:highlight:bg-transparent',
          )}
          onClick={toggleMenu}
          aria-label={`${menuOpen ? 'Hide' : 'Show'} menu`}
          aria-controls={menuId}
        >
          <FontAwesomeIcon icon={menuOpen ? faChevronUp : faChevronDown} />
        </Button>
      </div>
      <ul
        id={menuId}
        aria-labelledby={toggleButtonId}
        role="menu"
        className={clsx(
          'tw:m-0 tw:p-0',
          'tw:max-md:w-full tw:md:mr-2 tw:max-md:absolute tw:max-md:top-full tw:z-2000',
          'tw:flex tw:max-md:flex-col tw:items-center',
          'tw:bg-lm-main tw:dark:bg-dm-main',
          { 'tw:max-md:hidden': !menuOpen },
        )}
      >
        {children}
      </ul>
    </nav>
  );
};

export const NavBar = Object.assign(BaseNavBar, { MenuItem, Dropdown });
