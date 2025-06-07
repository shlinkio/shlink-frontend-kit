import clsx from 'clsx';
import type { HTMLProps, PropsWithChildren } from 'react';
import { forwardRef } from 'react';
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
} & (RegularButtonProps | LinkButtonProps)>;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(({
  className,
  disabled,
  variant = 'primary',
  size = 'md',
  inline = false,
  solid = false,
  type: providedType = 'button',
  ...rest
}, ref) => {
  const isLink = 'to' in rest;
  const Tag = isLink ? Link : 'button';
  const type = isLink ? undefined : providedType;

  return (
    <Tag
      // @ts-expect-error The dual nature of this component makes properly typing the ref a bit complex
      ref={ref}
      className={clsx(
        {
          'tw:inline-flex': inline,
          'tw:flex': !inline,
        },
        'tw:gap-2 tw:items-center tw:justify-center',
        'tw:border tw:rounded-md tw:no-underline',
        'tw:transition-colors',
        {
          'tw:focus-ring': variant === 'primary',
          'tw:focus-ring-secondary': variant === 'secondary',
          'tw:focus-ring-danger': variant === 'danger',
        },
        {
          'tw:px-1.5 tw:py-1 tw:text-sm': size === 'sm',
          'tw:px-3 tw:py-1.5': size === 'md',
          'tw:px-4 tw:py-2 tw:text-lg': size === 'lg',
        },
        {
          'tw:border-lm-brand tw:dark:border-dm-brand': variant === 'primary',
          'tw:text-lm-brand tw:dark:text-dm-brand': variant === 'primary' && !solid,
          'tw:border-zinc-500': variant === 'secondary',
          'tw:text-zinc-500': variant === 'secondary' && !solid,
          'tw:border-danger': variant === 'danger',
          'tw:text-danger': variant === 'danger' && !solid,
        },
        solid && {
          'tw:text-white': true,
          'tw:bg-lm-brand tw:dark:bg-dm-brand': variant === 'primary',
          'tw:highlight:bg-lm-brand-dark tw:dark:highlight:bg-dm-brand-dark': variant === 'primary',
          'tw:highlight:border-lm-brand-dark tw:dark:highlight:border-dm-brand-dark': variant === 'primary',

          'tw:bg-zinc-500': variant === 'secondary',
          'tw:highlight:bg-zinc-600 tw:highlight:border-zinc-600': variant === 'secondary',

          'tw:bg-danger': variant === 'danger',
          'tw:highlight:bg-danger-dark tw:highlight:border-danger-dark': variant === 'danger',
        },
        !disabled && {
          'tw:highlight:text-white': !solid,
          'tw:highlight:bg-lm-brand tw:dark:highlight:bg-dm-brand': variant === 'primary',
          'tw:highlight:bg-zinc-500': variant === 'secondary',
          'tw:highlight:bg-danger': variant === 'danger',
        },
        {
          'tw:pointer-events-none tw:opacity-65': disabled,
        },
        className,
      )}
      disabled={!isLink ? disabled : undefined}
      aria-disabled={isLink ? disabled : undefined}
      type={type}
      {...rest}
    />
  );
});
