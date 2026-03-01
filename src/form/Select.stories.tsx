import type { Meta } from '@storybook/react-vite';
import { Select } from './Select';

export default {
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export const Regular = () => (
  <Select>
    <option>One</option>
    <option>Two</option>
    <option>Three</option>
  </Select>
);

export const Error = () => (
  <Select feedback="error">
    <option>One</option>
    <option>Two</option>
    <option>Three</option>
  </Select>
);

export const Disabled = () => (
  <Select disabled>
    <option>One</option>
    <option>Two</option>
    <option>Three</option>
  </Select>
);

export const Small = () => (
  <Select size="sm">
    <option>One</option>
    <option>Two</option>
    <option>Three</option>
  </Select>
);

export const Large = () => (
  <Select size="lg">
    <option>One</option>
    <option>Two</option>
    <option>Three</option>
  </Select>
);
