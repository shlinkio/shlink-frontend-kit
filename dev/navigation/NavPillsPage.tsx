import type { FC } from 'react';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NavPillItem, NavPills, ToggleSwitch } from '../../src';

export const NavPillsPage: FC = () => {
  const [fill, setFill] = useState(false);

  return (
    <>
      <ToggleSwitch checked={fill} onChange={setFill}>Fill</ToggleSwitch>
      <NavPills className="mb-3" fill={fill}>
        <NavPillItem to="foo">Foo</NavPillItem>
        <NavPillItem to="bar">Bar</NavPillItem>
        <NavPillItem to="baz">Baz</NavPillItem>
      </NavPills>
      <Routes>
        <Route path="foo" element={<h3 className="text-center">This is option foo</h3>} />
        <Route path="bar" element={<h3 className="text-center">This is option bar</h3>} />
        <Route path="baz" element={<h3 className="text-center">This is option baz</h3>} />
        <Route path="*" element={<Navigate replace to="foo" />} />
      </Routes>
    </>
  );
};
