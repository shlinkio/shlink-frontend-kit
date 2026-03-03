import type { Preview } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import './tailwind.css';

// eslint-disable-next-line no-restricted-exports
export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    // Wrap all stories in a memory router in case they use react-router components or hooks
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Preview;
