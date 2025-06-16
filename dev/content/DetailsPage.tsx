import type { FC } from 'react';
import { Checkbox, Details, Label } from '../../src';

export const DetailsPage: FC = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <h2>Details</h2>
        <Details summary="Click here to toggle">
          <div>This is the content</div>
          <div>And this is more content</div>
          <Label className="flex items-center gap-1">
            <Checkbox /> The content is mounted only while the details are open
          </Label>
        </Details>
      </div>
    </div>
  );
};
