import { screen } from '@testing-library/react';
import type { ToggleSwitchProps } from '../../src';
import { ToggleSwitch } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('<ToggleSwitch />', () => {
  const setUp = (props: ToggleSwitchProps = {}) => renderWithEvents(<ToggleSwitch {...props} aria-label="Toggle" />);

  it('passes a11y checks', () => checkAccessibility(setUp()));

  it.each([
    { defaultChecked: true },
    { defaultChecked: false },
  ])('invokes onChange when it is toggled', async ({ defaultChecked }) => {
    const onChange = vi.fn();
    const { user } = setUp({ defaultChecked, onChange });

    await user.click(screen.getByLabelText('Toggle'));
    expect(onChange).toHaveBeenLastCalledWith(!defaultChecked, expect.anything());

    await user.click(screen.getByLabelText('Toggle'));
    expect(onChange).toHaveBeenLastCalledWith(defaultChecked, expect.anything());
  });
});
