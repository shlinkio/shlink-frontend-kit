import type { Meta, StoryObj } from '@storybook/react-vite';
import { Result } from './Result';

const meta = {
  component: Result,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Result>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'This is a success result',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'This is a warning result',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'This is an error result',
  },
};

export const Small: Story = {
  args: {
    variant: 'success',
    size: 'sm',
    children: 'This is a small result',
  },
};

export const Large: Story = {
  args: {
    variant: 'success',
    size: 'lg',
    children: 'This is a large result',
  },
};
