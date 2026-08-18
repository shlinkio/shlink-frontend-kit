import { useRef } from 'react';
import { userEvent } from 'vitest/browser';
import type { ListboxProps } from '../../src';
import { Listbox } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import type { RenderWithEventsResult } from '../__helpers__/setUpTest';
import { renderWithEvents } from '../__helpers__/setUpTest';

type Props = Omit<ListboxProps<string>, 'anchor'> & { anchored?: boolean };

function FakeComponent({ anchored = true, ...rest }: Props) {
  const anchorRef = useRef<HTMLInputElement>(null);
  return (
    <>
      {anchored && <input type="text" aria-label="Anchor" ref={anchorRef} />}
      <Listbox {...rest} anchor={anchored ? anchorRef : undefined} />
    </>
  );
}

describe('<Listbox />', () => {
  const onSelectItem = vi.fn();
  const defaultItems = ['foo', 'bar', 'baz'];

  const setUp = ({ items, ...rest }: Partial<Props> = {}) =>
    renderWithEvents(
      <FakeComponent
        items={items ?? new Map(defaultItems.map((item) => [item, item]))}
        onSelectItem={onSelectItem}
        renderItem={(i) => i}
        id="id"
        {...rest}
      />,
    );

  const getSelectedOption = (screen: RenderWithEventsResult) => screen.getByRole('option', { selected: true });

  beforeEach(async () => {
    // Hover state persists between tests, and the Listbox options are selected on hover. Unhovering before every test
    // prevents random failing tests.
    // See https://vitest.dev/api/browser/interactivity.html#userevent-setup for details
    await userEvent.unhover(document.body);
  });

  it.each([undefined, new Map()])('passes a11y checks', (items) => checkAccessibility(setUp({ items })));

  it.each([
    { items: new Map(), noItemsMessage: undefined, expectedText: 'No items' },
    { items: new Map(), noItemsMessage: 'The list is empty', expectedText: 'The list is empty' },
    { items: new Map([['foo', 'foo']]), noItemsMessage: 'The list is empty', expectedText: undefined },
  ])('displays no-items message when the list of items is empty', async ({ items, noItemsMessage, expectedText }) => {
    const screen = await setUp({ items, noItemsMessage });

    if (expectedText) {
      await expect.element(screen.getByTestId('no-items')).toHaveTextContent(expectedText);
    } else {
      await expect.element(screen.getByTestId('no-items')).not.toBeInTheDocument();
    }
  });

  it.each(defaultItems)('calls onSelectItem when an item is clicked', async (name) => {
    const { user, ...screen } = await setUp();

    expect(onSelectItem).not.toHaveBeenCalled();
    await user.click(screen.getByRole('option', { name }));
    expect(onSelectItem).toHaveBeenCalledWith(name);
  });

  it.each(defaultItems)('marks item as selected on hover', async (name) => {
    const onActiveItemChange = vi.fn();
    const { user, ...screen } = await setUp({ onActiveItemChange });
    const option = screen.getByRole('option', { name });

    await expect.element(option).toHaveAttribute('aria-selected', name === 'foo' ? 'true' : 'false');
    await user.hover(option);
    await expect.element(option).toHaveAttribute('aria-selected', 'true');
    expect(onActiveItemChange).toHaveBeenCalledWith(name, name);
  });

  it('can change active option via vertical arrow keys', async () => {
    const onActiveItemChange = vi.fn();
    const result = await setUp({ onActiveItemChange });
    const { user } = result;

    // The events are listened to on the anchor element, so let's focus it first
    await user.tab();

    // First option is initially selected
    await expect.element(getSelectedOption(result)).toHaveTextContent('foo');
    await user.keyboard('{ArrowDown}');
    await expect.element(getSelectedOption(result)).toHaveTextContent('bar');
    expect(onActiveItemChange).toHaveBeenLastCalledWith('bar', 'bar');
    await user.keyboard('{ArrowDown}');
    await expect.element(getSelectedOption(result)).toHaveTextContent('baz');
    expect(onActiveItemChange).toHaveBeenLastCalledWith('baz', 'baz');

    // It can't go lower than the last option
    await user.keyboard('{ArrowDown}');
    await expect.element(getSelectedOption(result)).toHaveTextContent('baz');

    await user.keyboard('{ArrowUp}');
    await expect.element(getSelectedOption(result)).toHaveTextContent('bar');
    expect(onActiveItemChange).toHaveBeenLastCalledWith('bar', 'bar');
    await user.keyboard('{ArrowUp}');
    await expect.element(getSelectedOption(result)).toHaveTextContent('foo');
    expect(onActiveItemChange).toHaveBeenLastCalledWith('foo', 'foo');

    // It can't go higher than the first option
    await user.keyboard('{ArrowUp}');
    expect(getSelectedOption(result)).toHaveTextContent('foo');
  });

  it('can select option via Enter', async () => {
    const { user } = await setUp();

    // The events are listened to on the anchor element, so let's focus it first
    await user.tab();

    expect(onSelectItem).not.toHaveBeenCalled();
    await user.keyboard('{Enter}');
    expect(onSelectItem).toHaveBeenCalledWith('foo');

    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');
    expect(onSelectItem).toHaveBeenCalledWith('bar');

    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');
    expect(onSelectItem).toHaveBeenCalledWith('baz');
  });

  it('does not add arrow and Enter listeners when listbox is not anchored', async () => {
    const result = await setUp({ anchored: false });
    const { user } = result;

    // The events are listened to on the anchor element, so let's focus it first
    await user.tab();

    // Pressing Enter does not apply selected option
    expect(onSelectItem).not.toHaveBeenCalled();
    await user.keyboard('{Enter}');
    expect(onSelectItem).not.toHaveBeenCalled();

    // Pressing an arrow does not move selection
    await expect.element(getSelectedOption(result)).toHaveTextContent('foo');
    await user.keyboard('{ArrowDown}');
    await expect.element(getSelectedOption(result)).toHaveTextContent('foo');
  });
});
