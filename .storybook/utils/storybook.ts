import type { InputType } from 'storybook/internal/csf';

export const nonEditableReactNode: InputType = {
  control: false,
  table: {
    type: { summary: 'ReactNode' },
  },
};
