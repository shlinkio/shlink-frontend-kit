import { render } from '@testing-library/react';
import type { SelectProps } from '../../src';
import { Select } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';

describe('<Select />', () => {
  const setUp = (props: Omit<SelectProps, 'children'> = {}) => render(
    <Select {...props}>
      <option>Foo</option>
      <option>Bar</option>
    </Select>,
  );

  it('passes a11y checks', () => checkAccessibility(setUp({ 'aria-label': 'Select option' })));

  it.each([
    {},
    { size: 'sm' as const },
    { size: 'md' as const },
    { size: 'lg' as const },
    { feedback: 'error' as const },
    { disabled: true },
  ])('renders as expected based on provided props', (props) => {
    const { container } = setUp(props);
    expect(container).toMatchSnapshot();
  });
});
