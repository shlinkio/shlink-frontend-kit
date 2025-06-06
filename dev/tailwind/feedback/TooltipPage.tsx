import type { FC } from 'react';
import { Button, Tooltip, useTooltip } from '../../../src/tailwind';

export const TooltipPage: FC = () => {
  const main = useTooltip();
  const keepOpen = useTooltip();
  const bottom = useTooltip({ placement: 'bottom' });
  const top = useTooltip({ placement: 'top' });
  const left = useTooltip({ placement: 'left' });
  const right = useTooltip({ placement: 'right' });
  const rich = useTooltip();
  const content = useTooltip();

  return (
    <div className="tw:flex tw:flex-col tw:gap-y-4">
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Tooltip</h2>
        <div {...main.anchor} className="tw:border tw:p-2">Hover me</div>
        <Tooltip {...main.tooltip}>Hello!!</Tooltip>
      </div>

      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Tooltip that can be hovered</h2>
        <div {...keepOpen.anchor} className="tw:border tw:p-2">
          Hover me
          <Tooltip {...keepOpen.tooltip}>
            Hover me too
            <br />
            <Button inline size="sm">And click me</Button>
          </Tooltip>
        </div>
      </div>

      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Placements</h2>
        <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-2 tw:xl:grid-cols-4 tw:gap-2">
          <div>
            <div {...bottom.anchor} className="tw:border tw:p-2">Bottom - Hover me</div>
            <Tooltip {...bottom.tooltip}>Bottom</Tooltip>
          </div>
          <div>
            <div {...top.anchor} className="tw:border tw:p-2">Top - Hover me</div>
            <Tooltip {...top.tooltip}>Top</Tooltip>
          </div>
          <div>
            <div {...left.anchor} className="tw:border tw:p-2">Left - Hover me</div>
            <Tooltip {...left.tooltip}>Left</Tooltip>
          </div>
          <div>
            <div {...right.anchor} className="tw:border tw:p-2">Right - Hover me</div>
            <Tooltip {...right.tooltip}>Right</Tooltip>
          </div>
        </div>
      </div>

      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Rich tooltip</h2>
        <div {...rich.anchor} className="tw:border tw:p-2">Hover me</div>
        <Tooltip {...rich.tooltip}>
          <span className="tw:text-danger">Danger!</span>
          <br />
          Do not do <b>this</b>
        </Tooltip>
      </div>

      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>A lot of content</h2>
        <div {...content.anchor} className="tw:border tw:p-2">Hover me</div>
        <Tooltip {...content.tooltip}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc cursus urna et luctus sagittis. Vivamus nibh
          justo, fringilla ut luctus et, facilisis nec magna. In facilisis lacus sit amet sem mattis consequat. Aenean
          elementum erat et diam blandit, in efficitur mi pellentesque. Aenean purus quam, venenatis eget orci sit
          amet,
          lacinia blandit magna. Curabitur ut eros quis ipsum faucibus bibendum. Sed nibh sem, malesuada nec massa
          vel,
          posuere hendrerit justo. Fusce non egestas mauris. Nulla id sapien dapibus, faucibus nunc sed, condimentum
          leo.
        </Tooltip>
      </div>
    </div>
  );
};
