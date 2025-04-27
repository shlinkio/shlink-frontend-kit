import type { FC, PropsWithChildren, ReactNode } from 'react';

type LabeledFormGroupProps = PropsWithChildren<{
  label: ReactNode;
  noMargin?: boolean;
  className?: string;
  labelClassName?: string;
  id?: string;
}>;

/** @deprecated */
export const LabeledFormGroup: FC<LabeledFormGroupProps> = (
  { children, label, className = '', labelClassName = '', noMargin = false, id },
) => (
  <div className={`${className} ${noMargin ? '' : 'mb-3'}`}>
    <label className={`form-label ${labelClassName}`} htmlFor={id}>{label}</label>
    {children}
  </div>
);
