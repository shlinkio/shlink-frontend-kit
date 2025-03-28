import type { FC } from 'react';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Checkbox, Label, NavPills } from '../../../src/tailwind';

export const NavPillsPage: FC = () => {
  const [fill, setFill] = useState(false);

  return (
    <div className="tw:flex tw:flex-col tw:gap-y-2">
      <Label className="tw:flex tw:items-center tw:gap-x-1.5">
        <Checkbox checked={fill} onChange={setFill} /> Filled
      </Label>
      <NavPills fill={fill}>
        <NavPills.Pill to="../foo">Foo</NavPills.Pill>
        <NavPills.Pill to="../bar">Bar</NavPills.Pill>
        <NavPills.Pill to="../baz">Baz</NavPills.Pill>
      </NavPills>
      <Routes>
        <Route path="foo" element={<h3 className="tw:text-center">This is option foo</h3>} />
        <Route path="bar" element={<h3 className="tw:text-center">This is option bar</h3>} />
        <Route path="baz" element={<h3 className="tw:text-center">This is option baz</h3>} />
        <Route path="*" element={<Navigate replace to="../foo" />} />
      </Routes>
    </div>
  );
};
