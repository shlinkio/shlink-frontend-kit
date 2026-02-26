import type { Placement } from '@floating-ui/react';
import { arrow, autoPlacement, useFloating, useHover, useInteractions, useTransitionStyles } from '@floating-ui/react';
import { clsx } from 'clsx';
import type { FC, PropsWithChildren } from 'react';
import { useMemo, useRef, useState } from 'react';

export type UseTooltipOptions = {
  placement?: Placement | 'auto';
};

/**
 * Initializes the properties required to render a tooltip anchored to another element.
 */
export const useTooltip = ({ placement = 'auto' }: UseTooltipOptions = {}) => {
  const arrowRef = useRef<HTMLDivElement>(null);
  const middleware = useMemo(() => {
    // eslint-disable-next-line react-compiler/react-compiler
    const arrowMiddleware = arrow({ element: arrowRef });
    return placement === 'auto' ? [autoPlacement(), arrowMiddleware] : [arrowMiddleware];
  }, [placement]);

  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context, middlewareData } = useFloating({
    placement: placement === 'auto' ? undefined : placement,
    open,
    onOpenChange: setOpen,
    middleware,
  });
  const hover = useHover(context, {
    delay: { open: 300 },
    move: true,
  });
  const { getFloatingProps, getReferenceProps } = useInteractions([hover]);
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

  return {
    anchor: { ...getReferenceProps(), ref: refs.setReference },
    tooltip: {
      ...getFloatingProps(),
      refSetter: refs.setFloating,
      isMounted,
      styles: { ...floatingStyles, ...styles },
      arrowPos: middlewareData.arrow,
      arrowRef,
      arrowSide,
    },
  };
};

export type TooltipProps = PropsWithChildren<ReturnType<typeof useTooltip>['tooltip']>;

/**
 * Renders a tooltip component with the content returned by useTooltip()
 *
 * ```
 * const { anchor, tooltip } = useTooltip('bottom');
 * return (
 *   <>
 *     <button {...anchor}>Hover me</button>
 *     <Tooltip {...tooltip}>This is a tooltip</Tooltip>
 *   </>
 * )
 * ```
 */
export const Tooltip: FC<TooltipProps> = (
  { children, isMounted, styles, refSetter, arrowRef, arrowPos, arrowSide, ...rest },
) => isMounted && (
  <div
    role="tooltip"
    aria-live="polite"
    className={clsx(
      'z-500 max-w-64',
      // Add space between anchor and tooltip via padding, so that if the tooltip is inside the anchor, you can hover it
      // and it's never closed
      {
        'pt-2.5': arrowSide === 'top',
        'pb-2.5': arrowSide === 'bottom',
        'pr-2.5': arrowSide === 'right',
        'pl-2.5': arrowSide === 'left',
      },
    )}
    ref={refSetter}
    style={styles}
    {...rest}
  >
    <div className="relative px-1.5 py-1 rounded bg-black/90 text-white text-center">
      <span className="sr-only">Tooltip: </span>
      {children}
      <div
        ref={arrowRef}
        className={clsx(
          'absolute',
          // Render as a triangle
          'border-l-6 border-r-6 border-b-6 border-l-transparent border-r-transparent border-b-black/90',
          // Rotate triangle so that it points to the correct direction
          {
            'rotate-180': arrowSide === 'bottom',
            'rotate-90 mr-[-3px]': arrowSide === 'right',
            'rotate-270 ml-[-3px]': arrowSide === 'left',
          },
        )}
        style={{
          left: arrowPos?.x,
          top: arrowPos?.y,
          [arrowSide]: `${-(arrowRef.current?.offsetWidth ?? 0) / 2}px`,
        }}
        data-testid="arrow"
      />
    </div>
  </div>
);
