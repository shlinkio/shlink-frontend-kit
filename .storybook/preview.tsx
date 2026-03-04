import type { Preview } from '@storybook/react-vite';
import { useLayoutEffect } from 'react';
import { MemoryRouter } from 'react-router';
import { changeThemeInMarkup, getSystemPreferredTheme } from '../src';
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
  globalTypes: {
    theme: {
      description: 'Theme for components',
      toolbar: {
        // The label to show for this toolbar item
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { title: 'light', icon: 'sun', value: 'light' },
          { title: 'dark', icon: 'moon', value: 'dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, { globals }) => {

      useLayoutEffect(() => {
        // Add tailwind theme-based background classes to story wrapping elements
        document.querySelectorAll('.docs-story').forEach((element) => {
          element.classList.add('bg-lm-secondary', 'dark:bg-dm-secondary');
        });
      }, []);

      const theme = globals.theme;
      useLayoutEffect(() => {
        // Apply new theme every time the value changes
        changeThemeInMarkup(theme ?? getSystemPreferredTheme());
      }, [theme]);

      // Wrap all stories in a memory router in case they use react-router components or hooks
      return (
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      );
    },
  ],
} satisfies Preview;
