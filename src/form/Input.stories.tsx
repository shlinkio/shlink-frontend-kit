import type { Meta, StoryObj } from '@storybook/react-vite';
import { SimpleCard } from '../surfaces';
import { Input } from './Input';

const meta = {
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Regular: Story = {
  args: {
    placeholder: 'Text input',
  },
};

export const Error: Story = {
  args: {
    feedback: 'error',
    placeholder: 'Error input',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};

export const Readonly: Story = {
  args: {
    readOnly: true,
    defaultValue: 'Readonly input',
  },
};

export const Unstyled: Story = {
  args: {
    variant: 'unstyled',
    placeholder: 'Unstyled input',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Number input',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Password input',
  },
};

export const InsideCard = () => (
  <SimpleCard>
    <Input placeholder="Input inside card" />
  </SimpleCard>
);
