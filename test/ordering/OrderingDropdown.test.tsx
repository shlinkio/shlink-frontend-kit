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
    // FIXME reactstrap sets tabindex={0} to items, when it should be setting -1. It cannot be overwritten
    // setUpWithDisplayedMenu,
  ])('passes a11y checks', (s) => checkAccessibility(s()));

  it('properly renders provided list of items', async () => {
    await setUpWithDisplayedMenu();

    const dropdownItems = screen.getAllByRole('menuitem');

    expect(dropdownItems).toHaveLength(Object.values(items).length);
    expect(dropdownItems[0]).toHaveTextContent('Foo');
    expect(dropdownItems[1]).toHaveTextContent('Bar');
    expect(dropdownItems[2]).toHaveTextContent('Hello World');
    expect(screen.getByRole('button', { name: 'Clear selection' })).toBeInTheDocument();
  });

  it.each([
    ['foo', 0],
    ['bar', 1],
    ['baz', 2],
  ])('properly marks selected field as active with proper icon', async (field, expectedActiveIndex) => {
    await setUpWithDisplayedMenu({ order: { field, dir: 'DESC' } });

    const dropdownItems = screen.getAllByRole('menuitem');

    expect(dropdownItems).toHaveLength(4);
    expect(screen.queryByRole('button', { name: 'Clear selection' })).not.toBeInTheDocument();

    dropdownItems.forEach((item, index) => {
      if (index === expectedActiveIndex) {
        expect(item).toHaveAttribute('class', expect.stringContaining('active'));
      } else {
        expect(item).not.toHaveAttribute('class', expect.stringContaining('active'));
      }
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

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(expectedNewField, expectedNewDir);
    },
  );

  it('clears selection when last item is clicked', async () => {
    const onChange = vi.fn();
    const { user } = await setUpWithDisplayedMenu({ onChange, order: { field: 'baz', dir: 'ASC' } });

    await user.click(screen.getAllByRole('menuitem')[3]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith();
  });

  it.each([
    [{ isButton: false }, /Order by$/],
    [{ isButton: true }, 'Order by...'],
    [
      { isButton: true, order: { field: 'foo', dir: 'ASC' as const } },
      'Order by: Foo - ASC',
    ],
    [
      { isButton: true, order: { field: 'baz', dir: 'DESC' as const } },
      'Order by: Hello World - DESC',
    ],
    [{ isButton: true, order: { field: 'baz' } }, 'Order by: Hello World - DESC'],
    [
      { isButton: true, order: { field: 'baz', dir: 'DESC' as const }, prefixed: false },
      /^Hello World - DESC/,
    ],
  ])('with %s props displays %s in toggle', async (props, expectedText) => {
    setUp(props);
    expect(screen.getByRole('button')).toHaveTextContent(expectedText);
  });
});
