import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { CloseButton } from './CloseButton';

const meta = {
  component: CloseButton,
  tags: ['autodocs'],
} satisfies Meta<typeof CloseButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onClick: () => fn(),
  },
};

export const Solid: Story = {
  args: {
    solid: true,
    onClick: () => fn(),
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    onClick: () => fn(),
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    onClick: () => fn(),
  },
};

export const CustomAccessibleLabel: Story = {
  name: 'Custom accessible label',
  args: {
    label: 'Click me to close',
    onClick: () => fn(),
  },
};
