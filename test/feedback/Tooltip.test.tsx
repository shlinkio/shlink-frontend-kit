import type { UseTooltipOptions } from '../../src';
import { Tooltip, useTooltip } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { renderWithEvents } from '../__helpers__/setUpTest';

function TestComponent(options: UseTooltipOptions) {
  const { anchor, tooltip } = useTooltip(options);

  return (
    <div>
      <div data-testid="anchor" {...anchor}>
        Anchor
      </div>
      <Tooltip {...tooltip}>Hello!</Tooltip>
    </div>
  );
}

describe('<Tooltip />', () => {
  const setUp = (props: UseTooltipOptions = {}) => renderWithEvents(<TestComponent {...props} />);

  it('passes a11y checks', async () => {
    const { user, ...screen } = await setUp();
    await user.hover(screen.getByTestId('anchor'));
    await screen.getByRole('tooltip').findElement();

    return checkAccessibility(setUp());
  });

  it('renders tooltip on hover with transition', async () => {
    const { user, ...screen } = await setUp();

    await expect.element(screen.getByRole('tooltip')).not.toBeInTheDocument();
    await user.hover(screen.getByTestId('anchor'));
    await expect.element(await screen.getByRole('tooltip').findElement()).toBeInTheDocument();

    await user.unhover(screen.getByTestId('anchor'));
    await expect.element(screen.getByRole('tooltip')).not.toBeInTheDocument();
  });

  it.each(['top' as const, 'bottom' as const, 'left' as const, 'right' as const])(
    'renders arrow in the proper location based on placement option',
    async (placement) => {
      const { user, ...screen } = await setUp({ placement });

      await user.hover(screen.getByTestId('anchor'));
      const tooltip = await screen.getByRole('tooltip').findElement();
      const arrow = screen.getByTestId('arrow').element();

      expect(`${tooltip.className}_${arrow.className}`).toMatchSnapshot();
    },
  );
});
