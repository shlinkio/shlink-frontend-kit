import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Menu } from '../../../src/tailwind';
import { checkAccessibility } from '../../__helpers__/accessibility';

describe('<Menu />', () => {
  const setUp = () => render(
    <MemoryRouter>
      <Menu>
        <Menu.Title>Buttons</Menu.Title>
        <Menu.Item>Foo button</Menu.Item>
        <Menu.Item disabled data-testid="disabled-button">Bar button</Menu.Item>
        <Menu.Separator />
        <Menu.Title>Links</Menu.Title>
        <Menu.Item to="" selected>Foo link</Menu.Item>
        <Menu.Item to="" disabled data-testid="disabled-link">Bar link</Menu.Item>
        <Menu.Misc>Hello</Menu.Misc>
      </Menu>
    </MemoryRouter>,
  );

  it('passes a11y checks', () => checkAccessibility(setUp()));

  it('disables button items via [disabled] attribute', () => {
    setUp();
    expect(screen.getByTestId('disabled-button')).toHaveAttribute('disabled');
    expect(screen.getByTestId('disabled-button')).not.toHaveAttribute('aria-disabled');
  });

  it('disables link items via [aria-disabled] attribute', () => {
    setUp();
    expect(screen.getByTestId('disabled-link')).toHaveAttribute('aria-disabled');
    expect(screen.getByTestId('disabled-link')).not.toHaveAttribute('disabled');
  });
});
