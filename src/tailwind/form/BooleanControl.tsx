import { clsx } from 'clsx';
import type { ChangeEvent, FC, HTMLProps } from 'react';
import { useCallback } from 'react';

export type BooleanControlProps = Omit<HTMLProps<HTMLInputElement>, 'type' | 'onChange' | 'value' | 'defaultValue'> & {
  onChange?: (checked: boolean, e: ChangeEvent<HTMLInputElement>) => void;
};

export const BooleanControl: FC<BooleanControlProps> = ({ className, onChange, ...rest }) => {
  const onChecked = useCallback((e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.checked, e), [onChange]);

  return (
    <input
      type="checkbox"
      className={clsx(
        'tw:appearance-none tw:focus-ring',
        'tw:border-1 tw:border-lm-input-border tw:dark:border-dm-input-border',
        'tw:bg-lm-primary tw:dark:bg-dm-primary tw:checked:bg-brand tw:bg-no-repeat',
        // Use different background color when rendered inside a card
        'tw:group-[&]/card:bg-lm-input tw:group-[&]/card:dark:bg-dm-input',
        className,
      )}
      onChange={onChecked}
      {...rest}
    />
  );
};
