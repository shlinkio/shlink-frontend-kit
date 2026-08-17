import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { userEvent } from 'vitest/browser';

export const renderWithEvents = (element: ReactElement) => ({
  user: userEvent.setup(),
  ...render(element),
});
