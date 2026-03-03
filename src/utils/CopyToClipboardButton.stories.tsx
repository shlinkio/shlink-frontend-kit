import type { Meta } from '@storybook/react-vite';
import { useState } from 'react';
import { Input } from '../form';
import { CopyToClipboardButton } from './CopyToClipboardButton';

export default {
  component: CopyToClipboardButton,
  tags: ['autodocs'],
} satisfies Meta<typeof CopyToClipboardButton>;

export const Base = () => {
  const [text, setText] = useState('Click to copy this text');

  return (
    <div className="flex items-center gap-x-2">
      <Input value={text} onChange={(e) => setText(e.target.value)} className="grow" />
      <CopyToClipboardButton text={text} />
    </div>
  );
};
