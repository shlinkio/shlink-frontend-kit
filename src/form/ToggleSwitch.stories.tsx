import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SimpleCard } from '../surfaces';
import { ToggleSwitch } from './ToggleSwitch';

const meta = {
  component: ToggleSwitch,
  tags: ['autodocs'],
} satisfies Meta<typeof ToggleSwitch>;

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
      <ToggleSwitch {...args} />
    </SimpleCard>
  ),
};
