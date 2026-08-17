import type { ResultProps } from '../../src';
import { Result } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { render } from '../__helpers__/setUpTest';

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
  ])('renders as expected based on provided props', async (props) => {
    const { container } = await setUp(props);
    expect(container).toMatchSnapshot();
  });
});
