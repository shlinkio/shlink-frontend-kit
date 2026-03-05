import type { Meta, StoryObj } from '@storybook/react-vite';
import { nonEditableReactNode, size } from '../../.storybook/utils/storybook';
import type { SelectProps } from './Select';
import { Select } from './Select';

const meta = {
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    children: nonEditableReactNode,
    size,
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

const Render = (args: SelectProps) => (
  <Select {...args}>
    <option>One</option>
    <option>Two</option>
    <option>Three</option>
  </Select>
);

export const Regular: Story = {
  args: {
    disabled: false,
  },
  render: Render,
};

export const Error: Story = {
  args: {
    feedback: 'error',
  },
  render: Render,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: Render,
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: Render,
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: Render,
};
