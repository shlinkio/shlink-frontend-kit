import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { LoremIpsum } from '../../.storybook/utils/LoremIpsum';
import { Button, Input } from '../form';
import type { CardModalProps } from './CardModal';
import { CardModal as LibCardModal } from './CardModal';

const meta = {
  component: LibCardModal,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'danger', 'cover'],
    },
  },
} satisfies Meta<typeof LibCardModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const CardModal = ({
  variant,
  ...rest
}: CardModalProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <LibCardModal variant={variant} {...rest} open={open} onClose={() => setOpen(false)} />
      <Button onClick={() => setOpen(true)} variant={variant === 'danger' ? 'danger' : undefined}>Open modal</Button>
    </>
  );
};

const LongContent = () => (
  <div className="p-3 flex flex-col gap-y-3">
    <LoremIpsum repeat={14} />
  </div>
);

export const Base: Story = {
  args: {
    title: 'Modal dialog',
    children: 'Default dialog',
    open: false,
    onClose: () => fn(),
  },
  render: CardModal,
};

export const Small: Story = {
  args: {
    size: 'sm',
    title: 'Modal dialog',
    children: 'Small dialog',
    open: false,
    onClose: () => fn(),
  },
  render: CardModal,
};

export const Large: Story = {
  args: {
    size: 'lg',
    title: 'Modal dialog',
    children: 'Large dialog',
    open: false,
    onClose: () => fn(),
  },
  render: CardModal,
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    title: 'Modal dialog',
    children: 'Extra large dialog',
    open: false,
    onClose: () => fn(),
  },
  render: CardModal,
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Danger dialog',
    children: 'Danger dialog',
    open: false,
    onClose: () => fn(),
  },
  render: CardModal,
};

export const Confirm: Story = {
  args: {
    title: 'Custom confirm',
    children: 'Custom confirm text',
    open: false,
    onClose: () => fn(),
    confirmText: 'Accept the action',
    onConfirm: fn,
  },
  render: CardModal,
};

export const DisabledConfirm: Story = {
  args: {
    title: 'Confirm disabled',
    children: 'Confirm action is disabled',
    open: false,
    onClose: () => fn(),
    onConfirm: fn,
    confirmDisabled: true,
  },
  render: CardModal,
};

export const DangerConfirm: Story = {
  args: {
    variant: 'danger',
    title: 'Danger dialog',
    children: 'Danger dialog with confirm buttons',
    open: false,
    onClose: () => fn(),
    onConfirm: fn,
  },
  render: CardModal,
};

export const WithForm: Story = {
  args: {
    title: 'Dialog with form',
    children: (
      <div className="flex flex-col gap-3">
        <Input placeholder="Foo" name="foo" />
        <Input placeholder="Bar" name="bar" />
      </div>
    ),
    open: false,
    onClose: () => fn(),
    onConfirm: fn,
  },
  render: CardModal,
};

export const WithALotOfContent: Story = {
  args: {
    title: 'Fixed header and footer',
    children: <LongContent />,
    open: false,
    onClose: () => fn(),
    onConfirm: fn,
  },
  render: CardModal,
};

export const Cover: Story = {
  args: {
    variant: 'cover',
    title: 'Cover modal',
    children: <LongContent />,
    open: false,
    onClose: () => fn(),
  },
  render: CardModal,
};
