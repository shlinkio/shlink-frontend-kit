import type { Placement } from '@floating-ui/react';
import { arrow, autoPlacement, offset, useFloating, useHover, useInteractions,useTransitionStyles  } from '@floating-ui/react';
import { clsx } from 'clsx';
import type { FC, PropsWithChildren, RefObject } from 'react';
import { useMemo, useRef, useState } from 'react';

export type TooltipProps = PropsWithChildren<{
  /** Reference to the element to which the tooltip should be anchored */
  anchor: RefObject<HTMLElement | null>;

  /**
   * A fixed placement, or 'auto' to let it render in the most appropriate placement to keep it inside the viewport.
   * Defaults to 'auto'.
   */
  placement?: Placement | 'auto';
}>;

export const Tooltip: FC<TooltipProps> = ({ placement = 'auto', anchor, children }) => {
  const arrowRef = useRef<HTMLDivElement>(null);
  const middleware = (() => {
    const list = [offset(10)];
    if (placement === 'auto') {
      list.push(autoPlacement());
    }
    // eslint-disable-next-line react-compiler/react-compiler
    list.push(arrow({ element: arrowRef }));

    return list;
  })();

  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context, middlewareData } = useFloating({
    placement: placement === 'auto' ? undefined : placement,
    open,
    onOpenChange: setOpen,
    elements: { reference: anchor.current },
    middleware,
  });
  const hover = useHover(context, {
    delay: { open: 300 },
  });
  const { getFloatingProps } = useInteractions([hover]);
  const { isMounted, styles } = useTransitionStyles(context, { duration: 200 });

  const arrowSide = useMemo(() => {
    const side = context.placement.split('-')[0];
    return {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[side] ?? '';
  }, [context.placement]);

  return isMounted && (
    <div
      role="tooltip"
      className="tw:bg-black/90 tw:text-white tw:text-center tw:px-1.5 tw:py-0.5 tw:rounded"
      ref={refs.setFloating}
      style={{ ...floatingStyles, ...styles }}
      {...getFloatingProps()}
    >
      {children}
      <div
        ref={arrowRef}
        className={clsx(
          'tw:absolute',
          // Render as a triangle
          'tw:border-l-6 tw:border-r-6 tw:border-b-6 tw:border-l-transparent tw:border-r-transparent tw:border-b-black/90',
          // Rotate triangle so that it points to the correct direction
          {
            'tw:rotate-180': arrowSide === 'bottom',
            'tw:rotate-90 tw:mr-[-3px]': arrowSide === 'right',
            'tw:rotate-270 tw:ml-[-3px]': arrowSide === 'left',
          },
        )}
        style={{
          left: middlewareData.arrow?.x,
          top: middlewareData.arrow?.y,
          // eslint-disable-next-line react-compiler/react-compiler
          [arrowSide]: `${-(arrowRef.current?.offsetWidth ?? 0) / 2}px`,
        }}
      />
    </div>
  );
};
