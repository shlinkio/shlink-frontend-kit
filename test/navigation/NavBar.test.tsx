import { MemoryRouter } from 'react-router';
import { page as screen } from 'vitest/browser';
import { Dropdown, NavBar } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('<NavBar />', () => {
  const setUp = () =>
    renderWithEvents(
      <MemoryRouter>
        <NavBar brand="Brand">
          <NavBar.MenuItem to="/">Foo</NavBar.MenuItem>
          <NavBar.MenuItem to="/">Bar</NavBar.MenuItem>
          <NavBar.MenuItem to="/" active>
            Baz
          </NavBar.MenuItem>
          <NavBar.Dropdown buttonContent="Options">
            <Dropdown.Item>One</Dropdown.Item>
            <Dropdown.Item>Two</Dropdown.Item>
            <Dropdown.Item selected>Three</Dropdown.Item>
          </NavBar.Dropdown>
        </NavBar>
      </MemoryRouter>,
    );

  it('passes a11y checks', () => checkAccessibility(setUp()));

  it('can toggle menu', async () => {
    const { user } = setUp();

    await expect.element(screen.getByRole('menu')).not.toBeInTheDocument();
    await user.click(screen.getByLabelText('Show menu'));
    await expect.element(screen.getByRole('menu')).toBeInTheDocument();
    await user.click(screen.getByLabelText('Hide menu'));
    await expect.element(screen.getByRole('menu')).not.toBeInTheDocument();
  });
});
