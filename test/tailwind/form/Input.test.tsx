import { render } from '@testing-library/react';
import type { InputProps } from '../../../src/tailwind';
import { Input } from '../../../src/tailwind';
import { checkAccessibility } from '../../__helpers__/accessibility';

describe('<Input />', () => {
  const setUp = (props: InputProps = {}) => render(<Input {...props} />);

  it('passes a11y checks', () => checkAccessibility(setUp({ 'aria-label': 'The input' })));

  it.each([
    {},
    { borderless: true },
    { borderless: false },
    { size: 'sm' as const },
    { size: 'md' as const },
    { size: 'lg' as const },
    { feedback: 'error' as const },
    { disabled: true },
    { readOnly: true },
    { readOnly: true, disabled: true },
  ])('renders as expected based on provided props', (props) => {
    const { container } = setUp(props);
    expect(container).toMatchSnapshot();
  });
});
