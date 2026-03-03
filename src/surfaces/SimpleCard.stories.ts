import type { Meta, StoryObj } from '@storybook/react-vite';
import { SimpleCard } from './SimpleCard';

const meta = {
  component: SimpleCard,
  tags: ['autodocs'],
} satisfies Meta<typeof SimpleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    title: 'Title',
    children: 'Simple card',
  },
};

export const SmallTitle: Story = {
  args: {
    title: 'Title',
    titleSize: 'sm',
    children: 'Simple card',
  },
};

export const LargeTitle: Story = {
  args: {
    title: 'Title',
    titleSize: 'lg',
    children: 'Simple card',
  },
};

export const NoTitle: Story = {
  args: {
    children: 'Simple card with no title',
  },
};
