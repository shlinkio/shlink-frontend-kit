import type { Meta, StoryObj } from '@storybook/react-vite';
import { LabelledInput } from './LabelledInput';

const meta = {
  component: LabelledInput,
  tags: ['autodocs'],
} satisfies Meta<typeof LabelledInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Regular: Story = {
  args: {
    label: 'Input with label',
    placeholder: 'Write something...',
  },
};

export const Required: Story = {
  args: {
    required: true,
    label: 'Required input with label',
    placeholder: 'Write something...',
  },
};

export const HiddenRequired: Story = {
  name: 'Hidden required',
  args: {
    hiddenRequired: true,
    label: 'Still required, but with no UI hint',
    placeholder: 'Write something...',
  },
};

export const WithHelpText: Story = {
  name: 'With help text',
  args: {
    label: 'Label',
    placeholder: 'Write something...',
    helpText: 'Write something above',
  },
};

export const Error: Story = {
  args: {
    label: 'Label',
    placeholder: 'Write something...',
    error: 'The value is invalid',
  },
};
