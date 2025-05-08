import clsx from 'clsx';
import type { FC, PropsWithChildren } from 'react';
import { createContext,useContext  } from 'react';
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
        'tw:highlight:text-lm-brand tw:dark:highlight:text-dm-brand',
        'tw:font-bold tw:text-center tw:no-underline tw:transition-colors',
        'tw:rounded-none tw:outline-none tw:focus-visible:inset-ring-2',
        'tw:focus-visible:inset-ring-lm-brand/50 tw:dark:focus-visible:inset-ring-dm-brand/50',
        {
          'tw:text-lm-brand tw:dark:text-dm-brand': isActive,
          'tw:border-b-lm-brand tw:dark:border-b-dm-brand active': isActive,
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
