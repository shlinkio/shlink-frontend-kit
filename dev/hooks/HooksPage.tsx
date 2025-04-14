import type { FC } from 'react';
import { useTimeoutToggle, useToggle } from '../../src';
import { Button, Result } from '../../src/tailwind';

export const HooksPage: FC = () => {
  const [value, toggleTimeout] = useTimeoutToggle();
  const { flag, toggle: toggleFlag } = useToggle(false, true);

  return (
    <div className="tw:flex tw:flex-col tw:gap-y-4">
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>useTimeoutToggle</h2>
        <div>
          <Button onClick={toggleTimeout}>Show</Button>
          {value && <Result variant="success" className="tw:mt-2">Shown!</Result>}
        </div>
      </div>
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>useToggle</h2>
        <div>
          <Button onClick={toggleFlag}>{flag ? 'Hide': 'Show'}</Button>
          {flag && <Result variant="success" className="tw:mt-2">Shown!</Result>}
        </div>
      </div>
    </div>
  );
};
