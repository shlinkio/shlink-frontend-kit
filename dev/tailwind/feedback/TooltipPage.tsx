import type { FC } from 'react';
import { useRef } from 'react';
import { Tooltip } from '../../../src/tailwind';

export const TooltipPage: FC = () => {
  const anchorRef = useRef<HTMLDivElement>(null);
  const bottomAnchorRef = useRef<HTMLDivElement>(null);
  const topAnchorRef = useRef<HTMLDivElement>(null);
  const leftAnchorRef = useRef<HTMLDivElement>(null);
  const rightAnchorRef = useRef<HTMLDivElement>(null);
  const richAnchorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="tw:flex tw:flex-col tw:gap-y-4">
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Tooltip</h2>
        <div ref={anchorRef} className="tw:border tw:p-2">Hover me</div>
        <Tooltip anchor={anchorRef}>Hello!!</Tooltip>
      </div>

      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Placements</h2>
        <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:xl:grid-cols-4 tw:gap-2">
          <div>
            <div ref={bottomAnchorRef} className="tw:border tw:p-2">Bottom - Hover me</div>
            <Tooltip anchor={bottomAnchorRef} placement="bottom">Bottom</Tooltip>
          </div>
          <div>
            <div ref={topAnchorRef} className="tw:border tw:p-2">Top - Hover me</div>
            <Tooltip anchor={topAnchorRef} placement="top">Top</Tooltip>
          </div>
          <div>
            <div ref={leftAnchorRef} className="tw:border tw:p-2">Left - Hover me</div>
            <Tooltip anchor={leftAnchorRef} placement="left">Left</Tooltip>
          </div>
          <div>
            <div ref={rightAnchorRef} className="tw:border tw:p-2">Right - Hover me</div>
            <Tooltip anchor={rightAnchorRef} placement="right">Right</Tooltip>
          </div>
        </div>
      </div>

      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Rich tooltip</h2>
        <div ref={richAnchorRef} className="tw:border tw:p-2">Hover me</div>
        <Tooltip anchor={richAnchorRef}>
          <span className="tw:text-danger">Danger!</span>
          <br />
          Do not do <b>this</b>
        </Tooltip>
      </div>
    </div>
  );
};
