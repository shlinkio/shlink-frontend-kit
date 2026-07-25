import type { Meta, StoryObj } from '@storybook/react-vite';
import { Message } from './Message';

const meta = {
  component: Message,
  tags: ['autodocs'],
} satisfies Meta<typeof Message>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultMessage: Story = {
  args: {
    variant: 'default',
    children: 'This is a message',
  },
};

export const ErrorMessage: Story = {
  args: {
    variant: 'error',
    children: 'This is an error message',
  },
};

export const LoadingMessage: Story = {
  args: {
    variant: 'loading',
  },
};

export const LoadingMessageWithCustomText: Story = {
  args: {
    variant: 'loading',
    children: 'Something is loading...',
  },
};
