import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { size } from '../../.storybook/utils/storybook';
import { SearchInput } from './SearchInput';

const meta = {
  component: SearchInput,
  tags: ['autodocs'],
  argTypes: {
    size,
    variant: { options: ['default', 'unstyled'] },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Regular: Story = {
  args: {
    placeholder: 'Search input',
    borderless: false,
    onChange: () => fn(),
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small search input',
    onChange: () => fn(),
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    placeholder: 'Medium search input',
    onChange: () => fn(),
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large search input',
    onChange: () => fn(),
  },
};

export const Borderless: Story = {
  args: {
    borderless: true,
    placeholder: 'Search input',
    onChange: () => fn(),
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    placeholder: 'Loading search input',
    onChange: () => fn(),
  },
};
