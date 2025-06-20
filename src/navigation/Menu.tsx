import { clsx } from 'clsx';
import type { FC, HTMLProps, PropsWithChildren } from 'react';
import { useRef } from 'react';
import type { LinkProps } from 'react-router';
import { Link } from 'react-router';
import { useArrowKeyNavigation } from '../hooks';
import type { CardProps } from '../surfaces';
import { Card } from '../surfaces';

type ButtonProps = Omit<HTMLProps<HTMLButtonElement>, 'role' | 'disabled' | 'aria-disabled' | 'tabIndex' | 'type'>;
type AnchorProps = Omit<LinkProps, 'role' | 'aria-disabled' | 'tabIndex' | 'type'>;

export type MenuItemProps = (ButtonProps | AnchorProps) & {
  selected?: boolean;
  disabled?: boolean;
};

const Item: FC<MenuItemProps> = ({ className, selected, disabled, ...rest }) => {
  const isLink = 'to' in rest && typeof rest.to === 'string';
  const Tag = isLink ? Link : 'button';

  return (
    // @ts-expect-error The Tag is inferred from provided props, so they should always match
    <Tag
      role="menuitem"
      data-selected={selected}
      className={clsx(
        'flex items-center gap-2',
        'w-full px-3 py-1.5 focus-ring',
        // Overwrite link styles in case a Link is being used
        'no-underline text-inherit',
        {
          'cursor-pointer': !disabled,
          'pointer-events-none opacity-50': disabled,
          'bg-lm-secondary dark:bg-dm-secondary': selected && !disabled,
          'highlight:bg-lm-secondary dark:highlight:bg-dm-secondary highlight:z-1 relative': !selected && !disabled,
        },
        className,
      )}
      tabIndex={-1}
      disabled={!isLink ? disabled : undefined}
      aria-disabled={isLink ? disabled : undefined}
      type={isLink ? undefined : 'button'}
      {...rest}
    />
  );
};

const Separator: FC = () => (
  // TODO Use an <hr /> tag once tailwind styles are not set with !important
  <div role="separator" aria-hidden className="border-b border-lm-border dark:border-dm-border my-2" />
);

const Title: FC<PropsWithChildren> = ({ children }) => (
  <div
    // TODO Use an <h6 /> tag once tailwind styles are not set with !important
    role="heading"
    aria-level={6}
    aria-hidden
    className={clsx(
      'flex items-center w-full px-3 py-1.5',
      'text-gray-500 text-sm font-semibold',
    )}
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </div>
);

/**
 * Allows to add any arbitrary content inside a Menu
 */
const Misc: FC<HTMLProps<HTMLDivElement>> = ({ className, onClick, ...rest }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div
    className={clsx('px-3 py-1.5', className)}
    {...rest}
    onClick={(e) => {
      e.stopPropagation();
      onClick?.(e);
    }}
  />
);

export type MenuProps = Omit<CardProps, 'role'> & {
  /**
   * Selector to determine elements that should be part of the focus sequence.
   * Defaults to '[role="menuitem"]:not([disabled]):not([aria-disabled])'
   */
  focusableElementsSelector?: string;

  /**
   * Whether first focusable item should be focused or not.
   * Defaults to false.
   */
  focusFirstItem?: boolean;
};

const BaseMenu: FC<MenuProps> = ({
  children,
  className,
  focusableElementsSelector = '[role="menuitem"]:not([disabled]):not([aria-disabled])',
  focusFirstItem = false,
  ...rest
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useArrowKeyNavigation(cardRef, { elementsSelector: focusableElementsSelector, focusFirstItem });

  return (
    <Card ref={cardRef} role="menu" className={clsx('py-2 whitespace-nowrap', className)} {...rest}>
      {children}
    </Card>
  );
};

export const Menu = Object.assign(BaseMenu, { Item, Separator, Title, Misc });
