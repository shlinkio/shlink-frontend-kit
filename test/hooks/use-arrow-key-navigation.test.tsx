import { useRef } from 'react';
import type { RenderResult } from 'vitest-browser-react';
import type { ArrowKeyNavigationOptions } from '../../src';
import { useArrowKeyNavigation } from '../../src';
import { renderWithEvents } from '../__helpers__/setUpTest';

type SetUpOptions = Omit<ArrowKeyNavigationOptions, 'elementsSelector'> & {
  selected?: 0 | 1 | 2;
};

describe('useArrowKeyNavigation', () => {
  function FakeComponent({ selected, ...rest }: SetUpOptions) {
    const container = useRef<HTMLDivElement>(null);

    useArrowKeyNavigation(container, {
      ...rest,
      elementsSelector: 'button',
    });

    return (
      <div ref={container}>
        <button data-selected={selected === 0}>One</button>
        <button data-selected={selected === 1}>Two</button>
        <button data-selected={selected === 2}>Three</button>
      </div>
    );
  }

  const setUp = (options?: SetUpOptions) => renderWithEvents(<FakeComponent {...options} />);

  const expectFocusedButton = (name: string, screen: RenderResult) => {
    const button = screen.getByRole('button', { name }).element();

    expect(document.activeElement).toEqual(button);
    expect(button.tabIndex).toEqual(0);
  };

  it('sets tabIndex=-1 to all elements except first one', async () => {
    const screen = await setUp();

    const buttons = screen.getByRole('button').elements();

    buttons.forEach((button, index) => {
      expect(button.tabIndex).toEqual(index === 0 ? 0 : -1);
    });
  });

  it.each([{ selected: 0 as const }, { selected: 1 as const }, { selected: 2 as const }])(
    'sets tabIndex=-1 to all elements except first with [data-selected=true]',
    async ({ selected }) => {
      const screen = await setUp({ selected });

      const buttons = screen.getByRole('button').elements();

      buttons.forEach((button, index) => {
        expect(button.tabIndex).toEqual(index === selected ? 0 : -1);
      });
    },
  );

  it.each([
    { selected: undefined, expectedFocusedButton: 'One' },
    { selected: 0 as const, expectedFocusedButton: 'One' },
    { selected: 1 as const, expectedFocusedButton: 'Two' },
    { selected: 2 as const, expectedFocusedButton: 'Three' },
  ])('focuses first selected item when `focusFirstItem`is true', async ({ selected, expectedFocusedButton }) => {
    const screen = await setUp({ selected, focusFirstItem: true });
    expectFocusedButton(expectedFocusedButton, screen);
  });

  it.each(['ArrowDown', 'ArrowRight'])('can move to next items via Down/Right key', async (arrowKey) => {
    const { user, ...screen } = await setUp();

    // Start by focusing the first element normally
    await user.tab();
    expectFocusedButton('One', screen);

    // Move focus to the next element
    await user.type(document.activeElement!, `{${arrowKey}}`);
    expectFocusedButton('Two', screen);
    await user.type(document.activeElement!, `{${arrowKey}}`);
    expectFocusedButton('Three', screen);

    // After reaching the end, focus moves to the first element again
    await user.type(document.activeElement!, `{${arrowKey}}`);
    expectFocusedButton('One', screen);
  });

  it.each(['ArrowUp', 'ArrowLeft'])('can move to previous items via Up/Left key', async (arrowKey) => {
    const { user, ...screen } = await setUp({ selected: 2 });

    // Start by focusing the selected element normally
    await user.tab();
    expectFocusedButton('Three', screen);

    // Move focus to the previous element
    await user.type(document.activeElement!, `{${arrowKey}}`);
    expectFocusedButton('Two', screen);
    await user.type(document.activeElement!, `{${arrowKey}}`);
    expectFocusedButton('One', screen);

    // After reaching the start, focus moves to the last element again
    await user.type(document.activeElement!, `{${arrowKey}}`);
    expectFocusedButton('Three', screen);
  });

  it('ignores Up/Down keys when vertical is false', async () => {
    const { user, ...screen } = await setUp({ selected: 1, vertical: false });

    // Start by focusing the selected element normally
    await user.tab();
    expectFocusedButton('Two', screen);

    // Pressing Up/Down keys won't change focused item
    await user.type(document.activeElement!, '{ArrowUp}');
    expectFocusedButton('Two', screen);
    await user.type(document.activeElement!, '{ArrowDown}');
    expectFocusedButton('Two', screen);
  });

  it('ignores Left/Right keys when horizontal is false', async () => {
    const { user, ...screen } = await setUp({ selected: 1, horizontal: false });

    // Start by focusing the selected element normally
    await user.tab();
    expectFocusedButton('Two', screen);

    // Pressing Up/Down keys won't change focused item
    await user.type(document.activeElement!, '{ArrowLeft}');
    expectFocusedButton('Two', screen);
    await user.type(document.activeElement!, '{ArrowRight}');
    expectFocusedButton('Two', screen);
  });
});
