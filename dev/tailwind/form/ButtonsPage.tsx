import type { FC } from 'react';
import { Button, CloseButton, LinkButton } from '../../../src/tailwind';

export const ButtonsPage: FC = () => {
  return (
    <div className="tw:flex tw:flex-col tw:gap-y-4">
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Regular buttons</h2>
        <div className="tw:flex tw:gap-x-2">
          <Button>Main</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Button sizes</h2>
        <div className="tw:flex tw:gap-x-2">
          <Button size="sm">Main</Button>
          <Button variant="secondary" size="sm">Secondary</Button>
          <Button variant="danger" size="sm">Danger</Button>
        </div>
        <div className="tw:flex tw:gap-x-2">
          <Button size="lg">Main</Button>
          <Button variant="secondary" size="lg">Secondary</Button>
          <Button variant="danger" size="lg">Danger</Button>
        </div>
      </div>
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Solid buttons</h2>
        <div className="tw:flex tw:gap-x-2">
          <Button solid>Main</Button>
          <Button variant="secondary" solid>Secondary</Button>
          <Button variant="danger" solid>Danger</Button>
        </div>
      </div>
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Disabled buttons</h2>
        <div className="tw:flex tw:gap-x-2">
          <Button disabled>Main</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="danger" disabled>Danger</Button>
        </div>
        <div className="tw:flex tw:gap-x-2">
          <Button solid disabled>Main</Button>
          <Button variant="secondary" solid disabled>Secondary</Button>
          <Button variant="danger" solid disabled>Danger</Button>
        </div>
      </div>
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Others</h2>
        <div className="tw:flex tw:gap-x-2">
          <LinkButton>Link button</LinkButton>
          <CloseButton />
        </div>
      </div>
    </div>
  );
};
