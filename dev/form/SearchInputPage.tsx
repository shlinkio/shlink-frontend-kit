import type { FC } from 'react';
import { useState } from 'react';
import { SearchInput } from '../../src';

export const SearchInputPage: FC = () => {
  const [value, setValue] = useState<string>();
  const [valueMedium, setValueMedium] = useState<string>();
  const [valueSmall, setValueSmall] = useState<string>();
  const [valueBorderless, setValueBorderless] = useState<string>();

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <h2>Large input</h2>
        <SearchInput onChange={setValue} />
        <p>The value is <b>{value}</b></p>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2>Medium input</h2>
        <SearchInput onChange={setValueMedium} size="md" />
        <p>The value is <b>{valueMedium}</b></p>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2>Small input</h2>
        <SearchInput onChange={setValueSmall} size="sm" />
        <p>The value is <b>{valueSmall}</b></p>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2>Borderless input</h2>
        <SearchInput onChange={setValueBorderless} borderless />
        <p>The value is <b>{valueBorderless}</b></p>
      </div>
      <div className="flex flex-col gap-y-2">
        <h2>Loading input</h2>
        <SearchInput onChange={console.log} size="sm" loading />
        <SearchInput onChange={console.log} size="md" loading />
        <SearchInput onChange={console.log} loading />
      </div>
    </div>
  );
};
