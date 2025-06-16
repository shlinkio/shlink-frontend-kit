import type { FC } from 'react';
import { Card, SimpleCard } from '../../src';

export const CardsPage: FC = () => {
  return (
    <div className="tw:flex tw:flex-col tw:gap-y-4">
      <Card>Empty card</Card>
      <Card>
        <Card.Header>Header</Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
      <SimpleCard>
        Simple card with no title
      </SimpleCard>
      <SimpleCard title="Title" titleSize="sm">
        Small simple card
      </SimpleCard>
      <SimpleCard title="Title">
        Medium simple card (default)
      </SimpleCard>
      <SimpleCard title="Title" titleSize="lg">
        Large simple card
      </SimpleCard>
    </div>
  );
};
