import type { FC } from 'react';
import { Result } from '../../src';

export const ResultPage: FC = () => {
  return (
    <div className="tw:flex tw:flex-col tw:gap-y-4">
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Results</h2>
        <Result variant="success">Success</Result>
        <Result variant="error">Error</Result>
        <Result variant="warning">Warning</Result>
      </div>
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Sizes</h2>
        <Result variant="success" size="sm">Small</Result>
        <Result variant="error" size="md">Medium</Result>
        <Result variant="warning" size="lg">Large</Result>
      </div>
    </div>
  );
};
