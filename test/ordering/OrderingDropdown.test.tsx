import { screen } from '@testing-library/react';
import type { OrderingDropdownProps } from '../../src';
import { OrderingDropdown } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('<OrderingDropdown />', () => {
  const items = {
    foo: 'Foo',
    bar: 'Bar',
    baz: 'Hello World',
  };
  const setUp = (props: Partial<OrderingDropdownProps> = {}) => renderWithEvents(
    <OrderingDropdown items={items} order={{}} onChange={vi.fn()} {...props} />,
  );
  const setUpWithDisplayedMenu = async (props: Partial<OrderingDropdownProps> = {}) => {
    const result = setUp(props);
    const { user } = result;

    await user.click(screen.getByRole('button'));
    await screen.findByRole('menu');

    return result;
  };

  it.each([
    setUp,
    setUpWithDisplayedMenu,
  ])('passes a11y checks', (s) => checkAccessibility(s()));

  it('properly renders provided list of items', async () => {
    await setUpWithDisplayedMenu();

    const dropdownItems = screen.getAllByRole('menuitem');

    expect(dropdownItems).toHaveLength(Object.values(items).length + 1);
    expect(dropdownItems[0]).toHaveTextContent('Foo');
    expect(dropdownItems[1]).toHaveTextContent('Bar');
    expect(dropdownItems[2]).toHaveTextContent('Hello World');
    expect(dropdownItems[3]).toHaveTextContent('Clear selection');
  });

  it.each([
    ['foo', 0],
    ['bar', 1],
    ['baz', 2],
  ])('properly marks selected field as active with proper icon', async (field, expectedActiveIndex) => {
    await setUpWithDisplayedMenu({ order: { field, dir: 'DESC' } });

    const dropdownItems = screen.getAllByRole('menuitem').filter((item) => item.textContent !== 'Clear selection');

    expect(dropdownItems).toHaveLength(Object.values(items).length);

    dropdownItems.forEach((item, index) => {
      expect(item).toHaveAttribute('data-selected', index === expectedActiveIndex ? 'true' : 'false');
    });
  });

  it.each([
    [{} as any, 'foo', 'ASC'],
    [{ field: 'baz', dir: 'ASC' } as any, 'foo', 'ASC'],
    [{ field: 'foo', dir: 'ASC' } as any, 'foo', 'DESC'],
    [{ field: 'foo', dir: 'DESC' } as any, undefined, undefined],
  ])(
    'triggers change with proper params depending on clicked item and initial state',
    async (initialOrder, expectedNewField, expectedNewDir) => {
      const onChange = vi.fn();
      const { user } = await setUpWithDisplayedMenu({ onChange, order: initialOrder });

      await user.click(screen.getAllByRole('menuitem')[0]);

      expect(onChange).toHaveBeenCalledExactlyOnceWith({ field: expectedNewField, dir: expectedNewDir });
    },
  );

  it('clears selection when last item is clicked', async () => {
    const onChange = vi.fn();
    const { user } = await setUpWithDisplayedMenu({ onChange, order: { field: 'baz', dir: 'ASC' } });

    await user.click(screen.getAllByRole('menuitem')[3]);

    expect(onChange).toHaveBeenCalledExactlyOnceWith({});
  });

  it.each([
    [{ buttonVariant: 'link' as const }, /Order by$/],
    [{ buttonVariant: 'button' as const }, 'Order by...'],
    [
      { buttonVariant: 'button' as const , order: { field: 'foo', dir: 'ASC' as const } },
      'Order by: Foo - ASC',
    ],
    [
      { buttonVariant: 'button' as const , order: { field: 'baz', dir: 'DESC' as const } },
      'Order by: Hello World - DESC',
    ],
    [{ buttonVariant: 'button' as const , order: { field: 'baz' } }, 'Order by: Hello World - DESC'],
    [
      { buttonVariant: 'button' as const , order: { field: 'baz', dir: 'DESC' as const }, prefixed: false },
      /^Hello World - DESC/,
    ],
  ])('with %s props displays %s in toggle', async (props, expectedText) => {
    setUp(props);
    expect(screen.getByRole('button')).toHaveTextContent(expectedText);
  });
});
