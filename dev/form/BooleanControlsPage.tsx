import type { FC } from 'react';
import { useState } from 'react';
import { Checkbox, ToggleSwitch } from '../../src';

export const BooleanControlsPage: FC = () => {
  const [toggleChecked, setToggleChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  return (
    <>
      <div className="mb-3">
        <ToggleSwitch checked={toggleChecked} onChange={setToggleChecked}>Toggle switch</ToggleSwitch>
        <Checkbox checked={checkboxChecked} onChange={setCheckboxChecked}>Checkbox</Checkbox>
      </div>
      <div>
        <ToggleSwitch checked={toggleChecked} onChange={setToggleChecked} inline>Inline toggle switch</ToggleSwitch>{' '}
        <Checkbox checked={checkboxChecked} onChange={setCheckboxChecked} inline>Inline checkbox</Checkbox>
      </div>
    </>
  );
};
