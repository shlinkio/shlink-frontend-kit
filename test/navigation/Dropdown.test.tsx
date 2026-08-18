import type { DropdownProps } from '../../src';
import { Dropdown, LabelledInput } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('<Dropdown />', () => {
  const setUp = (props: Pick<DropdownProps, 'buttonSize' | 'buttonVariant' | 'caretless' | 'buttonDisabled'> = {}) =>
    renderWithEvents(
      <div>
        <Dropdown buttonContent="Press me" {...props}>
          <Dropdown.Item>One</Dropdown.Item>
          <Dropdown.Item>Two</Dropdown.Item>
          <Dropdown.Item>Three</Dropdown.Item>
          <Dropdown.Misc>
            <LabelledInput aria-hidden type="text" label="Text input" />
          </Dropdown.Misc>
        </Dropdown>
        <button>Other button</button>
        <div data-testid="non-focusable-item">Non focusable item</div>
      </div>,
    );
  const setUpOpened = async () => {
    const { user, ...screen } = await setUp();

    await user.click(screen.getByRole('button', { name: 'Press me' }));
    await screen.getByRole('menu').findElement();

    return { user, ...screen };
  };

  it.each([setUp, setUpOpened])('passes a11y checks', (setUpFunction) => checkAccessibility(setUpFunction()));

  it('closes menu when pressing `Escape`', async () => {
    const { user, ...screen } = await setUpOpened();

    await expect.element(screen.getByRole('menu')).toBeInTheDocument();
    await user.type(screen.getByLabelText('Text input'), '{Escape}');
    await expect.element(screen.getByRole('menu')).not.toBeInTheDocument();
    expect(document.activeElement).toEqual(screen.getByRole('button', { name: 'Press me' }).element());
  });

  it('closes menu when clicking away', async () => {
    const { user, ...screen } = await setUpOpened();

    await expect.element(screen.getByRole('menu')).toBeInTheDocument();
    await user.click(screen.getByTestId('non-focusable-item'));
    await expect.element(screen.getByRole('menu')).not.toBeInTheDocument();
    expect(document.activeElement).toEqual(screen.getByRole('button', { name: 'Press me' }).element());
  });

  it('closes menu when focusing away', async () => {
    const { user, ...screen } = await setUpOpened();

    await expect.element(screen.getByRole('menu')).toBeInTheDocument();
    await user.tab(); // Tab to focus the next focusable element, which is outside the menu
    await expect.element(screen.getByRole('menu')).not.toBeInTheDocument();
    expect(document.activeElement).toEqual(screen.getByRole('button', { name: 'Other button' }).element());
  });

  it('opens menu when pressing down arrow in toggle button', async () => {
    const { user, ...screen } = await setUp();

    // Focus button and press ArrowDown
    await user.tab();
    await user.keyboard('{ArrowDown}');

    await expect.element(screen.getByRole('menu')).toBeInTheDocument();
  });

  it.each([
    { buttonSize: 'sm' as const },
    { buttonSize: 'md' as const },
    { buttonSize: 'lg' as const },
    { buttonVariant: 'button' as const },
    { buttonVariant: 'link' as const },
    { buttonVariant: 'text' as const },
    { caretless: false },
    { caretless: true },
    { buttonDisabled: true },
  ])('renders toggle button with the right classes based on provided props', async (props) => {
    const screen = await setUp(props);
    expect(screen.getByRole('button', { name: 'Press me' }).element().className).toMatchSnapshot();
  });

  it.each([{ props: {} }, { props: { caretless: true } }, { props: { caretless: false } }])(
    'renders caret only if caretless is false',
    async ({ props }) => {
      const screen = await setUp(props);

      if (!props.caretless) {
        await expect.element(screen.getByRole('img', { includeHidden: true })).toBeInTheDocument();
      } else {
        await expect.element(screen.getByRole('img', { includeHidden: true })).not.toBeInTheDocument();
      }
    },
  );
});
