import type { SearchInputProps } from '../../src';
import { SearchInput } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import type { RenderWithEventsResult } from '../__helpers__/setUpTest';
import { renderWithEvents } from '../__helpers__/setUpTest';

describe('<SearchInput />', () => {
  const onChange = vi.fn();
  const setUp = (props: Partial<SearchInputProps> = {}) =>
    renderWithEvents(<SearchInput onChange={onChange} {...props} />);

  const onSearchInputChange = async (value: string, { user, ...screen }: RenderWithEventsResult) =>
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
    const result = await setUp({ defaultValue: 'Hello' });

    await onSearchInputChange('', result);
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('invokes onChange with a delay when the value is not empty', async () => {
    const result = await setUp();

    await onSearchInputChange('something', result);
    expect(onChange).toHaveBeenCalledWith('something');
  });

  it('invokes onChange immediately when immediate is true', async () => {
    const result = await setUp({ immediate: true });
    await onSearchInputChange('the value', result);

    expect(onChange).toHaveBeenCalledWith('the value');
  });

  it.each([
    { borderless: true },
    { defaultValue: 'something' },
    { containerClassName: 'something' },
    { inputClassName: 'something' },
    { variant: 'unstyled' as const },
  ])('applies visual changes for some props', async (props) => {
    const { container } = await setUp(props);
    expect(container).toMatchSnapshot();
  });

  it.each([
    { loading: false, icon: 'magnifying-glass' },
    { loading: true, icon: 'circle-notch' },
  ])('shows a different icon depending on its loading state', async ({ loading, icon }) => {
    const screen = await setUp({ loading });
    await expect.element(screen.getByRole('img', { includeHidden: true })).toHaveAttribute('data-icon', icon);
  });
});
