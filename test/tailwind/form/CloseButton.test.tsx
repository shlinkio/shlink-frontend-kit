import { screen } from '@testing-library/react';
import type { CloseButtonProps } from '../../../src/tailwind';
import { CloseButton } from '../../../src/tailwind';
import { checkAccessibility } from '../../__helpers__/accessibility';
import { renderWithEvents } from '../../__helpers__/setUpTest';

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
});
