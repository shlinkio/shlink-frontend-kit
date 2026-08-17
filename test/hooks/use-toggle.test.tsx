import { useToggle } from '../../src';
import type { RenderWithEventsResult } from '../__helpers__/setUpTest';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('useToggle', () => {
  function FakeComponent({ initialValue }: { initialValue: boolean }) {
    const { flag, toggle, setToFalse, setToTrue } = useToggle(initialValue);

    return (
      <div>
        <div data-testid="flag-value">{flag ? 'true' : 'false'}</div>
        <button data-testid="toggle" onClick={toggle}>
          Toggle
        </button>
        <button data-testid="set-to-true" onClick={setToTrue}>
          Set to true
        </button>
        <button data-testid="set-to-false" onClick={setToFalse}>
          Set to false
        </button>
      </div>
    );
  }

  const setUp = (initialValue = false) => renderWithEvents(<FakeComponent initialValue={initialValue} />);
  const assertValue = async (screen: RenderWithEventsResult, expectedValue: boolean) =>
    expect.element(screen.getByTestId('flag-value')).toHaveTextContent(expectedValue ? 'true' : 'false');
  const clickButton = (
    { user, ...screen }: RenderWithEventsResult,
    buttonId: 'toggle' | 'set-to-true' | 'set-to-false',
  ) => user.click(screen.getByTestId(buttonId));

  it.each([true, false])('sets initial value', async (initialValue) => {
    const screen = await setUp(initialValue);
    await assertValue(screen, initialValue);
  });

  it('can toggle the value', async () => {
    const result = await setUp();

    await assertValue(result, false);
    await clickButton(result, 'toggle');
    await assertValue(result, true);
    await clickButton(result, 'toggle');
    await assertValue(result, false);
    await clickButton(result, 'toggle');
    await assertValue(result, true);
  });

  it('can set value to true', async () => {
    const result = await setUp();

    await assertValue(result, false);
    await clickButton(result, 'set-to-true');
    await assertValue(result, true);
    await clickButton(result, 'set-to-true');
    await assertValue(result, true);
    await clickButton(result, 'set-to-true');
    await assertValue(result, true);
  });

  it('can set value to false', async () => {
    const result = await setUp(true);

    await assertValue(result, true);
    await clickButton(result, 'set-to-false');
    await assertValue(result, false);
    await clickButton(result, 'set-to-false');
    await assertValue(result, false);
    await clickButton(result, 'set-to-false');
    await assertValue(result, false);
  });
});
