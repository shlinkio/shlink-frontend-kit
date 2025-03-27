import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import axe from 'axe-core';
import { afterEach } from 'vitest';

axe.configure({
  checks: [
    {
      // Disable color contrast checking, as it doesn't work in jsdom
      id: 'color-contrast',
      enabled: false,
    },
  ],
});

// Clears all mocks and cleanup DOM after every test
afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});

HTMLCanvasElement.prototype.getContext = (() => {}) as any;

HTMLDialogElement.prototype.showModal = () => {};
HTMLDialogElement.prototype.close = function() {
  const dialog = this as HTMLDialogElement;
  dialog.dispatchEvent(new CloseEvent('close'));
};
