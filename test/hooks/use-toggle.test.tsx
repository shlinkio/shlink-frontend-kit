import { screen } from '@testing-library/react';
import type { UserEvent } from '@testing-library/user-event';
import { useToggle } from '../../src';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('useToggle', () => {
  function FakeComponent({ initialValue }: { initialValue: boolean }) {
    const { flag, toggle, setToFalse, setToTrue } = useToggle(initialValue);

    return (
      <div>
        <div data-testid="flag-value">{flag ? 'true' : 'false'}</div>
        <button data-testid="toggle" onClick={toggle}>Toggle</button>
        <button data-testid="set-to-true" onClick={setToTrue}>Set to true</button>
        <button data-testid="set-to-false" onClick={setToFalse}>Set to false</button>
      </div>
    );
  }

  const setUp = (initialValue = false) => renderWithEvents(<FakeComponent initialValue={initialValue} />);
  const assertValue = (expectedValue: boolean) => {
    expect(screen.getByTestId('flag-value')).toHaveTextContent(expectedValue ? 'true' : 'false');
  };
  const clickButton = async (user: UserEvent, buttonId: 'toggle' | 'set-to-true' | 'set-to-false') => {
    await user.click(screen.getByTestId(buttonId));
  };

  it.each([true, false])('sets initial value', (initialValue) => {
    setUp(initialValue);
    assertValue(initialValue);
  });

  it('can toggle the value', async () => {
    const { user } = setUp();

    assertValue(false);
    await clickButton(user, 'toggle');
    assertValue(true);
    await clickButton(user, 'toggle');
    assertValue(false);
    await clickButton(user, 'toggle');
    assertValue(true);
  });

  it('can set value to true', async () => {
    const { user } = setUp();

    assertValue(false);
    await clickButton(user, 'set-to-true');
    assertValue(true);
    await clickButton(user, 'set-to-true');
    assertValue(true);
    await clickButton(user, 'set-to-true');
    assertValue(true);
  });

  it('can set value to false', async () => {
    const { user } = setUp(true);

    assertValue(true);
    await clickButton(user, 'set-to-false');
    assertValue(false);
    await clickButton(user, 'set-to-false');
    assertValue(false);
    await clickButton(user, 'set-to-false');
    assertValue(false);
  });
});
