import { clsx } from 'clsx';
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
        'px-4 pt-2 pb-[calc(0.5rem-3px)] border-b-3',
        'highlight:text-lm-brand dark:highlight:text-dm-brand',
        'font-bold text-center no-underline transition-colors',
        'rounded-none outline-none focus-visible:inset-ring-2',
        'focus-visible:inset-ring-lm-brand/50 dark:focus-visible:inset-ring-dm-brand/50',
        {
          'text-lm-brand dark:text-dm-brand': isActive,
          'border-b-lm-brand dark:border-b-dm-brand active': isActive,
          'border-b-transparent text-gray-500': !isActive,
          'flex-grow': context?.fill,
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

const BaseNavPills: FC<NavPillsProps> = ({ children, className, fill }) => (
  <NavPillsContext.Provider value={{ fill }}>
    <Card role="menubar" className={clsx('flex overflow-hidden', className)}>
      {children}
    </Card>
  </NavPillsContext.Provider>
);

export const NavPills = Object.assign(BaseNavPills, { Pill });
