import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { SimpleCard } from '../surfaces';
import { Paginator } from './Paginator';

const meta = {
  component: Paginator,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <SimpleCard>
        <Story />
      </SimpleCard>
    ),
  ],
} satisfies Meta<typeof Paginator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ButtonBased: Story = {
  // @ts-expect-error Type is not being properly inferred
  args: {
    pagesCount: 10,
    currentPage: 3,
    onPageChange: () => fn(),
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(3);
    return <Paginator {...args} currentPage={currentPage} onPageChange={setCurrentPage} />;
  },
};

export const LinkBased: Story = {
  // @ts-expect-error Type is not being properly inferred
  args: {
    pagesCount: 10,
    currentPage: 3,
    urlForPage: (page) => `${page}`,
  },
};
