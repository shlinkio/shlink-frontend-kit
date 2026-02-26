import type { Meta } from '@storybook/react-vite';
import type { HTMLProps, ReactNode } from 'react';
import { Tooltip, useTooltip } from './Tooltip';

export default {
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

const AnchorComponent = (props: Omit<HTMLProps<HTMLButtonElement>, 'children'>): ReactNode => (
  // @ts-expect-error Not sure what's complaining about here
  <button {...props} className="my-3 block mx-auto border rounded px-2 py-1">Hover me</button>
);

export const AutoTooltip = () => {
  const { tooltip, anchor } = useTooltip();

  return <>
    <AnchorComponent {...anchor} />
    <Tooltip {...tooltip}>This is a tooltip</Tooltip>
  </>;
};

export const BottomTooltip = () => {
  const { tooltip, anchor } = useTooltip({ placement: 'bottom' });

  return <>
    <AnchorComponent {...anchor} />
    <Tooltip {...tooltip}>This is a tooltip</Tooltip>
  </>;
};

export const TopTooltip = () => {
  const { tooltip, anchor } = useTooltip({ placement: 'top' });

  return <>
    <AnchorComponent {...anchor} />
    <Tooltip {...tooltip}>This is a tooltip</Tooltip>
  </>;
};

export const LeftTooltip = () => {
  const { tooltip, anchor } = useTooltip({ placement: 'left' });

  return <>
    <AnchorComponent {...anchor} />
    <Tooltip {...tooltip}>This is a tooltip</Tooltip>
  </>;
};

export const RightTooltip = () => {
  const { tooltip, anchor } = useTooltip({ placement: 'right' });

  return <>
    <AnchorComponent {...anchor} />
    <Tooltip {...tooltip}>This is a tooltip</Tooltip>
  </>;
};
