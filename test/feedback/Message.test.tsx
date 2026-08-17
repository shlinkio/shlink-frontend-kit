import type { MessageProps } from '../../src';
import { Message } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { render } from '../__helpers__/setUpTest';

describe('<Message />', () => {
  const setUp = (props: Partial<MessageProps> = {}) => render(<Message {...props} />);

  it('passes a11y checks', () => checkAccessibility(setUp({ children: 'Message content' })));

  it.each([
    {},
    { loading: true },
    { loading: true, children: 'Alternative content' },
    { variant: 'default' as const, children: 'Default message' },
    { variant: 'error' as const, children: 'Error message' },
  ])('renders as expected based on provided props', async (props) => {
    const { container } = await setUp(props);
    expect(container).toMatchSnapshot();
  });
});
