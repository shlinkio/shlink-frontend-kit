import { clsx } from 'clsx';
import type { FC, ReactNode, SubmitEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, CloseButton } from '../form';
import { LinkButton } from '../navigation';
import { Card } from '../surfaces';
import type { RequiredReactNode, Size } from '../types';
import type { ModalDialogProps } from './ModalDialog';
import { ModalDialog } from './ModalDialog';

type CommonCardModalProps = {
  /** Modal header title */
  title: RequiredReactNode;
};

type CoverCardModalProps = CommonCardModalProps & {
  /**
   * Cover dialogs have a body that span the whole dialog, and no buttons.
   * The header overlaps the body with semi-transparent background.
   */
  variant: 'cover';
};

export type ExitAction = 'confirm' | 'cancel';

type RegularCardModalProps = CommonCardModalProps & {
  /** Danger dialogs use danger variants in title and confirm button */
  variant?: 'default' | 'danger'
  /** Determines the horizontal size of the dialog */
  size?: Size | 'xl';

  /** Value to display in confirm button. Defaults to 'Confirm' */
  confirmText?: ReactNode;
  /** Value to display in cancel button. Defaults to 'Cancel' */
  cancelText?: ReactNode;
  /** Whether the confirm button is disabled or not */
  confirmDisabled?: boolean;

  /**
   * A footer with confirm and cancel buttons will be rendered if provided.
   * Invoked when the confirm button is actioned.
   */
  onConfirm?: () => void;

  /** Invoked after finishing the close transition */
  onClosed?: (exitAction: ExitAction) => void;
};

export type CardModalProps = Omit<ModalDialogProps, 'title' | 'size'> & (
  CoverCardModalProps | RegularCardModalProps
);

/**
 * A `ModalDialog` that renders a `Card` as its content
 */
export const CardModal: FC<CardModalProps> = ({
  open,
  onClose,
  variant = 'default',
  title,
  children,
  className,
  ...rest
}) => {
  const {
    size = 'md',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmDisabled,
    onConfirm,
    onClosed,
    ...restDialogProps
  } = 'onConfirm' in rest ? rest : { ...rest };

  // Proxy the open/close modal state via an auxiliary variable, so that we can delay transitioning to `open=false`
  // after a CSS transition has ended.
  const [openProxy, setOpenProxy] = useState(open);
  const ref = useRef<HTMLFormElement>(null);

  // Track what was the exit action, so that we can call onConfirmed with the right value, once close transition ended
  const exitAction = useRef<ExitAction>('cancel');
  const confirm = useCallback((e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();
    exitAction.current = 'confirm';
    onConfirm?.();
  }, [onConfirm]);

  useEffect(() => {
    // When the modal is open, we immediately set the proxy to open as well, letting the "in" transition to trigger
    // instantly.
    if (open) {
      exitAction.current = 'cancel';
      setOpenProxy(true);
      return;
    }

    const content = ref.current;
    if (content) {
      // When the modal is going to be closed, we immediately remove the `data-open` attribute, which will trigger the
      // "out" transition, and add a listener to actually set `open=false` once that transition has ended.
      delete ref.current!.dataset.open;

      let triggered = false;
      const handler = (e: TransitionEvent) => {
        // The event should be triggered only once, but since we also need to check it ignores transitions in children,
        // we have to manually track the first execution, rather than using `{ once: true }`
        if (triggered || e.target !== content) {
          return;
        }

        triggered = true;
        setOpenProxy(false);
        onClosed?.(exitAction.current);
      };
      content.addEventListener('transitionend', handler);
      return () => {
        content.removeEventListener('transitionend', handler);
      };
    }
  }, [onClosed, open]);

  useEffect(() => {
    // We set the `data-open` attribute here so that things happen in this order in subsequent renders:
    // 1. The modal transitions to `open=true`, rendering its children.
    // 2. The outermost children div renders with its "closed" styles.
    // 3. We set `data-open`, making its styles transition to "open".
    const content = ref.current;
    if (openProxy && content) {
      content.dataset.open = '';
    }
  }, [openProxy]);

  return (
    <ModalDialog
      open={openProxy}
      onClose={onClose}
      className={clsx(
        {
          'flex w-screen h-screen max-w-screen max-h-screen': openProxy,
          'overflow-hidden': variant === 'cover',
        },
        className,
      )}
      {...restDialogProps}
    >
      <form
        data-testid="transition-container"
        ref={ref}
        className={clsx(
          'w-full m-auto p-4 sm:p-6',

          // CSS transitions are based on the presence of the `data-open` attribute
          '-translate-y-4 data-open:translate-y-0 opacity-0 data-open:opacity-100',
          'transition-[opacity_,_translate] duration-300',

          // Handle modal dimensions for different variants and sizes
          variant !== 'cover' && {
            'sm:w-sm': size === 'sm',
            'md:w-lg': size === 'md',
            'md:w-4xl': size === 'lg',
            'md:w-6xl': size === 'xl',
          },
          { 'h-full': variant === 'cover' },
        )}
        onSubmit={confirm}
      >
        <Card className={clsx(
          'w-full',
          { 'h-full relative overflow-auto': variant === 'cover' },
        )}>
          {variant === 'cover' ? (
            <>
              <div
                className={clsx(
                  'px-4 py-3 absolute top-0 left-0 right-0 z-3000',
                  'flex items-center justify-between',
                  'text-white bg-linear-to-b from-black/70 to-black/10',
                  '[text-shadow:_0_2px_4px_rgb(0_0_0/_0.8)]',
                )}
              >
                <h5>{title}</h5>
                <CloseButton onClick={onClose} label="Close dialog" />
              </div>
              {children}
            </>
          ) : (
            <>
              <Card.Header className={clsx(
                'sticky top-0',
                'flex items-center justify-between gap-x-2',
              )}>
                <h5 className={clsx({ 'text-danger': variant === 'danger' })}>{title}</h5>
                <CloseButton onClick={onClose} label="Close dialog" />
              </Card.Header>
              <Card.Body>{children}</Card.Body>
              {onConfirm && (
                <Card.Footer
                  data-testid="footer"
                  className={clsx(
                    'flex justify-end items-center gap-x-2',
                    '[&]:px-3 sticky bottom-0',
                  )}
                >
                  <LinkButton onClick={onClose}>{cancelText}</LinkButton>
                  <Button
                    solid
                    variant={variant === 'danger' ? 'danger' : 'primary'}
                    disabled={confirmDisabled}
                    type="submit"
                  >
                    {confirmText}
                  </Button>
                </Card.Footer>
              )}
            </>
          )}
        </Card>
      </form>
    </ModalDialog>
  );
};
