// @ts-expect-error The library does not expose types
import { oxlint as shlink } from '@shlinkio/eslint-config-js-coding-standard';
import { defineConfig } from 'oxlint';

export default defineConfig({
  extends: [shlink],
  rules: {
    'typescript/restrict-template-expressions': 'warn',
    'typescript/no-base-to-string': 'warn',
  },
  overrides: [
    {
      files: ['src/**/*.stories.{ts,tsx}'],
      rules: {
        // Allow Storybook stories to have a default export, as that's what Storybook expects
        'eslint/no-restricted-exports': 'off',
        'react/rules-of-hooks': 'off',
      },
    },
    {
      files: ['test/**'],
      rules: {
        'typescript/no-implied-eval': 'off',
      },
    },
  ],
});
