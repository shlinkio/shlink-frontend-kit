import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoremIpsum } from '../../.storybook/utils/LoremIpsum';
import { Card } from './Card';

const meta = {
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {},
  render: (args) => (
    <Card {...args}>
      <Card.Header>Header</Card.Header>
      <Card.Body className="flex flex-col gap-2">
        <LoremIpsum repeat={3} />
      </Card.Body>
      <Card.Footer>Footer</Card.Footer>
    </Card>
  ),
};
