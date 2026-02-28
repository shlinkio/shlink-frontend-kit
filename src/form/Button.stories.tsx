import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { fn } from 'storybook/test';
import { Button } from './Button';

const meta = {
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    children: 'Button',
    onClick: () => fn(),
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
    onClick: () => fn(),
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger',
    onClick: () => fn(),
  },
};

export const Sizes = () => (
  <div className="flex gap-2 items-center">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
);

export const Solid = () => (
  <div className="flex gap-2 items-center">
    <Button solid>Main</Button>
    <Button solid variant="secondary">Secondary</Button>
    <Button solid variant="danger">Danger</Button>
  </div>
);

export const Disabled = () => (
  <div className="flex flex-col gap-2">
    <div className="flex gap-2 items-center">
      <Button disabled>Main</Button>
      <Button disabled variant="secondary">Secondary</Button>
      <Button disabled variant="danger">Danger</Button>
    </div>
    <div className="flex gap-2 items-center">
      <Button disabled solid>Main solid</Button>
      <Button disabled solid variant="secondary">Secondary solid</Button>
      <Button disabled solid variant="danger">Danger solid</Button>
    </div>
  </div>
);

export const AsLink = () => (
  <MemoryRouter>
    <Button to="#" inline>As link</Button>
  </MemoryRouter>
);
