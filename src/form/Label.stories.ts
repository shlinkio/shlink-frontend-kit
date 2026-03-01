import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';

const meta = {
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Regular: Story = {
  args: {
    children: 'This is a label',
  },
};

export const Required: Story = {
  args: {
    required: true,
    children: 'Label for required inputs',
  },
};
