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

HTMLDialogElement.prototype.showModal = function() {
  this.setAttribute('open', '');
};
HTMLDialogElement.prototype.close = function() {
  this.removeAttribute('open');
  this.dispatchEvent(new CloseEvent('close'));
  this.dispatchEvent(new CloseEvent('cancel'));
};
