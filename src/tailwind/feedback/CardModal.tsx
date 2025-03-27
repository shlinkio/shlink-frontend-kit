import clsx from 'clsx';
import type { FC } from 'react';
import { Button, CloseButton } from '../form';
import { LinkButton } from '../navigation';
import { Card } from '../surfaces';
import type { Size } from '../types';
import type { ModalDialogProps } from './ModalDialog';
import { ModalDialog } from './ModalDialog';

type CommonCardModalProps = {
  /** Modal header title */
  title: string;
  /** Determines the horizontal size of the dialog */
  size?: Size | 'xl';
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
  size = 'md',
  title,
  children,
  className,
  ...rest
}) => {
  const { confirmText = 'Confirm', confirmDisabled, onConfirm, ...restDialogProps } = 'onConfirm' in rest ? rest : {
    ...rest,
    confirmText: undefined,
    confirmDisabled: undefined,
    onConfirm: undefined,
  };

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      className={clsx(
        { 'tw:flex tw:w-screen tw:h-screen tw:max-w-screen tw:max-h-screen': open },
        className,
      )}
      {...restDialogProps}
    >
      <div className="tw:m-auto tw:p-4">
        <Card className={clsx(
          'tw:w-full',
          {
            'tw:md:w-sm': size === 'sm',
            'tw:md:w-lg': size === 'md',
            'tw:md:w-4xl': size === 'lg',
            'tw:md:w-6xl': size === 'xl',
          },
        )}>
          <Card.Header className="tw:flex tw:items-center tw:justify-between tw:sticky tw:top-0">
            <h5 className={clsx({ 'tw:text-danger': variant === 'danger' })}>{title}</h5>
            <CloseButton onClick={onClose} label="Close dialog" />
          </Card.Header>
          <Card.Body>{children}</Card.Body>
          {onConfirm && (
            <Card.Footer
              className="tw:flex tw:flex-row-reverse tw:gap-x-2 tw:items-center tw:py-4 tw:sticky tw:bottom-0"
            >
              <Button
                disabled={confirmDisabled}
                variant={variant === 'danger' ? 'danger' : 'primary'}
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
              <LinkButton onClick={onClose}>Cancel</LinkButton>
            </Card.Footer>
          )}
        </Card>
      </div>
    </ModalDialog>
  );
};
