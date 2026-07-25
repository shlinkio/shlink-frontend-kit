import type { Meta, StoryObj } from '@storybook/react-vite';
import { RevealablePasswordInput } from './RevealablePasswordInput';

const meta = {
  component: RevealablePasswordInput,
  tags: ['autodocs'],
} satisfies Meta<typeof RevealablePasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Regular: Story = {
  args: {
    defaultValue: 'Password1234',
  },
};
