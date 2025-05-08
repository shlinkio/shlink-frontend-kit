import { render, screen } from '@testing-library/react';
import type { LinkButtonProps } from '../../../src/tailwind';
import { LinkButton } from '../../../src/tailwind';
import { checkAccessibility } from '../../__helpers__/accessibility';

describe('<LinkButton />', () => {
  const setUp = (props: LinkButtonProps = {}) => render(
    <div className="tw:bg-white">
      <LinkButton {...props} />
    </div>,
  );

  it('passes a11y checks', () => checkAccessibility(setUp({ children: 'Press me' })));

  it.each([
    {},
    { disabled: true },
    { size: 'sm' as const },
    { size: 'md' as const },
    { size: 'lg' as const },
  ])('renders as expected based on provided props', (props) => {
    setUp(props);
    expect(screen.getByRole('button')).toMatchSnapshot();
  });

  it.each([
    { type: undefined, expectedType: 'button' },
    { type: 'button' as const, expectedType: 'button' },
    { type: 'submit' as const, expectedType: 'submit' },
    { type: 'reset' as const, expectedType: 'reset' },
  ])('defaults type to `button`', ({ type, expectedType }) => {
    setUp({ type, children: 'The button' });
    expect(screen.getByRole('button', { name: 'The button' })).toHaveAttribute('type', expectedType);
  });
});
