import type { FC } from 'react';
import { useState } from 'react';
import { CopyToClipboardButton, Input } from '../../src';

export const UtilsPage: FC = () => {
  const [text, setText] = useState('');

  return (
    <div className="tw:flex tw:flex-col tw:gap-y-4">
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Copy to clipboard</h2>
        <p>Copy the text from the input into the clipboard.</p>
        <div className="tw:flex tw:items-center tw:gap-x-2">
          <Input value={text} onChange={(e) => setText(e.target.value)} className="tw:grow" />
          <CopyToClipboardButton text={text} />
        </div>
      </div>
    </div>
  );
};
