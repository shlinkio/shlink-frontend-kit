import clsx from 'clsx';
import type { FC, PropsWithChildren } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import type { LinkProps } from 'react-router';
import { NavLink } from 'react-router';
import { Card } from '../surfaces';

const NavPillsContext = createContext<{ fill?: boolean } | null>(null);

export type PillProps = LinkProps;

const Pill: FC<PillProps> = ({ className, to, ...rest }) => {
  const context = useContext(NavPillsContext);

  return (
    <NavLink
      role="menuitem"
      to={to}
      className={({ isActive }) => clsx(
        'tw:px-4 tw:pt-2 tw:pb-[calc(0.5rem-3px)] tw:border-b-3',
        'tw:font-bold tw:no-underline tw:text-center tw:highlight:text-brand tw:transition-colors',
        'tw:rounded-none tw:outline-none tw:focus-visible:inset-ring-2 tw:focus-visible:inset-ring-brand/50',
        {
          'tw:border-b-brand active': isActive,
          'tw:border-b-transparent tw:text-gray-500': !isActive,
          'tw:flex-grow': context?.fill,
        },
        className,
      )}
      {...rest}
    />
  );
};

export type NavPillsProps = PropsWithChildren<{
  fill?: boolean;
  className?: string;
}>;

const BaseNavPills: FC<NavPillsProps> = ({ children, className, fill }) => {
  return (
    <NavPillsContext.Provider value={{ fill }}>
      <Card role="menubar" className={clsx('tw:flex tw:overflow-hidden', className)}>
        {children}
      </Card>
    </NavPillsContext.Provider>
  );
};

export const NavPills = Object.assign(BaseNavPills, { Pill });
