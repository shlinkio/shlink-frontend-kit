import type { Meta, StoryObj } from '@storybook/react-vite';
import { LabelledRevealablePasswordInput } from './LabelledRevealablePasswordInput';

const meta = {
  component: LabelledRevealablePasswordInput,
  tags: ['autodocs'],
} satisfies Meta<typeof LabelledRevealablePasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Regular: Story = {
  args: {
    label: 'Click "eye" to show password',
    defaultValue: 'Password1234',
  },
};
