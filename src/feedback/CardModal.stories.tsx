import type { Meta } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { LoremIpsum } from '../../.storybook/utils/LoremIpsum';
import { Button, Input } from '../form';
import type { CardModalProps } from './CardModal';
import { CardModal as LibCardModal } from './CardModal';

export default {
  component: LibCardModal,
  tags: ['autodocs'],
} satisfies Meta<typeof LibCardModal>;

type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

type ModalPlaceholderProps = DistributiveOmit<CardModalProps, 'open' | 'onClose'>;

const CardModal = ({
  variant,
  ...rest
}: ModalPlaceholderProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} variant={variant === 'danger' ? 'danger' : undefined}>Open modal</Button>
      <LibCardModal open={open} onClose={() => setOpen(false)} variant={variant} {...rest} />
    </>
  );
};

const LongContent = () => (
  <div className="p-3 flex flex-col gap-y-3">
    <LoremIpsum repeat={14} />
  </div>
);

export const Modal = () => <CardModal title="Modal dialog">Default dialog</CardModal>;

export const SmallModal = () => <CardModal size="sm" title="Modal dialog">Small dialog</CardModal>;

export const LargeModal = () => <CardModal size="lg" title="Modal dialog">Large dialog</CardModal>;

export const ExtraLargeModal = () => <CardModal size="xl" title="Modal dialog">Extra large dialog</CardModal>;

export const DangerModal = () => <CardModal variant="danger" title="Danger dialog">Danger dialog</CardModal>;

export const ConfirmModal = () => (
  <CardModal
    title="Custom confirm"
    confirmText="Accept the action"
    onConfirm={fn}
    onClosed={() => fn()}
  >
    Custom confirm text
  </CardModal>
);

export const DisabledConfirmModal = () => (
  <CardModal
    title="Custom disabled"
    confirmDisabled
    onConfirm={fn}
    onClosed={() => fn()}
  >
    Custom action is disabled
  </CardModal>
);

export const DangerConfirmModal = () => (
  <CardModal
    title="Danger dialog"
    variant="danger"
    onConfirm={fn}
    onClosed={() => fn()}
  >
    Danger dialog with confirm buttons
  </CardModal>
);

export const ModalWithForm = () => (
  <CardModal title="Dialog with form" onConfirm={fn} onClosed={() => fn()}>
    <div className="flex flex-col gap-3">
      <Input placeholder="Foo" name="foo" />
      <Input placeholder="Bar" name="bar" />
    </div>
  </CardModal>
);

export const ModalWithALotOfContent = () => (
  <CardModal title="Fixed header and footer">
    <LongContent />
  </CardModal>
);

export const CoverModal = () => (
  <CardModal variant="cover" title="Cover modal">
    <LongContent />
  </CardModal>
);
