import { screen } from '@testing-library/react';
import type { CheckboxProps } from '../../src';
import { Checkbox } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('<Checkbox />', () => {
  const setUp = (props: CheckboxProps = {}) => renderWithEvents(<Checkbox {...props} aria-label="Checkbox" />);

  it('passes a11y checks', () => checkAccessibility(setUp()));

  it.each([
    { defaultChecked: true },
    { defaultChecked: false },
  ])('invokes onChange when the checkbox is checked or unchecked', async ({ defaultChecked }) => {
    const onChange = vi.fn();
    const { user } = setUp({ defaultChecked, onChange });

    await user.click(screen.getByLabelText('Checkbox'));
    expect(onChange).toHaveBeenLastCalledWith(!defaultChecked, expect.anything());

    await user.click(screen.getByLabelText('Checkbox'));
    expect(onChange).toHaveBeenLastCalledWith(defaultChecked, expect.anything());
  });
});
