import type { Meta } from '@storybook/react-vite';
import { Navigate, Route, Routes } from 'react-router';
import { NavPills } from './NavPills';

export default {
  component: NavPills,
  tags: ['autodocs'],
} satisfies Meta<typeof NavPills>;

export const LeftAlign = () => (
  <div className="flex flex-col gap-y-3">
    <NavPills>
      <NavPills.Pill to="foo">Foo</NavPills.Pill>
      <NavPills.Pill to="bar">Bar</NavPills.Pill>
      <NavPills.Pill to="baz">Baz</NavPills.Pill>
    </NavPills>
    <Routes>
      <Route path="foo" element={<p className="text-center">This is option foo</p>} />
      <Route path="bar" element={<p className="text-center">This is option bar</p>} />
      <Route path="baz" element={<p className="text-center">This is option baz</p>} />
      <Route path="*" element={<Navigate replace to="foo" />} />
    </Routes>
  </div>
);

export const Fill = () => (
  <div className="flex flex-col gap-y-3">
    <NavPills fill>
      <NavPills.Pill to="foo">Foo</NavPills.Pill>
      <NavPills.Pill to="bar">Bar</NavPills.Pill>
      <NavPills.Pill to="baz">Baz</NavPills.Pill>
    </NavPills>
    <Routes>
      <Route path="foo" element={<p className="text-center">This is option foo</p>} />
      <Route path="bar" element={<p className="text-center">This is option bar</p>} />
      <Route path="baz" element={<p className="text-center">This is option baz</p>} />
      <Route path="*" element={<Navigate replace to="foo" />} />
    </Routes>
  </div>
);
