import type { Meta, StoryObj } from '@storybook/react-vite';
import { nonEditableReactNode } from '../../.storybook/utils/storybook';
import { LabelledSelect } from './LabelledSelect';

const meta = {
  component: LabelledSelect,
  tags: ['autodocs'],
  argTypes: {
    children: nonEditableReactNode,
    error: { type: 'string' },
  },
} satisfies Meta<typeof LabelledSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Regular: Story = {
  args: {
    label: 'Select an option',
    error: null,
    required: false,
    children: (
      <>
        <option>One</option>
        <option>Two</option>
        <option>Three</option>
      </>
    ),
  },
};

export const Error: Story = {
  args: {
    label: 'Select an option',
    error: 'There was an error',
    children: (
      <>
        <option>One</option>
        <option>Two</option>
        <option>Three</option>
      </>
    ),
  },
};
