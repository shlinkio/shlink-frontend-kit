import clsx from 'clsx';
import type { HTMLProps } from 'react';
import { forwardRef } from 'react';

export type CardProps = Omit<HTMLProps<HTMLDivElement>, 'ref'>;

const Header = forwardRef<HTMLDivElement, CardProps>(({ className, ...rest }, ref) => (
  <div
    className={clsx(
      'tw:px-4 tw:py-3 tw:rounded-t-md',
      'tw:bg-lm-primary tw:dark:bg-dm-primary tw:border-b tw:border-lm-border tw:dark:border-dm-border',
      className,
    )}
    {...rest}
    ref={ref}
  />
));

const Body = forwardRef<HTMLDivElement, CardProps>(({ className, ...rest }, ref) => (
  <div
    className={clsx(
      'tw:p-4 tw:bg-lm-primary tw:dark:bg-dm-primary tw:first:rounded-t-md',
      'tw:first:rounded-t-md tw:last:rounded-b-md',
      className,
    )}
    {...rest}
    ref={ref}
  />
));

const Footer = forwardRef<HTMLDivElement, CardProps>(({ className, ...rest }, ref) => (
  <div
    className={clsx(
      'tw:px-4 tw:py-3 tw:rounded-b-md',
      'tw:bg-lm-primary tw:dark:bg-dm-primary tw:border-t tw:border-lm-border tw:dark:border-dm-border',
      className,
    )}
    {...rest}
    ref={ref}
  />
));

const BaseCard = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    className={clsx(
      'tw:group/card tw:rounded-md tw:shadow-md',
      'tw:border tw:border-lm-border tw:dark:border-dm-border tw:bg-lm-primary tw:dark:bg-dm-primary',
      className)}
    {...props}
    ref={ref}
  />
));

export const Card = Object.assign(BaseCard, { Body, Header, Footer });
