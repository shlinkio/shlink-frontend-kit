import { clsx } from 'clsx';
import type { FC, HTMLProps } from 'react';

export type LabelProps = HTMLProps<HTMLLabelElement> & {
  required?: boolean;
};

export const Label: FC<LabelProps> = ({ required, children, className, ...rest }) => (
  <label className={clsx('tw:cursor-pointer', className)} {...rest}>
    {children}
    {required && <span className="tw:text-danger tw:ml-1" data-testid="required-indicator">*</span>}
  </label>
);
