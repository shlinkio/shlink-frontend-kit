import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SimpleCard } from '../surfaces';
import { Checkbox } from './Checkbox';

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onChange: () => fn(),
  },
};

export const InCard: Story = {
  args: {
    onChange: () => fn(),
  },
  render: (args) => (
    <SimpleCard>
      <Checkbox {...args} />
    </SimpleCard>
  ),
};
