import type { FC } from 'react';
import { Result } from '../../src';

export const ResultPage: FC = () => (
  <>
    <Result type="success">Success result</Result>
    <Result type="error">Error result</Result>
    <Result type="warning">Warning result</Result>
    <Result type="success" small>Small success result</Result>
    <Result type="error" small>Small error result</Result>
    <Result type="warning" small>Small warning result</Result>
  </>
);
