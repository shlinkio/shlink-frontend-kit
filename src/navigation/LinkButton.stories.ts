import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { LinkButton } from './LinkButton';

const meta = {
  component: LinkButton,
  tags: ['autodocs'],
} satisfies Meta<typeof LinkButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Medium: Story = {
  args: {
    children: 'Click here',
    onClick: () => fn(),
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Click here',
    onClick: () => fn(),
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Click here',
    onClick: () => fn(),
  },
};
