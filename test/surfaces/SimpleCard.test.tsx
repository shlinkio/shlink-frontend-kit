import type { SimpleCardProps } from '../../src';
import { SimpleCard } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { render } from '../__helpers__/setUpTest';

describe('<SimpleCard />', () => {
  const setUp = (props: SimpleCardProps = {}) => render(<SimpleCard {...props} />);

  it('passes a11y checks', () => checkAccessibility(setUp({ title: 'Hi!' })));

  it.each([
    {},
    { title: 'Hello' },
    { title: 'Hello', titleSize: 'sm' as const },
    { title: 'Hello', titleSize: 'md' as const },
    { title: 'Hello', titleSize: 'lg' as const },
  ])('renders as expected based on provided props', async (props) => {
    const { container } = await setUp(props);
    expect(container).toMatchSnapshot();
  });
});
