import { render } from '@testing-library/react';
import type { LinkButtonProps } from '../../../src/tailwind';
import { LinkButton } from '../../../src/tailwind';
import { checkAccessibility } from '../../__helpers__/accessibility';

describe('<LinkButton />', () => {
  const setUp = (props: LinkButtonProps = {}) => render(<LinkButton {...props} />);

  it('passes a11y checks', () => checkAccessibility(setUp({ children: 'Press me' })));

  it.each([
    {},
    { disabled: true },
    { size: 'sm' as const },
    { size: 'md' as const },
    { size: 'lg' as const },
  ])('renders as expected based on provided props', (props) => {
    const { container } = setUp(props);
    expect(container).toMatchSnapshot();
  });
});
