import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import type { UseTooltipOptions } from '../../../src/tailwind';
import { Tooltip, useTooltip } from '../../../src/tailwind';
import { checkAccessibility } from '../../__helpers__/accessibility';
import { renderWithEvents } from '../../__helpers__/setUpTest';

function TestComponent(options: UseTooltipOptions) {
  const { anchor, tooltip } = useTooltip(options);

  return (
    <div>
      <div data-testid="anchor" {...anchor}>Anchor</div>
      <Tooltip {...tooltip}>Hello!</Tooltip>
    </div>
  );
}

describe('<Tooltip />', () => {
  const setUp = (props: UseTooltipOptions = {}) => renderWithEvents(<TestComponent {...props} />);

  it('passes a11y checks', async () => {
    const { user } = setUp();
    await user.hover(screen.getByTestId('anchor'));
    await screen.findByRole('tooltip');

    return checkAccessibility(setUp());
  });

  it('renders tooltip on hover with transition', async () => {
    const { user } = setUp();

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    await user.hover(screen.getByTestId('anchor'));
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument());

    await user.unhover(screen.getByTestId('anchor'));
    await waitForElementToBeRemoved(screen.getByRole('tooltip'));
  });

  it.each([
    'top' as const,
    'bottom' as const,
    'left' as const,
    'right' as const,
  ])('renders arrow in the proper location based on placement option', async (placement) => {
    const { user } = setUp({ placement });

    await user.hover(screen.getByTestId('anchor'));
    const tooltip = await screen.findByRole('tooltip');
    const arrow = screen.getByTestId('arrow');

    expect(`${tooltip.className}_${arrow.className}`).toMatchSnapshot();
  });
});
