import type { LabelProps } from '../../src';
import { Label } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { render } from '../__helpers__/setUpTest';

describe('<Label />', () => {
  const setUp = (props: Pick<LabelProps, 'children' | 'required'>) => render(<Label {...props} />);

  it.each([{ required: false }, { required: true }])('passes a11y checks', ({ required }) =>
    checkAccessibility(setUp({ children: 'Foo', required })),
  );

  it.each([{ content: 'Foo' }, { content: 'Bar' }])('renders provided content', async ({ content }) => {
    const screen = await setUp({ children: content });
    await expect.element(screen.getByText(content)).toBeInTheDocument();
  });

  it.each([{ required: false }, { required: true }])(
    'renders required indicator when is required',
    async ({ required }) => {
      const screen = await setUp({ children: 'Foo', required });

      if (required) {
        await expect.element(screen.getByTestId('required-indicator')).toBeInTheDocument();
      } else {
        await expect.element(screen.getByTestId('required-indicator')).not.toBeInTheDocument();
      }
    },
  );
});
