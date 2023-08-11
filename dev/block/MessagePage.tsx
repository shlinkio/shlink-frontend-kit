import type { FC } from 'react';
import { Message } from '../../src';

export const MessagePage: FC = () => (
  <>
    <Message>This is a message</Message>
    <Message type="error">Oops! This is an error</Message>
    <Message loading />
  </>
);
