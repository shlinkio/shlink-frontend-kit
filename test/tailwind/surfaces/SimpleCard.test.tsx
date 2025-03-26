import { render } from '@testing-library/react';
import type { SimpleCardProps } from '../../../src/tailwind';
import { SimpleCard } from '../../../src/tailwind';
import { checkAccessibility } from '../../__helpers__/accessibility';

describe('<SimpleCard />', () => {
  const setUp = (props: SimpleCardProps = {}) => render(<SimpleCard {...props} />);

  it('passes a11y checks', () => checkAccessibility(setUp({ title: 'Hi!' })));

  it.each([
    {},
    { title: 'Hello' },
    { title: 'Hello', titleSize: 'sm' as const },
    { title: 'Hello', titleSize: 'md' as const },
    { title: 'Hello', titleSize: 'lg' as const },
  ])('renders as expected based on provided props', (props) => {
    const { container } = setUp(props);
    expect(container).toMatchSnapshot();
  });
});
