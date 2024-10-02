import { clsx } from 'clsx';
import type { ChangeEvent, FC, PropsWithChildren } from 'react';
import { useId } from 'react';

export type BooleanControlProps = PropsWithChildren<{
  checked?: boolean;
  onChange?: (checked: boolean, e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inline?: boolean;
}>;

type BooleanControlWithTypeProps = BooleanControlProps & {
  type: 'switch' | 'checkbox';
};

export const BooleanControl: FC<BooleanControlWithTypeProps> = (
  { checked = false, onChange, className, children, type, inline = false },
) => {
  const id = useId();
  const onChecked = (e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.checked, e);
  const typeClasses = {
    'form-switch': type === 'switch',
    'form-checkbox': type === 'checkbox',
  };
  const style = inline ? { display: 'inline-block' } : {};

  return (
    <span className={clsx('form-check', typeClasses, className)} style={style}>
      <input type="checkbox" className="form-check-input" id={id} checked={checked} onChange={onChecked} />
      <label className="form-check-label" htmlFor={id}>{children}</label>
    </span>
  );
};
