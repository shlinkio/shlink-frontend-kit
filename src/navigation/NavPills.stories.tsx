import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import type { NavPillsProps } from './NavPills';
import { NavPills } from './NavPills';

const meta = {
  component: NavPills,
  tags: ['autodocs'],
} satisfies Meta<typeof NavPills>;

export default meta;

type Story = StoryObj<typeof meta>;

const Decorator = (Story: FC) => (
  <div className="flex flex-col gap-y-3">
    <Story />
    <Routes>
      <Route path="foo" element={<p className="text-center">This is option foo</p>} />
      <Route path="bar" element={<p className="text-center">This is option bar</p>} />
      <Route path="baz" element={<p className="text-center">This is option baz</p>} />
      <Route path="*" element={<Navigate replace to="foo" />} />
    </Routes>
  </div>
);

const Render = (args: NavPillsProps) => (
  <NavPills {...args}>
    <NavPills.Pill to="foo">Foo</NavPills.Pill>
    <NavPills.Pill to="bar">Bar</NavPills.Pill>
    <NavPills.Pill to="baz">Baz</NavPills.Pill>
  </NavPills>
);

export const LeftAligned: Story = {
  name: 'Left-aligned',
  args: {
    fill: false,
  },
  render: Render,
  decorators: [Decorator],
};

export const Fill: Story = {
  args: {
    fill: true,
  },
  render: Render,
  decorators: [Decorator],
};
