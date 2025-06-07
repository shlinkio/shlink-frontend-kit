import { clsx } from 'clsx';
import type { FC, HTMLProps, PropsWithChildren } from 'react';
import type { LinkProps } from 'react-router';
import { Link } from 'react-router';
import { Card } from '../surfaces';

export type MenuItemProps = {
  selected?: boolean;
  disabled?: boolean;
} & Omit<HTMLProps<HTMLButtonElement> | LinkProps, 'role'>;

const Item: FC<MenuItemProps> = ({ className, selected, disabled, ...rest }) => {
  const Tag = 'to' in rest ? Link : 'button';

  return (
    // @ts-expect-error The Tag is inferred from provided props, so they should always match
    <Tag
      role="menuitem"
      className={clsx(
        'tw:flex tw:items-center tw:w-full tw:px-3 tw:py-1.5 tw:focus-ring',
        {
          'tw:pointer-events-none tw:opacity-50': disabled,
          'tw:bg-lm-secondary tw:dark:bg-dm-secondary': selected && !disabled,
          'tw:highlight:bg-lm-secondary tw:dark:highlight:bg-dm-secondary': !selected && !disabled,
        },
        className,
      )}
      tabIndex={-1}
      disabled={disabled}
      aria-disabled={disabled}
      {...rest}
    />
  );
};

const Separator: FC = () => (
  // TODO Use an <hr /> tag once tailwind styles are not set with !important
  <div role="separator" className="tw:border-b tw:border-lm-border tw:dark:border-dm-border tw:my-2" />
);

const Title: FC<PropsWithChildren> = ({ children }) => (
  <div
    // TODO Use an <h6 /> tag once tailwind styles are not set with !important
    role="heading"
    aria-level={6}
    className={clsx(
      'tw:flex tw:items-center tw:w-full tw:px-3 tw:py-1.5',
      'tw:text-gray-500 tw:text-sm tw:font-semibold',
    )}
  >
    {children}
  </div>
);

export type MenuProps = Omit<HTMLProps<HTMLDivElement>, 'role'>;

const BaseMenu: FC<MenuProps> = ({ children, className, ...rest }) => (
  <Card
    role="menu"
    className={clsx('tw:py-2 tw:inline-block', className)}
    {...rest}
  >
    {children}
  </Card>
);

export const Menu = Object.assign(BaseMenu, { Item, Separator, Title });
