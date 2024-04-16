import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';
import pack from './package.json';

// eslint-disable-next-line no-restricted-exports
export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'shlink-frontend-kit',
      fileName: 'index',
    },
    rollupOptions: {
      // Make sure dependencies and peer dependencies are not bundled with the library
      external: [...Object.keys(pack.dependencies), ...Object.keys(pack.peerDependencies), 'react/jsx-runtime'],
      output: {
        assetFileNames: 'index.[ext]',
      },
    },
  },

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.ts',
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      include: [
        'src/**/*.ts',
        'src/**/*.tsx',
        '!src/index.ts',
      ],
      reporter: ['text', 'text-summary', 'clover'],

      // Required code coverage. Lower than this will make the check fail
      thresholds: {
        statements: 95,
        branches: 95,
        functions: 80,
        lines: 95,
      },
    },
  },
});
