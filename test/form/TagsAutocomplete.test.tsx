import { screen } from '@testing-library/react';
import type { TagsAutocompleteProps } from '../../src';
import { TagsAutocomplete } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { renderWithEvents } from '../__helpers__/setUpTest';

type SetUpOptions = Pick<TagsAutocompleteProps, 'selectedTags' | 'immutable' | 'searchMode'>;

describe('<TagsAutcomplete />', () => {
  const tags = [
    'one_foo',
    'two_foo',
    'three_foo',
    'one_again_foo',
    'another_one_foo',
    'four_foo',
  ];
  const onTagsChange = vi.fn();

  const setUp = (props: SetUpOptions = {}) => renderWithEvents(
    <TagsAutocomplete
      tags={tags}
      onTagsChange={onTagsChange}
      {...props}
      aria-label="Select tags"
    />,
  );
  const setUpOpen = async ({ search = 'one', ...props }: SetUpOptions & { search?: string } = {}) => {
    const { user, ...rest } = setUp(props);
    await user.type(screen.getByLabelText('Select tags'), search);
    await screen.findByRole('listbox');

    return { user, ...rest };
  };

  it.each([
    setUp,
    setUpOpen,
  ])('passes a11y checks', (s) => checkAccessibility(s()));

  it.each([
    {
      searchMode: 'startsWith' as const,
      expectedTags: ['one_foo', 'one_again_foo'],
    },
    {
      searchMode: 'includes' as const,
      expectedTags: ['one_foo', 'one_again_foo', 'another_one_foo'],
    },
  ])('shows expected search results depending on search mode', async ({ searchMode, expectedTags }) => {
    await setUpOpen({ searchMode, immutable: true });
    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(expectedTags.length);
    options.forEach((option, index) => expect(option).toHaveTextContent(expectedTags[index]));
  });

  it('limits amount of search matches to 5', async () => {
    await setUpOpen({ search: 'foo', searchMode: 'includes', immutable: true });
    expect(screen.getAllByRole('option')).toHaveLength(5);
  });

  it('excludes selected tags from search results', async () => {
    await setUpOpen({ selectedTags: ['one_foo', 'another_one_foo'], searchMode: 'includes', immutable: true });

    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByRole('option', { name: 'one_again_foo' })).toBeInTheDocument();
  });

  it.each([
    { immutable: true, expectedOptions: 2 },
    { immutable: false, expectedOptions: 3 },
  ])('adds one extra option to the list when it is not immutable', async ({ immutable, expectedOptions }) => {
    await setUpOpen({ immutable, search: 'one' });

    expect(screen.getAllByRole('option')).toHaveLength(expectedOptions);
    if (!immutable) {
      expect(screen.getByRole('option', { name: 'Add "one" tag' })).toBeInTheDocument();
    } else {
      expect(screen.queryByRole('option', { name: 'Add "one" tag' })).not.toBeInTheDocument();
    }
  });

  it('closes listbox when search box is cleared', async () => {
    const { user } = await setUpOpen();

    await user.clear(screen.getByLabelText('Select tags'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('shows list of selected tags', () => {
    const selectedTags = [tags[0], tags[1], tags[3]];
    setUp({ selectedTags });

    const listItems = screen.getAllByRole('listitem');

    expect(listItems).toHaveLength(selectedTags.length);
    listItems.forEach((listItem, index) => expect(listItem).toHaveTextContent(selectedTags[index]));
  });

  it('removes tag when its close button is clicked', async () => {
    const selectedTags = [tags[0], tags[1], tags[3]];
    const { user } = setUp({ selectedTags });

    await user.click(screen.getByLabelText(`Remove ${tags[1]}`));
    expect(onTagsChange).toHaveBeenLastCalledWith([tags[0], tags[3]]);

    await user.click(screen.getByLabelText(`Remove ${tags[0]}`));
    expect(onTagsChange).toHaveBeenLastCalledWith([tags[1], tags[3]]);

    await user.click(screen.getByLabelText(`Remove ${tags[3]}`));
    expect(onTagsChange).toHaveBeenLastCalledWith([tags[0], tags[1]]);
  });

  it('removes last selected tag when Backspace is pressed on empty search box', async () => {
    const selectedTags = [tags[0], tags[1], tags[3]];
    const { user } = setUp({ selectedTags });

    await user.type(screen.getByLabelText('Select tags'), '{Backspace}');
    expect(onTagsChange).toHaveBeenLastCalledWith([tags[0], tags[1]]);
  });

  it('adds matching tag from search results', async () => {
    const { user } = await setUpOpen();

    await user.click((screen.getByRole('option', { name: 'one_foo' })));
    expect(onTagsChange).toHaveBeenLastCalledWith(['one_foo']);
  });

  it('adds non matching tag from search results', async () => {
    const { user } = await setUpOpen({ search: 'does_not_match' });

    await user.click((screen.getByRole('option', { name: 'Add "does_not_match" tag' })));
    expect(onTagsChange).toHaveBeenLastCalledWith(['does_not_match']);
  });

  it('normalizes tags to be added', async () => {
    const { user } = await setUpOpen({ search: ' foo,BAR , ba   z ' });

    await user.click((screen.getByRole('option', { name: /Add\s+"([^"]+)"\s+tag/ })));
    expect(onTagsChange).toHaveBeenLastCalledWith(['foo', 'bar', 'ba-z']);
  });
});
