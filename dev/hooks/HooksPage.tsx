import type { FC } from 'react';
import { useTimeoutToggle } from '../../src';
import { Button, Result } from '../../src/tailwind';

export const HooksPage: FC = () => {
  const [value, toggle] = useTimeoutToggle();

  return (
    <div className="tw:flex tw:flex-col tw:gap-y-4">
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>useTimeoutToggle</h2>
        <div>
          <Button onClick={toggle}>Show</Button>
          {value && (
            <Result variant="success" className="tw:mt-2">Shown!</Result>
          )}
        </div>
      </div>
    </div>
  );
};
