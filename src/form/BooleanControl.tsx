import { clsx } from 'clsx';
import type { ChangeEvent, HTMLProps } from 'react';
import { forwardRef , useCallback } from 'react';

export type BooleanControlProps = Omit<HTMLProps<HTMLInputElement>, 'type' | 'onChange' | 'value' | 'defaultValue'> & {
  onChange?: (checked: boolean, e: ChangeEvent<HTMLInputElement>) => void;
};

export const BooleanControl = forwardRef<HTMLInputElement, BooleanControlProps>((
  { className, onChange, ...rest },
  ref,
) => {
  const onChecked = useCallback((e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.checked, e), [onChange]);

  return (
    <input
      ref={ref}
      type="checkbox"
      className={clsx(
        'appearance-none focus-ring cursor-[inherit]',
        'border-1 border-lm-input-border dark:border-dm-input-border',
        'bg-lm-primary dark:bg-dm-primary checked:bg-lm-brand dark:checked:bg-dm-brand bg-no-repeat',
        // Use different background color when rendered inside a card
        'group-[&]/card:bg-lm-input group-[&]/card:dark:bg-dm-input',
        className,
      )}
      onChange={onChecked}
      {...rest}
    />
  );
});
