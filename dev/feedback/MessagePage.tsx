import type { FC } from 'react';
import { Message } from '../../src';

export const MessagePage: FC = () => {
  return (
    <div className="tw:flex tw:flex-col tw:gap-y-4">
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Messages</h2>
        <Message>This is a message</Message>
        <Message variant="error">Oops! This is an error</Message>
        <Message loading />
        <Message loading>Loading alternative content</Message>
      </div>
    </div>
  );
};
