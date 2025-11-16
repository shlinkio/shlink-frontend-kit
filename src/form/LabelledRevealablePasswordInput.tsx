import type { FC } from 'react';
import { useId } from 'react';
import type { RequiredReactNode } from '../types';
import type { FormControlWithFeedbackProps } from './FormControlWithFeedback';
import { FormControlWithFeedback } from './FormControlWithFeedback';
import { Label } from './Label';
import type { RevealablePasswordInputProps } from './RevealablePasswordInput';
import { RevealablePasswordInput } from './RevealablePasswordInput';

export type LabelledRevealablePasswordInputProps =
  Omit<RevealablePasswordInputProps, 'className' | 'id' | 'feedback'> & FormControlWithFeedbackProps & {
    label: RequiredReactNode;
    inputClassName?: string;

    /** Alternative to `required`. Causes the input to be required, without displaying an asterisk */
    hiddenRequired?: boolean;
  };

export const LabelledRevealablePasswordInput: FC<LabelledRevealablePasswordInputProps> = (
  { label, inputClassName, required, hiddenRequired, error, helpText, 'data-testid': testId, ...rest },
) => {
  const id = useId();
  return (
    <FormControlWithFeedback error={error} helpText={helpText} data-testid={testId}>
      <Label htmlFor={id} required={required}>{label}</Label>
      <RevealablePasswordInput
        id={id}
        className={inputClassName}
        required={required || hiddenRequired}
        feedback={error ? 'error' : undefined}
        {...rest}
      />
    </FormControlWithFeedback>
  );
};
