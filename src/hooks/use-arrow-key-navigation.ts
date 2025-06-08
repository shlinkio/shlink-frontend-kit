import type { RefObject } from 'react';
import { useEffect,useMemo  } from 'react';

export type ArrowKeyNavigationOptions = {
  /** Query selector for focusable elements that need to be included in the loop */
  elementsSelector: string;
  /** Enables up and down arrows navigation. Defaults to true */
  vertical?: boolean;
  /** Enables left and right arrows navigation. Defaults to true */
  horizontal?: boolean;
};

/**
 * Allows focus navigation via arrow keys on the elements of a container.
 *
 * Initially, the first element with [data-selected=true] or the first globally, matching `elementsSelector`, will be
 * focusable via Tab, then arrow keys need to be used to move through the sequence.
 */
export function useArrowKeyNavigation(
  containerRef: RefObject<HTMLElement | null>,
  { elementsSelector, vertical = true, horizontal = true }: ArrowKeyNavigationOptions,
) {
  const nextArrows = useMemo(() => {
    const keys = [];
    if (vertical) {
      keys.push('ArrowDown');
    }
    if (horizontal) {
      keys.push('ArrowRight');
    }

    return keys;
  }, [horizontal, vertical]);
  const prevArrows = useMemo(() => {
    const keys = [];
    if (vertical) {
      keys.push('ArrowUp');
    }
    if (horizontal) {
      keys.push('ArrowLeft');
    }

    return keys;
  }, [horizontal, vertical]);
  const allArrows = useMemo(() => [...nextArrows, ...prevArrows], [nextArrows, prevArrows]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return () => {};
    }

    const controller = new AbortController();
    const getFocusableElements = () => [...container.querySelectorAll(elementsSelector)] as HTMLElement[];

    // Do not allow focusable elements inside the menu to be focused via Tab key, except the first one or the first
    // selected one
    const elements = getFocusableElements();
    const selectedElement = Math.max(elements.findIndex((el) => el.dataset.selected === 'true'), 0);
    elements.forEach((el, index) => {
      el.tabIndex = index === selectedElement ? 0 : -1;
    });

    container.addEventListener('keydown', (e) => {
      if (!allArrows.includes(e.key)) {
        return;
      }

      const elements = getFocusableElements();
      const currentlyFocused = elements.findIndex((el) => el.tabIndex === 0);

      // Find the new element to be focused, based on the pressed key and the previously focused element
      const newElementToFocus = nextArrows.includes(e.key)
        ? (elements[currentlyFocused + 1] ?? elements[0])
        : (elements[currentlyFocused - 1] ?? elements[elements.length - 1]);

      // Disable focus in all elements, then focus the new one
      elements.forEach((el) => {
        el.tabIndex = -1;
      });
      newElementToFocus.tabIndex = 0;
      newElementToFocus.focus();
    }, { signal: controller.signal });

    return () => controller.abort();
  }, [allArrows, containerRef, elementsSelector, nextArrows]);
}
