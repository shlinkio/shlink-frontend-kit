import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { NavPills } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';

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
  ])('marks expected item as active', ({ currentPath, expectedActiveItem }) => {
    setUp({ currentPath });
    expect(screen.getByText(expectedActiveItem)).toHaveClass('active');
  });

  it.each([[true], [false]])('makes items grow if fill is set to true', (fill) => {
    setUp({ fill });
    const menuItems = screen.getAllByRole('menuitem');

    if (fill) {
      expect(menuItems.every((el) => el.classList.contains('tw:flex-grow'))).toBe(true);
    } else {
      expect(menuItems.some((el) => el.classList.contains('tw:flex-grow'))).toBe(false);
    }
  });
});
