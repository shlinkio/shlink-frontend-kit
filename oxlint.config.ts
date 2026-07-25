// @ts-expect-error The library does not expose types
import shlink from '@shlinkio/eslint-config-js-coding-standard/oxc/oxlint';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [shlink],
  overrides: [
    {
      files: ['src/**/*.stories.{ts,tsx}'],
      rules: {
        // Allow Storybook stories to have a default export, as that's what Storybook expects
        'eslint/no-restricted-exports': 'off',
        'react/rules-of-hooks': 'off',
      },
    },
  ],
});
