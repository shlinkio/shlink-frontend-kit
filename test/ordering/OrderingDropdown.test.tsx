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
  const setUp = (props: Partial<OrderingDropdownProps> = {}) =>
    renderWithEvents(<OrderingDropdown items={items} order={{}} onChange={vi.fn()} {...props} />);
  const setUpWithDisplayedMenu = async (props: Partial<OrderingDropdownProps> = {}) => {
    const { user, ...screen } = await setUp(props);

    await user.click(screen.getByRole('button'));
    await screen.getByRole('menu').findElement();

    return { user, ...screen };
  };

  it.each([setUp, setUpWithDisplayedMenu])('passes a11y checks', (s) => checkAccessibility(s()));

  it('properly renders provided list of items', async () => {
    const screen = await setUpWithDisplayedMenu();

    const dropdownItems = screen.getByRole('menuitem').elements();

    expect(dropdownItems).toHaveLength(Object.values(items).length + 1);
    await expect.element(dropdownItems[0]).toHaveTextContent('Foo');
    await expect.element(dropdownItems[1]).toHaveTextContent('Bar');
    await expect.element(dropdownItems[2]).toHaveTextContent('Hello World');
    await expect.element(dropdownItems[3]).toHaveTextContent('Clear selection');
  });

  it.each([
    ['foo', 0],
    ['bar', 1],
    ['baz', 2],
  ])('properly marks selected field as active with proper icon', async (field, expectedActiveIndex) => {
    const screen = await setUpWithDisplayedMenu({ order: { field, dir: 'DESC' } });

    const dropdownItems = screen
      .getByRole('menuitem')
      .elements()
      .filter((item) => item.textContent !== 'Clear selection');

    expect(dropdownItems).toHaveLength(Object.values(items).length);

    await Promise.all(
      dropdownItems.map((item, index) =>
        expect.element(item).toHaveAttribute('data-selected', index === expectedActiveIndex ? 'true' : 'false'),
      ),
    );
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
      const { user, ...screen } = await setUpWithDisplayedMenu({ onChange, order: initialOrder });

      await user.click(screen.getByRole('menuitem').first().element());

      expect(onChange).toHaveBeenCalledExactlyOnceWith({ field: expectedNewField, dir: expectedNewDir });
    },
  );

  it('clears selection when last item is clicked', async () => {
    const onChange = vi.fn();
    const { user, ...screen } = await setUpWithDisplayedMenu({ onChange, order: { field: 'baz', dir: 'ASC' } });

    await user.click(screen.getByRole('menuitem').elements()[3]);

    expect(onChange).toHaveBeenCalledExactlyOnceWith({});
  });

  it.each([
    [{ buttonVariant: 'link' as const }, /Order by$/],
    [{ buttonVariant: 'button' as const }, 'Order by...'],
    [{ buttonVariant: 'button' as const, order: { field: 'foo', dir: 'ASC' as const } }, 'Order by: Foo - ASC'],
    [
      { buttonVariant: 'button' as const, order: { field: 'baz', dir: 'DESC' as const } },
      'Order by: Hello World - DESC',
    ],
    [{ buttonVariant: 'button' as const, order: { field: 'baz' } }, 'Order by: Hello World - DESC'],
    [
      { buttonVariant: 'button' as const, order: { field: 'baz', dir: 'DESC' as const }, prefixed: false },
      /^Hello World - DESC/,
    ],
  ])('with %s props displays %s in toggle', async (props, expectedText) => {
    const screen = await setUp(props);
    await expect.element(screen.getByRole('button')).toHaveTextContent(expectedText);
  });
});
