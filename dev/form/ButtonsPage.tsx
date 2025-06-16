import type { FC } from 'react';
import { useRef } from 'react';
import { Button, CloseButton, LinkButton } from '../../src';

const ButtonsWithRefs: FC = () => {
  const linkButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const regularButtonRef = useRef<HTMLButtonElement>(null);
  const buttonWithLinkRef = useRef<HTMLAnchorElement>(null);

  return (
    <div className="tw:flex tw:flex-col tw:gap-y-2">
      <h2>Buttons with ref</h2>
      <div className="tw:flex tw:gap-x-2">
        <LinkButton ref={linkButtonRef}>Link button</LinkButton>
        <CloseButton ref={closeButtonRef} />
        <Button ref={regularButtonRef}>Regular button</Button>
        <Button to="" ref={buttonWithLinkRef}>Button with link</Button>
      </div>
    </div>
  );
};

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
          <Button type="submit">Submit</Button>
          <Button to="">Button with link</Button>
          <Button to="" disabled>Disabled button with link</Button>
        </div>
      </div>

      <ButtonsWithRefs />
    </div>
  );
};
