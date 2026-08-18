import { MemoryRouter } from 'react-router';
import { Menu } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { render } from '../__helpers__/setUpTest';

describe('<Menu />', () => {
  const setUp = () =>
    render(
      <Menu>
        <Menu.Title>Buttons</Menu.Title>
        <Menu.Item>Foo button</Menu.Item>
        <Menu.Item disabled data-testid="disabled-button">
          Bar button
        </Menu.Item>
        <Menu.Separator />
        <Menu.Title>Links</Menu.Title>
        <Menu.Item to="" selected>
          Foo link
        </Menu.Item>
        <Menu.Item to="" disabled data-testid="disabled-link">
          Bar link
        </Menu.Item>
        <Menu.Misc>Hello</Menu.Misc>
      </Menu>,
      { wrapper: MemoryRouter },
    );

  it('passes a11y checks', () => checkAccessibility(setUp()));

  it('disables button items via [disabled] attribute', async () => {
    const screen = await setUp();

    await expect.element(screen.getByTestId('disabled-button')).toHaveAttribute('disabled');
    await expect.element(screen.getByTestId('disabled-button')).not.toHaveAttribute('aria-disabled');
  });

  it('disables link items via [aria-disabled] attribute', async () => {
    const screen = await setUp();

    await expect.element(screen.getByTestId('disabled-link')).toHaveAttribute('aria-disabled');
    await expect.element(screen.getByTestId('disabled-link')).not.toHaveAttribute('disabled');
  });
});
