import type { Size } from '../../src';
import { RowDropdown } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('<RowDropdown />', () => {
  const setUp = (buttonSize?: Size) =>
    renderWithEvents(
      <div>
        <RowDropdown buttonLabel="Press me" buttonSize={buttonSize}>
          <RowDropdown.Item>One</RowDropdown.Item>
          <RowDropdown.Item>Two</RowDropdown.Item>
          <RowDropdown.Item>Three</RowDropdown.Item>
        </RowDropdown>
        <button>Other button</button>
      </div>,
    );
  const setUpOpened = async () => {
    const { user, ...screen } = await setUp();

    await user.click(screen.getByRole('button', { name: 'Press me' }));
    await screen.getByRole('menu').findElement();

    return { user, ...screen };
  };

  it.each([setUp, setUpOpened])('passes a11y checks', (setUpFunction) => checkAccessibility(setUpFunction()));

  it.each(['sm' as const, 'md' as const, 'lg' as const])(
    'renders ellipsis with the right classes based on size',
    async (buttonSize) => {
      const screen = await setUp(buttonSize);
      expect(screen.getByRole('img', { includeHidden: true }).element().classList.toString()).toMatchSnapshot();
    },
  );
});
