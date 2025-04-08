import { screen } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import type { DropdownBtnProps } from '../../src';
import { DropdownBtn } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('<DropdownBtn />', () => {
  const setUp = ({ children = 'foo', ...rest }: PropsWithChildren<DropdownBtnProps>) => renderWithEvents(
    <DropdownBtn {...rest}>{children}</DropdownBtn>,
  );

  it('passes a11y checks', () => checkAccessibility(setUp({ text: 'Menu' })));

  it.each([['foo'], ['bar'], ['baz']])('displays provided text in button', (text) => {
    setUp({ text });
    expect(screen.getByRole('button')).toHaveTextContent(text);
  });

  it.each([['foo'], ['bar'], ['baz']])('displays provided children in menu', async (children) => {
    const { user } = setUp({ text: '', children });

    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('menu')).toHaveTextContent(children);
  });

  it.each([
    [undefined, 'dropdown-btn__toggle btn-block'],
    ['', 'dropdown-btn__toggle btn-block'],
    ['foo', 'dropdown-btn__toggle btn-block foo'],
    ['bar', 'dropdown-btn__toggle btn-block bar'],
  ])('includes provided classes', (className, expectedClasses) => {
    setUp({ text: '', className });
    expect(screen.getByRole('button')).toHaveClass(expectedClasses);
  });

  it.each([
    [100],
    [250],
    [undefined],
  ])('renders proper styles when minWidth is provided', async (minWidth) => {
    const { user } = setUp({ text: '', minWidth });

    await user.click(screen.getByRole('button'));

    if (minWidth) {
      expect(screen.getByRole('menu')).toHaveStyle({ 'min-width': `${minWidth}px` });
    } else {
      expect(screen.getByRole('menu')).not.toHaveStyle({ 'min-width': expect.anything() });
    }
  });
});
