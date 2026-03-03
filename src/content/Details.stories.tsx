import type { Meta } from '@storybook/react-vite';
import { LoremIpsum } from '../../.storybook/utils/LoremIpsum';
import { Details } from './Details';

export default {
  component: Details,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Details>;

export const DefaultSummary = () => (
  <Details summary="Click to show">
    <LoremIpsum repeat={3} />
  </Details>
);
