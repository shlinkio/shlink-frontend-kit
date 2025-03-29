import clsx from 'clsx';
import type { FC } from 'react';
import { useEffect, useRef,useState } from 'react';
import { Button, CloseButton } from '../form';
import { LinkButton } from '../navigation';
import { Card } from '../surfaces';
import type { Size } from '../types';
import type { ModalDialogProps } from './ModalDialog';
import { ModalDialog } from './ModalDialog';

type CommonCardModalProps = {
  /** Modal header title */
  title: string;
};

type CoverCardModalProps = CommonCardModalProps & {
  /**
   * Cover dialogs have a body that span the whole dialog, and no buttons.
   * The header overlaps the body with semi-transparent background.
   */
  variant: 'cover';
};

type RegularCardModalProps = CommonCardModalProps & {
  /** Danger dialogs use danger variants in title and confirm button */
  variant?: 'default' | 'danger'
  /** Determines the horizontal size of the dialog */
  size?: Size | 'xl';

  /** Value to display in confirm button. Defaults to 'Confirm' */
  confirmText?: string;
  /** Whether the confirm button is disabled or not */
  confirmDisabled?: boolean;

  /**
   * A footer with confirm and cancel buttons will be rendered if provided.
   * Invoked when the confirm button is actioned.
   */
  onConfirm?: () => void;
};

export type CardModalProps = Omit<ModalDialogProps, 'title' | 'size'> & (
  CoverCardModalProps | RegularCardModalProps
);

/**
 * A ModalDialog that renders a Card as its content
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
    confirmDisabled,
    onConfirm,
    ...restDialogProps
  } = 'onConfirm' in rest ? rest : { ...rest };

  // Proxy the open/close modal state via an auxiliary variable, so that we can delay transitioning to `open=false`
  // after a CSS transition has ended.
  const [openProxy, setOpenProxy] = useState(open);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // When the modal is open, we immediately set the proxy to open as well, letting the "in" transition to trigger
    // instantly.
    if (open) {
      setOpenProxy(true);
      return;
    }

    // When the modal is going to be closed, we immediately remove the `data-open` attribute, which will trigger the
    // "out" transition, and add a listener to actually set `open=false` once that transition has ended.
    const content = ref.current;
    if (content) {
      const handler = () => setOpenProxy(false);
      content.addEventListener('transitionend', handler, { once: true });
      delete ref.current!.dataset.open;
      return () => {
        content.removeEventListener('transitionend', handler);
      };
    }
  }, [open]);

  useEffect(() => {
    // After the modal has been opened, and its content is rendered, we set the `data-open` attribute that triggers the
    // "in" transition.
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
        { 'tw:flex tw:w-screen tw:h-screen tw:max-w-screen tw:max-h-screen': openProxy },
        className,
      )}
      {...restDialogProps}
    >
      <div
        ref={ref}
        className={clsx(
          'tw:m-auto tw:p-4',
          // CSS transitions are based on the presence of the `data-open` attribute
          'tw:-translate-y-4 tw:data-open:translate-y-0 tw:opacity-0 tw:data-open:opacity-100',
          'tw:transition-[opacity_transform] tw:duration-300',
          {
            'tw:w-full tw:h-full': variant === 'cover',
          },
        )}
      >
        <Card className={clsx(
          'tw:w-full',
          variant !== 'cover' && {
            'tw:md:w-sm': size === 'sm',
            'tw:md:w-lg': size === 'md',
            'tw:md:w-4xl': size === 'lg',
            'tw:md:w-6xl': size === 'xl',
          },
          {
            'tw:h-full tw:overflow-auto tw:relative': variant === 'cover',
          },
        )}>
          {variant === 'cover' ? (
            <>
              <div
                className={clsx(
                  'tw:px-4 tw:py-3 tw:absolute tw:top-0 tw:left-0 tw:right-0',
                  'tw:flex tw:items-center tw:justify-between',
                  'tw:text-white tw:bg-linear-to-b tw:from-black/70 tw:to-black/10',
                  'tw:[text-shadow:_0_2px_4px_rgb(0_0_0/_0.8)]',
                )}
              >
                <h5>{title}</h5>
                <CloseButton onClick={onClose} label="Close dialog" />
              </div>
              <div>{children}</div>
            </>
          ) : (
            <>
              <Card.Header className="tw:flex tw:items-center tw:justify-between tw:sticky tw:top-0">
                <h5 className={clsx({ 'tw:text-danger': variant === 'danger' })}>{title}</h5>
                <CloseButton onClick={onClose} label="Close dialog" />
              </Card.Header>
              <Card.Body>{children}</Card.Body>
              {onConfirm && (
                <Card.Footer
                  data-testid="footer"
                  className="tw:flex tw:flex-row-reverse tw:gap-x-2 tw:items-center tw:[&]:px-3 tw:sticky tw:bottom-0"
                >
                  <Button
                    solid
                    variant={variant === 'danger' ? 'danger' : 'primary'}
                    disabled={confirmDisabled}
                    onClick={onConfirm}
                  >
                    {confirmText}
                  </Button>
                  <LinkButton onClick={onClose}>Cancel</LinkButton>
                </Card.Footer>
              )}
            </>
          )}
        </Card>
      </div>
    </ModalDialog>
  );
};
