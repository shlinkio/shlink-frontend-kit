import { fireEvent, screen, waitFor } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { SearchField } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { renderWithEvents } from '../__helpers__/setUpTest';

type SearchFieldProps = ComponentProps<typeof SearchField>;

describe('<SearchField />', () => {
  const onChange = vi.fn();
  const setUp = (props: Omit<SearchFieldProps, 'onChange'> = {}) => renderWithEvents(
    <SearchField onChange={onChange} {...props} />,
  );

  it('passes a11y checks', () => checkAccessibility(setUp()));

  it('displays clear button when value is not empty', () => {
    setUp({ initialValue: 'Foo' });
    expect(screen.getByLabelText('Clear search')).not.toHaveAttribute('hidden');
  });

  it('does not display clear button when value is empty', () => {
    setUp();
    expect(screen.getByLabelText('Clear search')).toHaveAttribute('hidden');
  });

  it('clears value when clear field is clicked', async () => {
    const { user } = setUp({ initialValue: 'Foo' });
    const expectSearchValue = (value: string) => expect(screen.getByPlaceholderText('Search...')).toHaveValue(value);
    const getClearButton = () => screen.getByLabelText('Clear search');

    expectSearchValue('Foo');
    await user.click(getClearButton());

    expect(getClearButton()).toHaveAttribute('hidden');
    expectSearchValue('');
  });

  it('delays invocation to onChange', async () => {
    setUp({ setTimeout_: ((callback: () => void) => setTimeout(callback, 10)) as any });

    fireEvent.change(screen.getByPlaceholderText('Search...'), {
      target: { value: 'New search term' },
    });

    // The callback is not called at first, and then eventually called
    expect(onChange).not.toHaveBeenCalled();
    await waitFor(() => expect(onChange).toHaveBeenCalledWith('New search term'));
  });
});
