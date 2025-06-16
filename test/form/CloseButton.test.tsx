import { screen } from '@testing-library/react';
import type { CloseButtonProps } from '../../src';
import { CloseButton } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('<CloseButton />', () => {
  const setUp = (props: CloseButtonProps = {}) => renderWithEvents(<CloseButton {...props} />);

  it('passes a11y checks', () => checkAccessibility(setUp()));

  it.each([[undefined], ['Click me'], ['Something else']])('sets provided label', (label) => {
    setUp({ label });
    expect(screen.getByLabelText(label ?? 'Close')).toBeInTheDocument();
  });

  it('invokes onClick when clicked', async () => {
    const onClick = vi.fn();
    const { user } = setUp({ onClick });

    await user.click(screen.getByLabelText('Close'));

    expect(onClick).toHaveBeenCalled();
  });

  it.each([
    { solid: true },
    { solid: false },
  ])('has expected classes', ({ solid }) => {
    setUp({ solid });
    expect(screen.getByRole('button').className).toMatchSnapshot();
  });

  it.each([
    'sm' as const,
    'md' as const,
    'lg' as const,
  ])('has icon with expected size', (size) => {
    setUp({ size });
    expect(screen.getByRole('img', { hidden: true })).toMatchSnapshot();
  });
});
