import type { FC } from 'react';
import { useState } from 'react';
import { Button, ModalDialog } from '../../../src/tailwind';

export const ModalDialogPage: FC = () => {
  const [smallOpen, setSmallOpen] = useState(false);
  const [mediumOpen, setMediumOpen] = useState(false);
  const [largeOpen, setLargeOpen] = useState(false);
  const [extraLargeOpen, setExtraLargeOpen] = useState(false);

  const [dangerOpen, setDangerOpen] = useState(false);
  const [dangerConfirmOpen, setDangerConfirmOpen] = useState(false);

  const [contentOpen, setContentOpen] = useState(false);

  return (
    <div className="tw:flex tw:flex-col tw:gap-y-4">
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Modal dialog sizes</h2>
        <div className="tw:flex tw:gap-x-2">
          <Button onClick={() => setSmallOpen(true)}>Small</Button>
          <Button onClick={() => setMediumOpen(true)}>Medium</Button>
          <Button onClick={() => setLargeOpen(true)}>Large</Button>
          <Button onClick={() => setExtraLargeOpen(true)}>Extra large</Button>
        </div>
      </div>

      <ModalDialog size="sm" title="Small dialog" open={smallOpen} onClose={() => setSmallOpen(false)}>
        Small dialog
      </ModalDialog>
      <ModalDialog size="md" title="Medium dialog" open={mediumOpen} onClose={() => setMediumOpen(false)}>
        Medium dialog
      </ModalDialog>
      <ModalDialog size="lg" title="Large dialog" open={largeOpen} onClose={() => setLargeOpen(false)}>
        Large dialog
      </ModalDialog>
      <ModalDialog size="xl" title="Extra large dialog" open={extraLargeOpen} onClose={() => setExtraLargeOpen(false)}>
        Extra large dialog
      </ModalDialog>

      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Danger dialog</h2>
        <div className="tw:flex tw:gap-x-2">
          <Button variant="danger" onClick={() => setDangerOpen(true)}>Danger</Button>
          <Button variant="danger" onClick={() => setDangerConfirmOpen(true)}>Danger with confirm</Button>
        </div>
      </div>

      <ModalDialog
        size="md"
        title="Danger dialog"
        variant="danger"
        open={dangerOpen}
        onClose={() => setDangerOpen(false)}
      >
        Danger dialog
      </ModalDialog>
      <ModalDialog
        size="md"
        title="Danger dialog"
        variant="danger"
        open={dangerConfirmOpen}
        onClose={() => setDangerConfirmOpen(false)}
        onConfirm={() => setDangerConfirmOpen(false)}
      >
        Danger dialog with confirm buttons
      </ModalDialog>

      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Dialog with a lot of content</h2>
        <div className="tw:flex tw:gap-x-2">
          <Button onClick={() => setContentOpen(true)}>Open</Button>
        </div>
      </div>

      <ModalDialog
        size="md"
        title="Fixed header and footer"
        open={contentOpen}
        onClose={() => setContentOpen(false)}
        onConfirm={() => setContentOpen(false)}
      >
        <div className="tw:flex tw:flex-col tw:gap-y-3">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
            justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
            elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
            amet,
            lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
            vel,
            posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
            leo.
          </p>
        </div>
      </ModalDialog>
    </div>
  );
};
