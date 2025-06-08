import { clsx } from 'clsx';
import type { FC, HTMLProps, PropsWithChildren } from 'react';
import { useRef } from 'react';
import type { LinkProps } from 'react-router';
import { Link } from 'react-router';
import { useArrowKeyNavigation } from '../../hooks';
import type { CardProps } from '../surfaces';
import { Card } from '../surfaces';

type ButtonProps = Omit<HTMLProps<HTMLButtonElement>, 'role' | 'disabled' | 'aria-disabled' | 'tabIndex'>;
type AnchorProps = Omit<LinkProps, 'role' | 'aria-disabled' | 'tabIndex'>;

export type MenuItemProps = (ButtonProps | AnchorProps) & {
  selected?: boolean;
  disabled?: boolean;
};

const Item: FC<MenuItemProps> = ({ className, selected, disabled, ...rest }) => {
  const isLink = 'to' in rest;
  const Tag = isLink ? Link : 'button';

  return (
    // @ts-expect-error The Tag is inferred from provided props, so they should always match
    <Tag
      role="menuitem"
      data-selected={selected}
      className={clsx(
        'tw:flex tw:items-center tw:w-full tw:px-3 tw:py-1.5 tw:focus-ring',
        // Overwrite link styles in case a Link is being used
        'tw:no-underline tw:text-inherit',
        {
          'tw:pointer-events-none tw:opacity-50': disabled,
          'tw:bg-lm-secondary tw:dark:bg-dm-secondary': selected && !disabled,
          'tw:highlight:bg-lm-secondary tw:dark:highlight:bg-dm-secondary tw:highlight:z-1 tw:relative': !selected && !disabled,
        },
        className,
      )}
      tabIndex={-1}
      disabled={!isLink ? disabled : undefined}
      aria-disabled={isLink ? disabled : undefined}
      {...rest}
    />
  );
};

const Separator: FC = () => (
  // TODO Use an <hr /> tag once tailwind styles are not set with !important
  <div role="separator" aria-hidden className="tw:border-b tw:border-lm-border tw:dark:border-dm-border tw:my-2" />
);

const Title: FC<PropsWithChildren> = ({ children }) => (
  <div
    // TODO Use an <h6 /> tag once tailwind styles are not set with !important
    role="heading"
    aria-level={6}
    aria-hidden
    className={clsx(
      'tw:flex tw:items-center tw:w-full tw:px-3 tw:py-1.5',
      'tw:text-gray-500 tw:text-sm tw:font-semibold',
    )}
  >
    {children}
  </div>
);

/**
 * Allows to add any arbitrary content inside a Menu
 */
const Misc: FC<HTMLProps<HTMLDivElement>> = ({ className, ...rest }) => (
  <div className={clsx('tw:px-3 tw:py-1.5', className)} {...rest} />
);

export type MenuProps = Omit<CardProps, 'role'> & {
  /**
   * Selector to determine elements that should be part of the focus sequence.
   * Defaults to '[role="menuitem"]:not([disabled]):not([aria-disabled])'
   */
  focusableElementsSelector?: string;
};

const BaseMenu: FC<MenuProps> = ({
  children,
  className,
  focusableElementsSelector = '[role="menuitem"]:not([disabled]):not([aria-disabled])',
  ...rest
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useArrowKeyNavigation(cardRef, { elementsSelector: focusableElementsSelector });

  return (
    <Card ref={cardRef} role="menu" className={clsx('tw:py-2', className)} {...rest}>
      {children}
    </Card>
  );
};

export const Menu = Object.assign(BaseMenu, { Item, Separator, Title, Misc });
