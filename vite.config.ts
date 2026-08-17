import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { resolve } from 'path';
import dts from 'unplugin-dts/vite';
import { defineConfig } from 'vitest/config';
import pack from './package.json' with { type: 'json' };

const { dirname } = import.meta;

export default defineConfig({
  plugins: [
    react(),
    dts({ entryRoot: 'src', exclude: ['test', '*.config.ts', '**/*.stories.*'] }),
    tailwindcss(),
  ],

  build: {
    lib: {
      entry: {
        index: resolve(dirname, 'src/index.ts'),
      },
      formats: ['es'], // Generate ES module only
    },
    rolldownOptions: {
      // Make sure dependencies and peer dependencies are not bundled with the library
      external: [...Object.keys(pack.dependencies), ...Object.keys(pack.peerDependencies), 'react/jsx-runtime'],
      output: {
        // This ensures generated CSS file is called index.css, not style.css
        assetFileNames: 'index.[ext]',
      },
    },
  },

  test: {
    globals: true,
    clearMocks: true,
    setupFiles: ['./test/setup.ts', './.storybook/tailwind.css'],

    // Run tests in an actual browser
    browser: {
      provider: playwright({
        // In CI, this instructs playwright to use a pre-existing Chrome instance
        launchOptions: process.env.CI ? { channel: 'chrome' } : undefined,
      }),
      enabled: true,
      headless: true,
      screenshotFailures: false,
      instances: [{ browser: 'chromium' }],
    },
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      include: [
        'src/**/*.ts',
        'src/**/*.tsx',
        '!src/index.ts',
        '!src/**/*.stories.{ts,tsx}',
      ],
      reporter: ['text', 'text-summary', 'clover', 'html'],

      // Required code coverage. Lower than this will make the check fail
      thresholds: {
        statements: 95,
        branches: 90,
        functions: 90,
        lines: 95,
      },
    },
  },
});
