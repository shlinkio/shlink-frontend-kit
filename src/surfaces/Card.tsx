import { clsx } from 'clsx';
import type { HTMLProps } from 'react';
import { forwardRef } from 'react';

export type CardProps = Omit<HTMLProps<HTMLDivElement>, 'ref'>;

const Header = forwardRef<HTMLDivElement, CardProps>(({ className, ...rest }, ref) => (
  <div
    className={clsx(
      'px-4 py-3 rounded-t-md',
      'bg-lm-primary dark:bg-dm-primary border-b border-lm-border dark:border-dm-border',
      className,
    )}
    {...rest}
    ref={ref}
  />
));

const Body = forwardRef<HTMLDivElement, CardProps>(({ className, ...rest }, ref) => (
  <div
    className={clsx(
      'p-4 bg-lm-primary dark:bg-dm-primary first:rounded-t-md',
      'first:rounded-t-md last:rounded-b-md',
      className,
    )}
    {...rest}
    ref={ref}
  />
));

const Footer = forwardRef<HTMLDivElement, CardProps>(({ className, ...rest }, ref) => (
  <div
    className={clsx(
      'px-4 py-3 rounded-b-md',
      'bg-lm-primary dark:bg-dm-primary border-t border-lm-border dark:border-dm-border',
      className,
    )}
    {...rest}
    ref={ref}
  />
));

const BaseCard = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    className={clsx(
      'group/card rounded-md shadow-md',
      'border border-lm-border dark:border-dm-border bg-lm-primary dark:bg-dm-primary',
      className)}
    {...props}
    ref={ref}
  />
));

export const Card = Object.assign(BaseCard, { Body, Header, Footer });
