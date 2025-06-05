import type { Placement } from '@floating-ui/react';
import { arrow, autoPlacement, offset, useFloating, useHover, useInteractions,useTransitionStyles  } from '@floating-ui/react';
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
    className="tw:bg-black/90 tw:text-white tw:text-center tw:px-1.5 tw:py-0.5 tw:rounded"
    ref={refSetter}
    style={styles}
    {...rest}
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
        left: arrowPos?.x,
        top: arrowPos?.y,
        [arrowSide]: `${-(arrowRef.current?.offsetWidth ?? 0) / 2}px`,
      }}
    />
  </div>
);
