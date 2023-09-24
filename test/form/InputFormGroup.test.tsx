import { fireEvent, screen } from '@testing-library/react';
import type { InputFormGroupProps } from '../../src';
import { InputFormGroup } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('<InputFormGroup />', () => {
  const onChange = vi.fn();
  const setUp = (props: Partial<Omit<InputFormGroupProps, 'onChange' | 'placeholder'>> = {}) => renderWithEvents(
    <InputFormGroup value="foo" {...props} onChange={onChange} placeholder="The input" />,
  );

  it('passes a11y checks', () => checkAccessibility(setUp({ children: 'The label' })));

  it('renders input with placeholder', () => {
    setUp();
    expect(screen.getByPlaceholderText('The input')).toBeInTheDocument();
  });

  it.each([
    [undefined, 'text'],
    ['text' as const, 'text'],
    ['email' as const, 'email'],
    ['date' as const, 'date'],
  ])('renders input with correct type', (type, expectedType) => {
    setUp({ type, children: 'The label' });
    expect(screen.getByLabelText('The label:')).toHaveAttribute('type', expectedType);
  });

  it('invokes onChange when input is changed', async () => {
    setUp();

    fireEvent.change(screen.getByPlaceholderText('The input'), {
      target: { value: 'some text' },
    });

    expect(onChange).toHaveBeenLastCalledWith('some text');
  });
});
