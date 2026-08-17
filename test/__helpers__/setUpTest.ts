import { render as testingLibRender } from '@testing-library/react';
import type { ReactElement } from 'react';
import { render as vitestRender } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';

export const render = vitestRender;

export const renderWithEvents = (element: ReactElement) => ({
  user: userEvent.setup(),
  ...testingLibRender(element),
});
