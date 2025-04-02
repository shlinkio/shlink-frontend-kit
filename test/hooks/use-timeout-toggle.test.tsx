import { screen } from '@testing-library/react';
import { useTimeoutToggle } from '../../src';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('useTimeoutToggle', () => {
  const setTimeout = vi.fn().mockReturnValue(1);
  const clearTimeout = vi.fn();
  const FakeComponent = ({ initialValue }: { initialValue: boolean }) => {
    const [flag, toggle] = useTimeoutToggle(initialValue, 10, setTimeout as any, clearTimeout);

    return (
      <>
        <span data-testid="flag-container">{flag ? 'true' : 'false'}</span>
        <button data-testid="flag-toggle" type="button" onClick={toggle}>Toggle</button>
      </>
    );
  };
  const setUp = (initialValue: boolean = true) => renderWithEvents(<FakeComponent initialValue={initialValue} />);

  it.each([[true, 'true'], [false, 'false']])('sets initial value', (initialValue, expectedContent) => {
    setUp(initialValue);

    expect(screen.getByTestId('flag-container')).toHaveTextContent(expectedContent);
  });

  it('clears timeout on second toggle', async () => {
    const { user } = setUp(false);

    expect(setTimeout).not.toHaveBeenCalled();
    expect(clearTimeout).not.toHaveBeenCalled();

    await user.click(screen.getByTestId('flag-toggle'));

    expect(setTimeout).toHaveBeenCalledOnce();
    expect(clearTimeout).not.toHaveBeenCalled();

    await user.click(screen.getByTestId('flag-toggle'));

    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(clearTimeout).toHaveBeenCalledOnce();
  });
});
