import { render } from '@testing-library/react';
import type { ResultProps } from '../../../src/tailwind';
import { Result } from '../../../src/tailwind';
import { checkAccessibility } from '../../__helpers__/accessibility';

describe('<Result />', () => {
  const setUp = (props: Partial<ResultProps> = {}) => render(<Result variant="success" {...props} />);

  it('passes a11y checks', () => checkAccessibility(setUp({ children: 'Message content' })));

  it.each([
    {},
    { size: 'sm' as const },
    { size: 'md' as const },
    { size: 'lg' as const },
    { variant: 'success' as const },
    { variant: 'error' as const },
    { variant: 'warning' as const },
  ])('renders as expected based on provided props', (props) => {
    const { container } = setUp(props);
    expect(container).toMatchSnapshot();
  });
});
