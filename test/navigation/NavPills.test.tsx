import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { NavPills } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { render } from '../__helpers__/setUpTest';

type SetUpOptions = {
  currentPath?: string;
  fill?: boolean;
};

describe('<NavPills />', () => {
  const setUp = ({ currentPath = '/', fill }: SetUpOptions = {}) => {
    const history = createMemoryHistory();
    history.push({ pathname: currentPath });

    return render(
      <Router location={history.location} navigator={history}>
        <NavPills fill={fill}>
          <NavPills.Pill to="/">Home</NavPills.Pill>
          <NavPills.Pill to="/first">First</NavPills.Pill>
          <NavPills.Pill to="/second">Second</NavPills.Pill>
        </NavPills>
      </Router>,
    );
  };

  it('passes a11y checks', () => checkAccessibility(setUp()));

  it.each([
    { currentPath: '/', expectedActiveItem: 'Home' },
    { currentPath: '/first', expectedActiveItem: 'First' },
    { currentPath: '/second', expectedActiveItem: 'Second' },
  ])('marks expected item as active', async ({ currentPath, expectedActiveItem }) => {
    const screen = await setUp({ currentPath });
    await expect.element(screen.getByText(expectedActiveItem)).toHaveClass('active');
  });

  it.each([[true], [false]])('makes items grow if fill is set to true', async (fill) => {
    const screen = await setUp({ fill });
    const menuItems = screen.getByRole('menuitem').elements();
    expect(menuItems.every((el) => el.classList.contains('flex-grow'))).toBe(fill);
  });
});
