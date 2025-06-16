import { render, screen } from '@testing-library/react';
import { ModalDialog } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';

describe('<ModalDialog />', () => {
  const onClose = vi.fn();
  const setUp = (open = true) => render(
    <ModalDialog open={open} onClose={onClose}>
      <div data-testid="content">This is the content of the dialog</div>
    </ModalDialog>,
  );

  it('passes a11y checks', () => checkAccessibility(setUp()));

  it.each([[true], [false]])('renders children only when open', (open) => {
    setUp(open);

    if (open) {
      expect(screen.getByTestId('content')).toBeInTheDocument();
    } else {
      expect(screen.queryByTestId('content')).not.toBeInTheDocument();
    }
  });

  it('invokes onClose when the dialog is closed', () => {
    setUp();

    screen.getByRole('dialog').dispatchEvent(new CloseEvent('cancel'));
    expect(onClose).toHaveBeenCalled();
  });

  it('hides body scroll while open', () => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'scroll';

    try {
      setUp();
      expect(document.body.style.overflow).toEqual('hidden');
    } finally {
      document.body.style.overflow = prevOverflow;
    }
  });

  it('adds right padding to body if scroll was visible', () => {
    const prevPadding = document.body.style.paddingRight;

    // Mock window.outerWidth and body.clientWidth
    Object.defineProperty(document.body, 'scrollHeight', { writable: true, configurable: true, value: 1200 });
    Object.defineProperty(document.body, 'clientHeight', { writable: true, configurable: true, value: 1185 });

    try {
      setUp();
      expect(document.body.style.paddingRight).not.toEqual(prevPadding);
    } finally {
      document.body.style.paddingRight = prevPadding;
    }
  });
});
