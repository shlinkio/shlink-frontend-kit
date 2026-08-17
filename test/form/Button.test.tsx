import { MemoryRouter } from 'react-router';
import type { ButtonProps } from '../../src';
import { Button } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { render } from '../__helpers__/setUpTest';

describe('<Button />', () => {
  const setUp = (props: ButtonProps = {}) =>
    render(
      <MemoryRouter>
        <div className="bg-white">
          <Button {...props} />
        </div>
      </MemoryRouter>,
    );

  it('passes a11y checks', () => checkAccessibility(setUp({ children: 'Press me' })));

  it.each([
    {},
    { solid: true },
    { inline: true },
    { disabled: true },
    { size: 'sm' as const },
    { size: 'md' as const },
    { size: 'lg' as const },
    { variant: 'primary' as const },
    { variant: 'secondary' as const },
    { variant: 'danger' as const },
    { variant: 'primary' as const, solid: true },
    { variant: 'secondary' as const, solid: true },
    { variant: 'danger' as const, solid: true },
    { to: '/foo/bar' },
  ])('renders as expected based on provided props', async (props) => {
    const { container } = await setUp(props);
    expect(container).toMatchSnapshot();
  });

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
