import { screen, waitFor } from '@testing-library/react';
import type { SearchComboboxProps } from '../../src';
import { SearchCombobox } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('<SearchCombobox />', () => {
  const onSearch = vi.fn();
  const onSelectSearchResult = vi.fn();
  const setUp = (props: Partial<SearchComboboxProps<string>> = {}) => renderWithEvents(
    <>
      <input type="text" aria-label="Other input" data-testid="alternative-input" />
      <SearchCombobox
        onSearch={onSearch}
        onSelectSearchResult={onSelectSearchResult}
        renderSearchResult={(i) => i}
        aria-label="Combobox"
        {...props}
      />
    </>,
  );

  beforeEach(() => {
    // Make all timeouts be still async, but resolve immediately
    const globalSetTimeout = setTimeout;
    vi.stubGlobal('setTimeout', (callback: () => unknown) => globalSetTimeout(callback, 0));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it.each([
    undefined,
    new Map(),
    new Map([['foo', 'bar']]),
  ])('passes a11y checks', (searchResults) => checkAccessibility(setUp({ searchResults })));

  it('does not show a listbox while there is no search results', () => {
    setUp();
    const combobox = screen.getByLabelText('Combobox');

    expect(screen.queryByLabelText('Matching items')).not.toBeInTheDocument();
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(combobox).not.toHaveAttribute('aria-activedescendant');
  });

  it('sets expected active descendant', async () => {
    const { user } = setUp({ searchResults: new Map([['foo', 'foo'], ['bar', 'bar']]) });
    const combobox = screen.getByLabelText('Combobox');

    // Focus combobox first
    await user.click(combobox);
    await waitFor(() => expect(combobox).toHaveAttribute('aria-activedescendant', expect.stringMatching(/_foo$/)));

    await user.keyboard('{ArrowDown}');
    await waitFor(() => expect(combobox).toHaveAttribute('aria-activedescendant', expect.stringMatching(/_bar$/)));
  });

  it('invokes onSearch when the search input changes', async () => {
    const { user } = setUp();

    expect(onSearch).not.toHaveBeenCalled();
    await user.type(screen.getByLabelText('Combobox'), 'search this');
    expect(onSearch).toHaveBeenCalledWith('search this');
  });

  it('invokes onSearch when focus moves back and forth the Combobox', async () => {
    const { user } = setUp();

    expect(onSearch).not.toHaveBeenCalled();
    await user.type(screen.getByLabelText('Combobox'), 'search this');

    // As the focus moves somewhere else, onSearch is called with an empty string
    await user.click(screen.getByTestId('alternative-input'));
    expect(onSearch).toHaveBeenCalledWith('');

    // When focus returns, onSearch is called with the value previously typed in the input
    await user.click(screen.getByLabelText('Combobox'));
    expect(onSearch).toHaveBeenCalledWith('search this');
  });

  it('clears input after an option is selected', async () => {
    const { user } = setUp({ searchResults: new Map([['foo', 'foo']]) });

    expect(onSearch).not.toHaveBeenCalled();
    expect(onSelectSearchResult).not.toHaveBeenCalled();
    await user.click(screen.getByRole('option', { name: 'foo' }));

    expect(onSearch).toHaveBeenCalledWith('');
    expect(onSelectSearchResult).toHaveBeenCalledWith('foo');
    expect(screen.getByLabelText('Combobox')).toHaveValue('');
  });
});
