import { forwardRef , useId } from 'react';
import type { RequiredReactNode } from '../types';
import { Label } from './Label';
import type { RevealablePasswordInputProps } from './RevealablePasswordInput';
import { RevealablePasswordInput } from './RevealablePasswordInput';

export type LabelledRevealablePasswordInputProps =
  Omit<RevealablePasswordInputProps, 'className' | 'id' | 'feedback'> & {
    label: RequiredReactNode;
    inputClassName?: string;
    error?: string;

    /** Alternative to `required`. Causes the input to be required, without displaying an asterisk */
    hiddenRequired?: boolean;
  };

export const LabelledRevealablePasswordInput = forwardRef<HTMLInputElement, LabelledRevealablePasswordInputProps>((
  { label, inputClassName, required, hiddenRequired, error, ...rest },
  ref,
) => {
  const id = useId();
  return (
    <div className="tw:flex tw:flex-col tw:gap-1">
      <Label htmlFor={id} required={required}>{label}</Label>
      <RevealablePasswordInput
        ref={ref}
        id={id}
        className={inputClassName}
        required={required || hiddenRequired}
        feedback={error ? 'error' : undefined}
        {...rest}
      />
      {error && <span className="tw:text-danger">{error}</span>}
    </div>
  );
});
