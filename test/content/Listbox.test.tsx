import { screen } from '@testing-library/react';
import { useRef } from 'react';
import type { ListboxProps } from '../../src';
import { Listbox } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { renderWithEvents } from '../__helpers__/setUpTest';

type Props = Omit<ListboxProps<string>, 'anchor'> & { anchored?: boolean };

describe('<Listbox />', () => {
  function FakeComponent({ anchored = true, ...rest }: Props) {
    const anchorRef = useRef<HTMLInputElement>(null);
    return (
      <>
        <input type="text" aria-label="Anchor" ref={anchorRef} />
        <Listbox {...rest} anchor={anchored ? anchorRef : undefined} />
      </>
    );
  }

  const onSelectItem = vi.fn();
  const defaultItems = ['foo', 'bar', 'baz'];

  const setUp = ({ items, ...rest }: Partial<Props> = {}) => renderWithEvents(
    <FakeComponent
      items={items ?? new Map(defaultItems.map((item) => [item, item]))}
      onSelectItem={onSelectItem}
      renderItem={(i) => i}
      id="id"
      {...rest}
    />,
  );

  const getSelectedOption = () => screen.getByRole('option', { selected: true });

  it.each([
    undefined,
    new Map(),
  ])('passes a11y checks', (items) => checkAccessibility(setUp({ items })));

  it.each([
    { items: new Map(), noItemsMessage: undefined, expectedText: 'No items' },
    { items: new Map(), noItemsMessage: 'The list is empty', expectedText: 'The list is empty' },
    { items: new Map([['foo', 'foo']]), noItemsMessage: 'The list is empty', expectedText: undefined },
  ])('displays no-items message when the list of items is empty', ({ items, noItemsMessage, expectedText }) => {
    setUp({ items, noItemsMessage });

    if (expectedText) {
      expect(screen.getByTestId('no-items')).toHaveTextContent(expectedText);
    } else {
      expect(screen.queryByTestId('no-items')).not.toBeInTheDocument();
    }
  });

  it.each(defaultItems)('calls onSelectItem when an item is clicked', async (name) => {
    const { user } = setUp();

    expect(onSelectItem).not.toHaveBeenCalled();
    await user.click(screen.getByRole('option', { name }));
    expect(onSelectItem).toHaveBeenCalledWith(name);
  });

  it.each(defaultItems)('marks item as selected on hover', async (name) => {
    const onActiveItemChange = vi.fn();
    const { user } = setUp({ onActiveItemChange });
    const option = screen.getByRole('option', { name });

    expect(option).toHaveAttribute('aria-selected', name === 'foo' ? 'true' : 'false');
    await user.hover(option);
    expect(option).toHaveAttribute('aria-selected', 'true');
    expect(onActiveItemChange).toHaveBeenCalledWith(name, name);
  });

  it('can change active option via vertical arrow keys', async () => {
    const onActiveItemChange = vi.fn();
    const { user } = setUp({ onActiveItemChange });
    const anchorElement = screen.getByLabelText('Anchor');

    // The events are listened to on the anchor element, so let's focus it first
    anchorElement.focus();

    // First option is initially selected
    expect(getSelectedOption()).toHaveTextContent('foo');
    await user.keyboard('{ArrowDown}');
    expect(getSelectedOption()).toHaveTextContent('bar');
    expect(onActiveItemChange).toHaveBeenLastCalledWith('bar', 'bar');
    await user.keyboard('{ArrowDown}');
    expect(getSelectedOption()).toHaveTextContent('baz');
    expect(onActiveItemChange).toHaveBeenLastCalledWith('baz', 'baz');

    // It can go lower than the last option
    await user.keyboard('{ArrowDown}');
    expect(getSelectedOption()).toHaveTextContent('baz');

    await user.keyboard('{ArrowUp}');
    expect(getSelectedOption()).toHaveTextContent('bar');
    expect(onActiveItemChange).toHaveBeenLastCalledWith('bar', 'bar');
    await user.keyboard('{ArrowUp}');
    expect(getSelectedOption()).toHaveTextContent('foo');
    expect(onActiveItemChange).toHaveBeenLastCalledWith('foo', 'foo');

    // It can go higher than the first option
    await user.keyboard('{ArrowUp}');
    expect(getSelectedOption()).toHaveTextContent('foo');
  });

  it('can select option via Enter', async () => {
    const { user } = setUp();
    const anchorElement = screen.getByLabelText('Anchor');

    // The events are listened to on the anchor element, so let's focus it first
    anchorElement.focus();

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
    const { user } = setUp({ anchored: false });
    const anchorElement = screen.getByLabelText('Anchor');

    // The events are listened to on the anchor element, so let's focus it first
    anchorElement.focus();

    // Pressing Enter does not apply selected option
    expect(onSelectItem).not.toHaveBeenCalled();
    await user.keyboard('{Enter}');
    expect(onSelectItem).not.toHaveBeenCalled();

    // Pressing an arrow does not move selection
    expect(getSelectedOption()).toHaveTextContent('foo');
    await user.keyboard('{ArrowDown}');
    expect(getSelectedOption()).toHaveTextContent('foo');
  });
});
