import type { Meta } from '@storybook/react-vite';
import { LabelledSelect } from './LabelledSelect';

export default {
  component: LabelledSelect,
  tags: ['autodocs'],
} satisfies Meta<typeof LabelledSelect>;

export const Regular = () => (
  <LabelledSelect label="Select an option">
    <option>One</option>
    <option>Two</option>
    <option>Three</option>
  </LabelledSelect>
);

export const Error = () => (
  <LabelledSelect label="Select an option" error="There was an error">
    <option>One</option>
    <option>Two</option>
    <option>Three</option>
  </LabelledSelect>
);
