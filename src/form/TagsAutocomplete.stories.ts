import type { Meta, StoryObj } from '@storybook/react-vite';
import { colors } from '../../.storybook/utils/colors';
import { TagsAutocomplete } from './TagsAutocomplete';

const meta = {
  component: TagsAutocomplete,
  tags: ['autodocs'],
} satisfies Meta<typeof TagsAutocomplete>;

export default meta;

type Story = StoryObj<typeof meta>;

const tags = colors.map(({ name }) => name);

export const Regular: Story = {
  args: { tags },
};

export const WithSelectedTags: Story = {
  args: {
    tags,
    selectedTags: [tags[0], tags[1]],
  },
};

export const WithCustomColors: Story = {
  args: {
    tags,
    selectedTags: [tags[5], tags[9]],
    getColorForTag: (tag) => colors.find(({ name }) => name === tag)?.value ?? 'red',
  },
};

export const SearchByIncludes: Story = {
  args: {
    tags,
    searchMode: 'includes',
  },
};
