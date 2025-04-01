import { render } from '@testing-library/react';
import type { MessageProps } from '../../../src/tailwind';
import { Message } from '../../../src/tailwind';
import { checkAccessibility } from '../../__helpers__/accessibility';

describe('<Message />', () => {
  const setUp = (props: Partial<MessageProps> = {}) => render(<Message {...props} />);

  it('passes a11y checks', () => checkAccessibility(setUp({ children: 'Message content' })));

  it.each([
    {},
    { loading: true },
    { loading: true, children: 'Alternative content' },
    { variant: 'default' as const, children: 'Default message' },
    { variant: 'error' as const, children: 'Error message' },
  ])('renders as expected based on provided props', (props) => {
    const { container } = setUp(props);
    expect(container).toMatchSnapshot();
  });
});
