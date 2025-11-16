import type { FC } from 'react';
import { useId } from 'react';
import type { RequiredReactNode } from '../types';
import type { FormControlWithFeedbackProps } from './FormControlWithFeedback';
import { FormControlWithFeedback } from './FormControlWithFeedback';
import { Label } from './Label';
import type { SelectProps } from './Select';
import { Select } from './Select';

export type LabelledSelectProps = Omit<SelectProps, 'className' | 'id'> & FormControlWithFeedbackProps & {
  label: RequiredReactNode;
  selectClassName?: string;
  /** Alternative to `required`. Causes the input to be required, without displaying an asterisk */
  hiddenRequired?: boolean;
};

export const LabelledSelect: FC<LabelledSelectProps> = (
  { selectClassName, label, error, helpText, required, hiddenRequired, 'data-testid': testId, ...rest },
) => {
  const id = useId();
  return (
    <FormControlWithFeedback error={error} helpText={helpText} data-testid={testId}>
      <Label htmlFor={id} required={required}>{label}</Label>
      <Select
        id={id}
        className={selectClassName}
        required={required || hiddenRequired}
        feedback={error ? 'error' : undefined}
        {...rest}
      />
    </FormControlWithFeedback>
  );
};
