import type { LinkButtonProps } from '../../src';
import { LinkButton } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { render } from '../__helpers__/setUpTest';

describe('<LinkButton />', () => {
  const setUp = (props: LinkButtonProps = {}) =>
    render(
      <div className="bg-white">
        <LinkButton {...props} />
      </div>,
    );

  it('passes a11y checks', () => checkAccessibility(setUp({ children: 'Press me' })));

  it.each([{}, { disabled: true }, { size: 'sm' as const }, { size: 'md' as const }, { size: 'lg' as const }])(
    'renders as expected based on provided props',
    async (props) => {
      const screen = await setUp(props);
      expect(screen.getByRole('button').element()).toMatchSnapshot();
    },
  );

  it.each([
    { type: undefined, expectedType: 'button' },
    { type: 'button' as const, expectedType: 'button' },
    { type: 'submit' as const, expectedType: 'submit' },
    { type: 'reset' as const, expectedType: 'reset' },
  ])('defaults type to `button`', async ({ type, expectedType }) => {
    const screen = await setUp({ type, children: 'The button' });
    await expect.element(screen.getByRole('button', { name: 'The button' })).toHaveAttribute('type', expectedType);
  });
});
