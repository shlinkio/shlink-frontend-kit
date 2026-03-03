import type { Meta } from '@storybook/react-vite';
import { LoremIpsum } from '../../.storybook/utils/LoremIpsum';
import { Card } from './Card';

export default {
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export const Base = () => (
  <Card>
    <Card.Header>Header</Card.Header>
    <Card.Body className="flex flex-col gap-2">
      <LoremIpsum repeat={3} />
    </Card.Body>
    <Card.Footer>Footer</Card.Footer>
  </Card>
);
