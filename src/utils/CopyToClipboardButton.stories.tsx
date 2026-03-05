import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Input } from '../form';
import { CopyToClipboardButton } from './CopyToClipboardButton';

const meta = {
  component: CopyToClipboardButton,
  tags: ['autodocs'],
} satisfies Meta<typeof CopyToClipboardButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    text: 'Text to copy',
  },
  render: (args) => {
    const [text, setText] = useState('Click to copy this text');

    return (
      <div className="flex items-center gap-x-2">
        <Input value={text} onChange={(e) => setText(e.target.value)} className="grow" />
        <CopyToClipboardButton {...args} text={text} />
      </div>
    );
  },
};

