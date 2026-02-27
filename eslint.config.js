// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import shlink from '@shlinkio/eslint-config-js-coding-standard';
import storybook from 'eslint-plugin-storybook';

/* eslint-disable-next-line no-restricted-exports */
export default [
  ...shlink,
  // storybook,
  {
    // Allow config files and route files to have a default export, as that's what the third parties consuming them
    // expect
    files: [
      'src/**/*.stories.{ts,tsx}',
    ],
    rules: {
      'no-restricted-exports': 'off',
    },
  },
];
