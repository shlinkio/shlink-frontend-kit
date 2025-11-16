import { flip, offset, useClick, useFloating, useInteractions } from '@floating-ui/react';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import type { FC, PropsWithChildren } from 'react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
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
  const closeDropdown = useCallback(({ focusButton = true }: { focusButton?: boolean } = {}) => {
    setIsOpen(false);
    // Return focus to dropdown after closing it
    if (focusButton) {
      buttonRef.current?.focus();
    }
  }, []);
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
    if (!container || !isOpen) {
      return () => {};
    }

    const controller = new AbortController();

    // Close menu when clicking outside the dropdown container
    document.body.addEventListener('click', (e) => {
      if (!e.composedPath().includes(container)) {
        closeDropdown();
      }
    }, { signal: controller.signal });

    return () => controller.abort();
  }, [closeDropdown, isOpen]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={containerRef}
      className={clsx('relative inline-block', containerClassName)}
      onKeyDown={(e) => {
        // Close menu when pressing Escape
        if (e.key === 'Escape') {
          closeDropdown();
        }
      }}
      onBlur={(e) => {
        // Close menu when focusing away
        if (e.relatedTarget && !containerRef.current!.contains(e.relatedTarget as HTMLElement)) {
          closeDropdown({ focusButton: false });
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
          'flex items-center rounded-md focus-ring',
          {
            'justify-between': !caretless,
            'cursor-pointer': !buttonDisabled,
            'pointer-events-none opacity-50': buttonDisabled,

            // Button variant
            'border border-lm-border dark:border-dm-border': buttonVariant === 'button',
            'bg-lm-primary dark:bg-dm-primary': buttonVariant === 'button',
            // Use different bg color when inside a card
            'group-[&]/card:bg-lm-input group-[&]/card:dark:bg-dm-input': buttonVariant === 'button',

            // Link variant
            'text-lm-brand dark:text-dm-brand': buttonVariant === 'link',
            'highlight:text-lm-brand-dark dark:highlight:text-dm-brand-dark highlight:underline': buttonVariant === 'link',

            // Button sizes
            'px-1.5 py-1 text-sm': buttonVariant !== 'text' && buttonSize === 'sm',
            'px-3 py-1.5': buttonVariant !== 'text' && buttonSize === 'md',
            'px-4 py-2 text-lg': buttonVariant !== 'text' && buttonSize === 'lg',
            'gap-x-1.5': buttonSize === 'sm',
            'gap-x-2': buttonSize !== 'sm',
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
        {!caretless && <FontAwesomeIcon icon={faCaretDown} size="xs" widthAuto />}
      </button>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="min-w-full z-500"
          {...getFloatingProps()}
        >
          <Menu
            className={menuClassName}
            id={menuId}
            focusableElementsSelector={
              '[role="menuitem"]:not([disabled]):not([aria-disabled]),input:not([disabled]),select:not([disabled])'
            }
            focusFirstItem
            onItemClick={closeDropdown}
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
