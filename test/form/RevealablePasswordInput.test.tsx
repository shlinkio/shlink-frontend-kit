import { screen } from '@testing-library/react';
import type { RevealablePasswordInputProps } from '../../src/tailwind';
import { RevealablePasswordInput } from '../../src/tailwind';
import { checkAccessibility } from '../__helpers__/accessibility';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('<RevealablePasswordInput />', () => {
  const setUp = (props: RevealablePasswordInputProps = {}) => renderWithEvents(
    <>
      <RevealablePasswordInput {...props} />
      <button data-testid="alt-button">Some other focusable element</button>
    </>,
  );

  it('passes a11y checks', () => checkAccessibility(setUp({ 'aria-label': 'The password' })));

  it('toggles password when clicking reveal button', async () => {
    const { user } = setUp();

    expect(screen.getByTestId('input')).toHaveAttribute('type', 'password');
    await user.click(screen.getByLabelText('Show password'));
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'text');
    await user.click(screen.getByLabelText('Hide password'));
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'password');
  });

  it('hides password when focus moves away', async () => {
    const { user } = setUp();

    expect(screen.getByTestId('input')).toHaveAttribute('type', 'password');
    await user.click(screen.getByLabelText('Show password'));
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'text');
    await user.click(screen.getByTestId('alt-button'));
    expect(screen.getByTestId('input')).toHaveAttribute('type', 'password');
  });

  it.each([
    'sm' as const,
    'md' as const,
    'lg' as const,
  ])('renders different classes depending on the size', (size) => {
    setUp({ size });
    expect(screen.getByTestId('input')).toMatchSnapshot();
  });
});
