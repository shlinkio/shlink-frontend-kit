import type { FC } from 'react';
import { useState } from 'react';
import { SearchField } from '../../src';

export const SearchFieldPage: FC = () => {
  const [value, setValue] = useState<string>();
  const [value2, setValue2] = useState<string>();
  const [value3, setValue3] = useState<string>();

  return (
    <>
      <div className="mb-3">
        <SearchField onChange={setValue} />
        <div>Value will appear here with a delay: {value}</div>
      </div>
      <div className="mb-3">
        <SearchField onChange={setValue2} initialValue="This is small" large={false} />
        <div>Value will appear here with a delay: {value2}</div>
      </div>
      <div className="mb-3">
        <SearchField onChange={setValue3} initialValue="This is borderless" noBorder />
        <div>Value will appear here with a delay: {value3}</div>
      </div>
    </>
  );
};
