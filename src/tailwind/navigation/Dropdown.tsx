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

  /** Classes to be set on the containing wrapper element */
  containerClassName?: string;
  /** Classes to be set on the menu element */
  menuClassName?: string;

  /**
   * Whether the menu should align with the right or the left side of the toggle button in case it is bigger.
   * Defaults to 'left'.
   */
  menuAlignment?: 'left' | 'right';
}>;

const BaseDropdown: FC<DropdownProps> = ({
  children,
  menuAlignment = 'left',
  buttonContent,
  buttonClassName,
  buttonSize = 'md',
  containerClassName,
  menuClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: menuAlignment === 'right' ? 'bottom-end' : 'bottom-start',
    middleware: [flip(), offset(3)],
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

    // Close menu when pressing Escape
    container.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }, { signal: controller.signal });

    // Close menu when clicking anywhere except the toggle button
    document.body.addEventListener('click', (e) => {
      if (!e.composedPath().includes(button)) {
        setIsOpen(false);
      }
    }, { signal: controller.signal });

    return () => controller.abort();
  }, []);

  return (
    <div ref={containerRef} className={clsx('tw:relative tw:inline-block', containerClassName)}>
      <button
        ref={buttonRef}
        {...getReferenceProps()}
        aria-haspopup
        aria-expanded={isOpen}
        aria-controls={menuId}
        className={clsx(
          'tw:flex tw:justify-between tw:items-center tw:gap-x-2',
          'tw:rounded-md tw:focus-ring',
          'tw:border tw:border-lm-border tw:dark:border-dm-border tw:bg-lm-primary tw:dark:bg-dm-primary',
          {
            'tw:px-1.5 tw:py-1 tw:text-sm': buttonSize === 'sm',
            'tw:px-3 tw:py-1.5': buttonSize === 'md',
            'tw:px-4 tw:py-2 tw:text-lg': buttonSize === 'lg',
          },
          buttonClassName,
        )}
      >
        {buttonContent}
        <FontAwesomeIcon icon={faCaretDown} size="xs" />
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
