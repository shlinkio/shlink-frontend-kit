import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { ButtonProps } from '../../../src/tailwind';
import { Button } from '../../../src/tailwind';
import { checkAccessibility } from '../../__helpers__/accessibility';

describe('<Button />', () => {
  const setUp = (props: ButtonProps = {}) => render(
    <MemoryRouter>
      <Button {...props} />
    </MemoryRouter>,
  );

  it('passes a11y checks', () => checkAccessibility(setUp({ children: 'Press me' })));

  it.each([
    {},
    { solid: true },
    { inline: true },
    { disabled: true },
    { size: 'sm' as const },
    { size: 'md' as const },
    { size: 'lg' as const },
    { variant: 'primary' as const },
    { variant: 'secondary' as const },
    { variant: 'danger' as const },
    { variant: 'primary' as const, solid: true },
    { variant: 'secondary' as const, solid: true },
    { variant: 'danger' as const, solid: true },
    { to: '/foo/bar' },
  ])('renders as expected based on provided props', (props) => {
    const { container } = setUp(props);
    expect(container).toMatchSnapshot();
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
