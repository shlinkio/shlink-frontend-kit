import { render, screen } from '@testing-library/react';
import type { ResultProps } from '../../src';
import { Result } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';

describe('<Result />', () => {
  const setUp = (props: ResultProps) => render(<Result {...props} />);

  it.each([
    ['success' as const],
    ['error' as const],
    ['warning' as const],
  ])('passes a11y checks', (type) => checkAccessibility(setUp({ children: 'The result', type })));

  it.each([
    ['success' as const, 'bg-main text-white'],
    ['error' as const, 'bg-danger text-white'],
    ['warning' as const, 'bg-warning'],
  ])('renders expected classes based on type', (type, expectedClasses) => {
    setUp({ type });
    expect(screen.getByRole('document')).toHaveClass(expectedClasses);
  });

  it.each([
    ['foo'],
    ['bar'],
  ])('renders provided classes in root element', (className) => {
    const { container } = setUp({ type: 'success', className });
    expect(container.firstChild).toHaveClass(className);
  });

  it.each([{ small: true }, { small: false }])('renders small results properly', ({ small }) => {
    const { container } = setUp({ type: 'success', small });
    const bigElement = container.querySelectorAll('.w-75');
    const smallElement = container.querySelectorAll('.w-100');

    expect(bigElement).toHaveLength(small ? 0 : 1);
    expect(smallElement).toHaveLength(small ? 1 : 0);
  });
});
