import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import type { Size } from '../../../src/tailwind';
import { Dropdown,LabelledInput  } from '../../../src/tailwind';
import { checkAccessibility } from '../../__helpers__/accessibility';
import { renderWithEvents } from '../../__helpers__/setUpTest';

describe('<Dropdown />', () => {
  const setUp = (buttonSize?: Size) => renderWithEvents(
    <div>
      <Dropdown buttonContent="Press me" buttonSize={buttonSize}>
        <Dropdown.Item>One</Dropdown.Item>
        <Dropdown.Item>Two</Dropdown.Item>
        <Dropdown.Item>Three</Dropdown.Item>
        <Dropdown.Misc>
          <LabelledInput aria-hidden type="text" label="Text input" />
        </Dropdown.Misc>
      </Dropdown>
      <button>Other button</button>
    </div>,
  );
  const setUpOpened = async () => {
    const { user, ...rest } = setUp();

    await user.click(screen.getByRole('button', { name: 'Press me' }));
    await screen.findByRole('menu');

    return { user, ...rest };
  };

  it.each([
    setUp,
    setUpOpened,
  ])('passes a11y checks', (setUpFunction) => checkAccessibility(setUpFunction()));

  it('closes menu when pressing `Escape`', async () => {
    const { user } = await setUpOpened();

    expect(screen.getByRole('menu')).toBeInTheDocument();
    await user.type(screen.getByLabelText('Text input'), '{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes menu when clicking away', async () => {
    const { user } = await setUpOpened();

    expect(screen.getByRole('menu')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Other button' }));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes menu when focusing away', async () => {
    await setUpOpened();

    expect(screen.getByRole('menu')).toBeInTheDocument();
    screen.getByRole('button', { name: 'Other button' }).focus();
    await waitForElementToBeRemoved(screen.getByRole('menu'));
  });

  it.each([
    'sm' as const,
    'md' as const,
    'lg' as const,
  ])('renders toggle button with the right size', (buttonSize) => {
    setUp(buttonSize);
    expect(screen.getByRole('button', { name: 'Press me' }).className).toMatchSnapshot();
  });
});
