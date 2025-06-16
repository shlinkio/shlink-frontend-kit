import { flip, offset, useClick, useFloating, useInteractions } from '@floating-ui/react';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import type { FC, PropsWithChildren } from 'react';
import { useEffect, useId, useRef, useState } from 'react';
import type { RequiredReactNode, Size } from '../types';
import { Menu } from './Menu';

export type DropdownProps = PropsWithChildren<{
  buttonContent: RequiredReactNode;
  buttonSize?: Size;
  buttonClassName?: string;
  buttonVariant?: 'button' | 'link' | 'text';
  buttonDisabled?: boolean;

  /** Set as the button's `aria-label` attribute */
  buttonLabel?: string;
  /** Classes to be set on the containing wrapper element */
  containerClassName?: string;
  /** Classes to be set on the menu element */
  menuClassName?: string;

  /**
   * Whether the menu should align with the right or the left side of the toggle button in case it is bigger.
   * Defaults to 'left'.
   */
  menuAlignment?: 'left' | 'right';

  /** Distance between toggle button and menu when open, in pixels. Defaults to 3 */
  menuOffset?: number;
  /** Whether to hide the caret or not. Defaults to false */
  caretless?: boolean;
}>;

const BaseDropdown: FC<DropdownProps> = ({
  children,
  menuAlignment = 'left',
  buttonVariant = 'button',
  buttonContent,
  buttonClassName,
  buttonSize = 'md',
  buttonDisabled = false,
  containerClassName,
  menuClassName,
  caretless,
  buttonLabel,
  menuOffset = 3,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: menuAlignment === 'right' ? 'bottom-end' : 'bottom-start',
    middleware: [flip(), offset(menuOffset)],
    // eslint-disable-next-line react-compiler/react-compiler
    elements: { reference: buttonRef.current },
  });
  const click = useClick(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
  ]);
  const menuId = useId();

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    const button = buttonRef.current;
    if (!container || !button) {
      return () => {};
    }

    const controller = new AbortController();

    // Close menu when clicking anywhere except the toggle button
    document.body.addEventListener('click', (e) => {
      if (!e.composedPath().includes(button)) {
        setIsOpen(false);
      }
    }, { signal: controller.signal });

    return () => controller.abort();
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={containerRef}
      className={clsx('tw:relative tw:inline-block', containerClassName)}
      onKeyDown={(e) => {
        // Close menu when pressing Escape
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      }}
      onBlur={(e) => {
        // Close menu when focusing away
        if (e.relatedTarget && !containerRef.current!.contains(e.relatedTarget as HTMLElement)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        ref={buttonRef}
        {...getReferenceProps()}
        type="button"
        aria-haspopup
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={buttonLabel}
        disabled={buttonDisabled}
        className={clsx(
          'tw:flex tw:items-center tw:rounded-md tw:focus-ring',
          {
            'tw:justify-between': !caretless,
            'tw:cursor-pointer': !buttonDisabled,
            'tw:pointer-events-none tw:opacity-50': buttonDisabled,

            // Button variant
            'tw:border tw:border-lm-border tw:dark:border-dm-border': buttonVariant === 'button',
            'tw:bg-lm-primary tw:dark:bg-dm-primary': buttonVariant === 'button',
            // Use different bg color when inside a card
            'tw:group-[&]/card:bg-lm-input tw:group-[&]/card:dark:bg-dm-input': buttonVariant === 'button',

            // Link variant
            'tw:text-lm-brand tw:dark:text-dm-brand': buttonVariant === 'link',
            'tw:highlight:text-lm-brand-dark tw:dark:highlight:text-dm-brand-dark tw:highlight:underline': buttonVariant === 'link',

            // Button sizes
            'tw:px-1.5 tw:py-1 tw:text-sm': buttonVariant !== 'text' && buttonSize === 'sm',
            'tw:px-3 tw:py-1.5': buttonVariant !== 'text' && buttonSize === 'md',
            'tw:px-4 tw:py-2 tw:text-lg': buttonVariant !== 'text' && buttonSize === 'lg',
            'tw:gap-x-1.5': buttonSize === 'sm',
            'tw:gap-x-2': buttonSize !== 'sm',
          },
          buttonClassName,
        )}
        onKeyDown={(e) => {
          // Open dropdown when pressing ArrowDown
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
      >
        {buttonContent}
        {!caretless && <FontAwesomeIcon icon={faCaretDown} size="xs" />}
      </button>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="tw:min-w-full tw:z-1000"
          {...getFloatingProps()}
        >
          <Menu
            className={menuClassName}
            id={menuId}
            focusableElementsSelector={
              '[role="menuitem"]:not([disabled]):not([aria-disabled]),input:not([disabled]),select:not([disabled])'
            }
            focusFirstItem
          >
            {children}
          </Menu>
        </div>
      )}
    </div>
  );
};

export const Dropdown = Object.assign(BaseDropdown, {
  Item: Menu.Item,
  Separator: Menu.Separator,
  Title: Menu.Title,
  Misc: Menu.Misc,
});
