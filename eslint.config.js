import shlink from '@shlinkio/eslint-config-js-coding-standard';
import importPlugin from 'eslint-plugin-import';
import reactCompiler from 'eslint-plugin-react-compiler';

/* eslint-disable-next-line no-restricted-exports */
export default [
  ...shlink,
  reactCompiler.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    rules: {
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'off',
    },
  },
];
