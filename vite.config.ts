// @ts-expect-error I'm not sure why is it complaining about missing type definitions
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';
import pack from './package.json';

// eslint-disable-next-line no-restricted-exports
export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true }), tailwindcss()],

  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        tailwind: resolve(__dirname, 'src/tailwind/index.ts'),
      },
      formats: ['es'], // Generate ES module only
    },
    rollupOptions: {
      // Make sure dependencies and peer dependencies are not bundled with the library
      external: [...Object.keys(pack.dependencies), ...Object.keys(pack.peerDependencies), 'react/jsx-runtime'],
      output: {
        // This ensures generated CSS file is called index.css, not style.css
        assetFileNames: 'index.[ext]',
      },
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        // Silence annoying sass deprecation warnings until we get rid of bootstrap
        silenceDeprecations: ['mixed-decls', 'abs-percent', 'color-functions', 'global-builtin', 'import'],
      },
    },
  },

  server: {
    watch: {
      // Do not watch test files or generated files, avoiding the dev server to constantly reload when not needed
      ignored: ['**/.idea/**', '**/.git/**', '**/dist/**', '**/coverage/**', '**/test/**'],
    },
  },

  test: {
    // Run tests in an actual browser
    browser: {
      provider: 'playwright',
      enabled: true,
      headless: true,
      screenshotFailures: false,
      instances: [{ browser: 'chromium' }],
    },
    globals: true,
    allowOnly: true,
    setupFiles: ['./test/setup.ts', './dev/tailwind/tailwind.css'],
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      include: [
        'src/**/*.ts',
        'src/**/*.tsx',
        '!src/index.ts',
      ],
      reporter: ['text', 'text-summary', 'clover', 'html'],

      // Required code coverage. Lower than this will make the check fail
      thresholds: {
        statements: 95,
        branches: 95,
        functions: 90,
        lines: 95,
      },
    },
  },
});
