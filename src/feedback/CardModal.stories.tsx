import type { Meta } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import type { ButtonProps } from '../form';
import { Button } from '../form';
import type { CardModalProps } from './CardModal';
import { CardModal } from './CardModal';

export default {
  component: CardModal,
  tags: ['autodocs'],
} satisfies Meta<typeof CardModal>;

const ModalPlaceholder = ({
  buttonText = 'Open modal',
  buttonVariant,
  ...modalProps
}: Omit<CardModalProps, 'open' | 'onClose'> & {
  buttonText?: string;
  buttonVariant?: ButtonProps['variant'];
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} variant={buttonVariant}>{buttonText}</Button>
      <CardModal open={open} onClose={() => setOpen(false)} {...modalProps} />
    </>
  );
};

export const Modal = () => <ModalPlaceholder title="Modal dialog">Default dialog</ModalPlaceholder>;

export const DangerModal = () => (
  <ModalPlaceholder variant="danger" title="Danger dialog" buttonVariant="danger">
    Danger dialog
  </ModalPlaceholder>
);

export const ConfirmModal = () => (
  <ModalPlaceholder
    buttonText="Custom confirm"
    title="Custom confirm"
    confirmText="Accept the action"
    onConfirm={fn}
    onClosed={fn}
  >
    Custom confirm text
  </ModalPlaceholder>
);
