import type { StorybookConfig } from '@storybook/react-vite';

// eslint-disable-next-line no-restricted-exports
export default {
  stories: [
    './stories/*.mdx',
    '../src/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react-vite',
} satisfies StorybookConfig;
