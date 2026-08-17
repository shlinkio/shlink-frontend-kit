import type { UserEvent } from 'vitest/browser';
import { page as screen } from 'vitest/browser';
import type { SearchInputProps } from '../../src';
import { SearchInput } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('<SearchInput />', () => {
  const onChange = vi.fn();
  const setUp = (props: Partial<SearchInputProps> = {}) =>
    renderWithEvents(<SearchInput onChange={onChange} {...props} />);

  const onSearchInputChange = async (value: string, user: UserEvent) =>
    value ? user.type(screen.getByRole('searchbox'), value) : user.clear(screen.getByRole('searchbox'));

  beforeEach(() => {
    // Make all timeouts be still async, but resolve immediately
    const globalSetTimeout = setTimeout;
    vi.stubGlobal('setTimeout', (callback: () => unknown) => globalSetTimeout(callback, 0));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it.each([{ borderless: true }, { defaultValue: 'Hello' }])('passes a11y checks', (props) =>
    checkAccessibility(setUp(props)),
  );

  // FIXME This test and the one below are no different.
  //       There should be some clear way to tell the operation is deferred when the value is empty.
  it('invokes onChange immediately when the value is empty', async () => {
    const { user } = setUp({ defaultValue: 'Hello' });

    await onSearchInputChange('', user);
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('invokes onChange with a delay when the value is not empty', async () => {
    const { user } = setUp();

    await onSearchInputChange('something', user);
    expect(onChange).toHaveBeenCalledWith('something');
  });

  it('invokes onChange immediately when immediate is true', async () => {
    const { user } = setUp({ immediate: true });
    await onSearchInputChange('the value', user);

    expect(onChange).toHaveBeenCalledWith('the value');
  });

  it.each([
    { borderless: true },
    { defaultValue: 'something' },
    { containerClassName: 'something' },
    { inputClassName: 'something' },
    { variant: 'unstyled' as const },
  ])('applies visual changes for some props', (props) => {
    const { container } = setUp(props);
    expect(container).toMatchSnapshot();
  });

  it.each([
    { loading: false, icon: 'magnifying-glass' },
    { loading: true, icon: 'circle-notch' },
  ])('shows a different icon depending on its loading state', async ({ loading, icon }) => {
    setUp({ loading });
    await expect.element(screen.getByRole('img', { includeHidden: true })).toHaveAttribute('data-icon', icon);
  });
});
