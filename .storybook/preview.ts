import type { Preview } from '@storybook/react-vite';
import '../dev/tailwind.css';

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
} satisfies Preview;
