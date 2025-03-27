import { screen } from '@testing-library/react';
import type { CardModalProps } from '../../../src/tailwind/feedback/CardModal';
import { CardModal } from '../../../src/tailwind/feedback/CardModal';
import { checkAccessibility } from '../../__helpers__/accessibility';
import { renderWithEvents } from '../../__helpers__/setUpTest';

describe('<CardModal />', () => {
  const onClose = vi.fn();
  const setUp = (props: Partial<CardModalProps> = {}) => renderWithEvents(
    <CardModal open onClose={onClose} title="The title" {...props}>
      <div data-testid="content">This is the content</div>
    </CardModal>,
  );

  it('passes a11y checks', () => checkAccessibility(setUp()));

  it.each([
    ['default' as const],
    ['danger' as const],
    ['cover' as const],
  ])('closes modal when close button is clicked', async (variant) => {
    const { user } = setUp({ variant });

    await user.click(screen.getByLabelText('Close dialog'));
    expect(onClose).toHaveBeenCalled();
  });

  it.each([
    { onConfirm: vi.fn() },
    { onConfirm: undefined },
  ])('shows footer only when onConfirm is provided', ({ onConfirm }) => {
    setUp({ onConfirm });

    if (onConfirm) {
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    } else {
      expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
    }
  });

  it.each([
    { confirmText: undefined },
    { confirmText: 'Do something' },
    { confirmText: 'Yes' },
  ])('allows confirm text to be customized', ({ confirmText }) => {
    setUp({ confirmText, onConfirm: vi.fn() });
    expect(screen.getByText(confirmText ?? 'Confirm')).toBeInTheDocument();
  });

  it.each([
    { button: 'Cancel', expectedCallback: onClose },
    { button: 'Confirm', expectedCallback: undefined },
  ])('invokes expected callback when footer buttons are clicked', async ({ button, expectedCallback }) => {
    const onConfirm = vi.fn();
    const { user } = setUp({ onConfirm });

    await user.click(screen.getByText(button));

    expect(expectedCallback ?? onConfirm).toHaveBeenCalled();
  });

  it.each([
    ['sm' as const],
    ['md' as const],
    ['lg' as const],
    ['xl' as const],
  ])('renders expected size', (size) => {
    const { container } = setUp({ size });
    expect(container).toMatchSnapshot();
  });

  it.each([
    { variant: 'default' as const, onConfirm: vi.fn() },
    { variant: 'danger' as const, onConfirm: vi.fn() },
    { variant: 'cover' as const },
  ])('renders expected variant', (props) => {
    const { container } = setUp(props);
    expect(container).toMatchSnapshot();
  });
});
