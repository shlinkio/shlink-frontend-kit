import clsx from 'clsx';
import type { FC, HTMLProps } from 'react';
import { useEffect , useRef } from 'react';
import { createPortal } from 'react-dom';

export type ModalDialogProps = HTMLProps<HTMLDialogElement> & {
  /** Whether the dialog is open or not */
  open: boolean;
  /** Invoked when the dialog is closed for any reason */
  onClose: () => void;
};

export const ModalDialog: FC<ModalDialogProps> = ({
  open,
  children,
  className,
  onClose,
  ...rest
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const body = document.body;
    const originalOverflow = body.style.overflow;
    const originalPadding = body.style.paddingRight;

    if (open) {
      const paddingRight = window.outerWidth - body.clientWidth;
      const hasScrollbar = body.scrollHeight > body.clientHeight;

      // When opened, hide body scroll and compensate for the scrollbar if present
      body.style.overflow = 'hidden';
      if (hasScrollbar) {
        body.style.paddingRight = `${paddingRight}px`;
      }
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }

    return () => {
      // Restore original body overflow and padding on cleanup
      body.style.overflow = originalOverflow;
      body.style.paddingRight = originalPadding;
    };
  }, [open]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className={clsx('bg-transparent backdrop:bg-black/50', className)}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      {...rest}
    >
      {open && children}
    </dialog>,
    document.body,
  );
};
