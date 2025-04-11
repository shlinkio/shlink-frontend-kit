import { screen } from '@testing-library/react';
import { fromPartial } from '@total-typescript/shoehorn';
import type { DropdownBtnMenuProps } from '../../src';
import { RowDropdownBtn } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('<RowDropdownBtn />', () => {
  const setUp = (props: Partial<DropdownBtnMenuProps> = {}) => renderWithEvents(
    <RowDropdownBtn {...fromPartial<DropdownBtnMenuProps>({ ...props })}>
      the children
    </RowDropdownBtn>,
  );

  it('passes a11y checks', () => checkAccessibility(setUp()));

  it('renders expected components', () => {
    setUp();
    const toggle = screen.getByRole('button');

    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveClass('btn-sm');
    expect(toggle).toHaveClass('dropdown-btn__toggle');
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('renders expected children only while it is open', async () => {
    const { user } = setUp({ label: 'The button' });

    // Children are not shown, as it is initially closed
    expect(screen.queryByText('the children')).not.toBeInTheDocument();

    // After clicking on it, the menu is open, and children are rendered
    await user.click(screen.getByLabelText('The button'));
    expect(screen.getByText('the children')).toBeInTheDocument();

    // Clicking again will close the menu, removing children
    await user.click(screen.getByLabelText('The button'));
    expect(screen.queryByText('the children')).not.toBeInTheDocument();
  });
});
