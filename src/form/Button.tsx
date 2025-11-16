import { clsx } from 'clsx';
import type { FC, HTMLProps, PropsWithChildren, Ref } from 'react';
import type { LinkProps } from 'react-router';
import { Link } from 'react-router';
import type { Size } from '../types';

type RegularButtonProps = Omit<HTMLProps<HTMLButtonElement>, 'size' | 'type'>;
type LinkButtonProps = LinkProps;

export type ButtonProps = PropsWithChildren<{
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  type?: HTMLButtonElement['type'];
  size?: Size;
  inline?: boolean;
  solid?: boolean;
  ref?: Ref<HTMLButtonElement | HTMLAnchorElement>;
} & (RegularButtonProps | LinkButtonProps)>;

export const Button: FC<ButtonProps> = ({
  className,
  disabled,
  variant = 'primary',
  size = 'md',
  inline = false,
  solid = false,
  type: providedType = 'button',
  ref,
  ...rest
}) => {
  const isLink = 'to' in rest &&  typeof rest.to === 'string';
  const Tag = isLink ? Link : 'button';
  const type = isLink ? undefined : providedType;

  return (
    <Tag
      // @ts-expect-error The dual nature of this component makes properly typing the ref a bit complex
      ref={ref}
      className={clsx(
        {
          'inline-flex': inline,
          'flex': !inline,
        },
        'gap-2 items-center justify-center',
        'border rounded-md no-underline',
        'transition-colors',
        {
          'focus-ring': variant === 'primary',
          'focus-ring-secondary': variant === 'secondary',
          'focus-ring-danger': variant === 'danger',
        },
        {
          'px-1.5 py-1 text-sm': size === 'sm',
          'px-3 py-1.5': size === 'md',
          'px-4 py-2 text-lg': size === 'lg',
        },
        {
          'border-lm-brand dark:border-dm-brand': variant === 'primary',
          'text-lm-brand dark:text-dm-brand': variant === 'primary' && !solid,
          'border-zinc-500': variant === 'secondary',
          'text-zinc-500': variant === 'secondary' && !solid,
          'border-danger': variant === 'danger',
          'text-danger': variant === 'danger' && !solid,
        },
        solid && {
          'text-white': true,
          'bg-lm-brand dark:bg-dm-brand': variant === 'primary',
          'highlight:bg-lm-brand-dark dark:highlight:bg-dm-brand-dark': variant === 'primary',
          'highlight:border-lm-brand-dark dark:highlight:border-dm-brand-dark': variant === 'primary',

          'bg-zinc-500': variant === 'secondary',
          'highlight:bg-zinc-600 highlight:border-zinc-600': variant === 'secondary',

          'bg-danger': variant === 'danger',
          'highlight:bg-danger-dark highlight:border-danger-dark': variant === 'danger',
        },
        !disabled && {
          'highlight:text-white': !solid,
          'highlight:bg-lm-brand dark:highlight:bg-dm-brand': variant === 'primary',
          'highlight:bg-zinc-500': variant === 'secondary',
          'highlight:bg-danger': variant === 'danger',
        },
        {
          'cursor-pointer': !disabled,
          'pointer-events-none opacity-65': disabled,
        },
        className,
      )}
      disabled={!isLink ? disabled : undefined}
      aria-disabled={isLink ? disabled : undefined}
      type={type}
      {...rest}
    />
  );
};
