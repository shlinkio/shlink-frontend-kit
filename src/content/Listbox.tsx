import clsx from 'clsx';
import type { ReactNode, RefObject } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { CardProps } from '../surfaces';
import { Card } from '../surfaces';

export type ListboxProps<Item> = Omit<CardProps, 'id' | 'role' | 'aria-orientation'> & {
  /** Map of items in the listbox, with a key representing them uniquely */
  items: Map<string, Item>;
  /** Invoked when the active item is selected via click or `Enter` */
  onSelectItem: (item: Item) => void;
  /** Invoked when the active item changes via vertical arrows or hover */
  onActiveItemChange?: (key: string, item: Item) => void;
  /** To customize the shape of an item */
  renderItem: (item: Item) => ReactNode;
  /** Used to link with the element controlling this listbox */
  id: string;

  /**
   * Allows to optionally anchor this listbox to another element.
   * If provided, it will attach arrow key and Enter press listeners to interact with the listbox.
   */
  anchor?: RefObject<HTMLElement | null>;

  /**
   * Message to display when the list of items is empty.
   * Defaults to 'No items'.
   */
  noItemsMessage?: string;
};

export function Listbox<Item>({ id,
  items,
  onSelectItem,
  onActiveItemChange,
  renderItem,
  className,
  noItemsMessage = 'No items',
  anchor,
  'aria-label': label = 'Items',
  ...rest
}: ListboxProps<Item>,
) {
  const [activeItem, setActiveItem] = useState(0);
  const changeActiveItem = useCallback((index: number) => {
    setActiveItem(index);
    if (onActiveItemChange) {
      const [activeKey, activeItem] = [...items.entries()][index];
      onActiveItemChange(activeKey, activeItem);
    }
  }, [items, onActiveItemChange]);

  useEffect(() => {
    const anchorEl = anchor?.current;
    if (!anchorEl) {
      return;
    }

    const handler = (e: KeyboardEvent) => {
      // Prevent default for any of the keys used to handle active descendant
      if (['Enter', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'ArrowDown') {
        changeActiveItem(Math.min(activeItem + 1, items.size - 1));
      } else if (e.key === 'ArrowUp') {
        changeActiveItem(Math.max(activeItem - 1, 0));
      } else if (e.key === 'Enter') {
        onSelectItem([...items.values()][activeItem]);
      }
    };

    anchorEl.addEventListener('keydown', handler);
    return () => anchorEl.removeEventListener('keydown', handler);
  }, [activeItem, anchor, changeActiveItem, items, onSelectItem]);

  return (
    <Card
      id={id}
      className={clsx('py-1 flex flex-col', className)}
      role="listbox"
      aria-orientation="vertical"
      aria-label={label}
      {...rest}
    >
      {items.size === 0 && (
        <i role="option" aria-disabled aria-selected={false} data-testid="no-items" className="px-2 py-1">
          {noItemsMessage}
        </i>
      )}
      {[...items.entries()].map(([key, item], index) => (
        <button
          id={`${id}_${key}`}
          key={key}
          type="button"
          role="option"
          aria-selected={index === activeItem}
          className={clsx(
            'px-2 py-1 text-left truncate',
            { 'bg-lm-secondary dark:bg-dm-secondary': index === activeItem },
          )}
          tabIndex={-1}
          onClick={() => onSelectItem(item)}
          // We are setting tabIndex -1 so that this element cannot be focused
          // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
          onMouseOver={() => changeActiveItem(index)}
        >
          {renderItem(item)}
        </button>
      ))}
    </Card>
  );
}
