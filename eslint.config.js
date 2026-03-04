// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import shlink from '@shlinkio/eslint-config-js-coding-standard';
import storybook from 'eslint-plugin-storybook';

/* eslint-disable-next-line no-restricted-exports */
export default [
  ...shlink,
  ...storybook.configs['flat/recommended'],
  {
    files: ['src/**/*.stories.{ts,tsx}'],
    rules: {
      // Allow Storybook stories to have a default export, as that's what Storybook expects
      'no-restricted-exports': 'off',
    },
  },
];
