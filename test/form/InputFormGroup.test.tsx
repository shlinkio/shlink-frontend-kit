import { fireEvent, screen } from '@testing-library/react';
import type { InputType } from 'reactstrap/types/lib/Input';
import type { InputFormGroupProps } from '../../src';
import { InputFormGroup } from '../../src';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('<InputFormGroup />', () => {
  const onChange = vi.fn();
  const setUp = (props: Partial<Omit<InputFormGroupProps, 'onChange' | 'placeholder'>> = {}) => renderWithEvents(
    <InputFormGroup value="foo" {...props} onChange={onChange} placeholder="The input" />,
  );

  it('renders input with placeholder', () => {
    setUp();
    expect(screen.getByPlaceholderText('The input')).toBeInTheDocument();
  });

  it.each([
    [undefined, 'text'],
    ['text' as InputType, 'text'],
    ['email' as InputType, 'email'],
    ['date' as InputType, 'date'],
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
