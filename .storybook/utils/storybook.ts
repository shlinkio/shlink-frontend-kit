import type { InputType } from 'storybook/internal/csf';

export const nonEditableReactNode: InputType = {
  control: false,
  table: {
    type: { summary: 'ReactNode' },
  },
};

export const size: InputType = { options: ['sm', 'md', 'lg'] };

export const boolean: InputType = { type: 'boolean' };
