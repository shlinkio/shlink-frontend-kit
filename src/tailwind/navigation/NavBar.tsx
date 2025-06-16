import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import type { FC, HTMLProps } from 'react';
import { useEffect } from 'react';
import type { LinkProps } from 'react-router';
import { Link,useLocation  } from 'react-router';
import { useToggle } from '../../hooks';
import { Button } from '../form';
import type { RequiredReactNode } from '../types';
import type { DropdownProps } from './Dropdown';
import { Dropdown as BaseDropdown } from './Dropdown';

const MenuItem: FC<LinkProps & { active?: boolean }> = ({ className, active, ...props }) => (
  <li role="menuitem" className="tw:w-full tw:flex">
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

const Dropdown: FC<Omit<DropdownProps, 'menuAlignment' | 'buttonVariant' | 'menuOffset'>> = (
  { containerClassName, buttonClassName, menuClassName, ...props },
) => {
  return (
    <li role="menuitem" className="tw:w-full tw:flex">
      <BaseDropdown
        containerClassName={clsx('tw:max-md:w-full', containerClassName)}
        buttonVariant="text"
        buttonClassName={clsx(
          'tw:text-white tw:opacity-60 tw:highlight:opacity-100 tw:transition-opacity',
          'tw:px-2 tw:py-3',
          'tw:max-md:w-full tw:max-md:px-3 tw:max-md:py-2',
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
  const { pathname } = useLocation();

  // In mobile devices, collapse the navbar when the pathname changes
  useEffect(() => closeMenu(), [pathname, closeMenu]);

  return (
    <nav
      className={clsx(
        'tw:w-full tw:relative',
        'tw:text-white tw:bg-lm-main tw:dark:bg-dm-main',
        'tw:flex tw:max-md:flex-col tw:items-center tw:justify-between',
        className,
      )}
    >
      <div className="tw:flex tw:items-center tw:justify-between tw:w-full">
        <h4 className="tw:px-4 tw:py-3">{brand}</h4>
        <Button
          variant="secondary"
          className={clsx(
            'tw:md:hidden tw:mx-2 tw:[&]:px-2',
            'tw:opacity-60 tw:highlight:opacity-100 tw:transition-opacity',
            'tw:[&]:text-inherit tw:[&]:border-white tw:[&]:highlight:bg-transparent',
          )}
          onClick={toggleMenu}
          aria-label={`${menuOpen ? 'Hide' : 'Show'} menu`}
        >
          <FontAwesomeIcon icon={menuOpen ? faChevronUp : faChevronDown} />
        </Button>
      </div>
      <ul
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
