import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoremIpsum } from '../../.storybook/utils/LoremIpsum';
import { nonEditableReactNode } from '../../.storybook/utils/storybook';
import { Details } from './Details';

const meta = {
  component: Details,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    children: nonEditableReactNode,
  },
} satisfies Meta<typeof Details>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    summary: 'Click to toggle',
    children: <LoremIpsum repeat={3} />,
  },
};
