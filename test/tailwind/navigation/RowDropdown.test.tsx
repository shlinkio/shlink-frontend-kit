import { screen } from '@testing-library/react';
import type { Size } from '../../../src/tailwind';
import { RowDropdown   } from '../../../src/tailwind';
import { checkAccessibility } from '../../__helpers__/accessibility';
import { renderWithEvents } from '../../__helpers__/setUpTest';

describe('<RowDropdown />', () => {
  const setUp = (buttonSize?: Size) => renderWithEvents(
    <div>
      <RowDropdown buttonLabel="Press me" buttonSize={buttonSize}>
        <RowDropdown.Item>One</RowDropdown.Item>
        <RowDropdown.Item>Two</RowDropdown.Item>
        <RowDropdown.Item>Three</RowDropdown.Item>
      </RowDropdown>
      <button>Other button</button>
    </div>,
  );
  const setUpOpened = async () => {
    const { user, ...rest } = setUp();

    await user.click(screen.getByRole('button', { name: 'Press me' }));
    await screen.findByRole('menu');

    return { user, ...rest };
  };

  it.each([
    setUp,
    setUpOpened,
  ])('passes a11y checks', (setUpFunction) => checkAccessibility(setUpFunction()));

  it.only.each([
    'sm' as const,
    'md' as const,
    'lg' as const,
  ])('renders ellipsis with the right classes based on size', (buttonSize) => {
    setUp(buttonSize);
    expect(screen.getByRole('img', { hidden: true }).classList.toString()).toMatchSnapshot();
  });
});
