import type { ReactElement } from 'react';
import { render as vitestRender } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';

export const render = vitestRender;

export const renderWithEvents = async (element: ReactElement) => ({
  user: userEvent.setup(),
  ...(await render(element)),
});

export type RenderWithEventsResult = Awaited<ReturnType<typeof renderWithEvents>>;
