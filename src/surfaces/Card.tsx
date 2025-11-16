import { clsx } from 'clsx';
import type { FC, HTMLProps } from 'react';

export type CardProps = HTMLProps<HTMLDivElement>;

const Header: FC<CardProps> = ({ className, ...rest }) => (
  <div
    className={clsx(
      'px-4 py-3 rounded-t-md',
      'bg-lm-primary dark:bg-dm-primary border-b border-lm-border dark:border-dm-border',
      className,
    )}
    {...rest}
  />
);

const Body: FC<CardProps> = ({ className, ...rest }) => (
  <div
    className={clsx(
      'p-4 bg-lm-primary dark:bg-dm-primary first:rounded-t-md',
      'first:rounded-t-md last:rounded-b-md',
      className,
    )}
    {...rest}
  />
);

const Footer: FC<CardProps> = ({ className, ...rest }) => (
  <div
    className={clsx(
      'px-4 py-3 rounded-b-md',
      'bg-lm-primary dark:bg-dm-primary border-t border-lm-border dark:border-dm-border',
      className,
    )}
    {...rest}
  />
);

const BaseCard: FC<CardProps> = ({ className, ...props }) => (
  <div
    className={clsx(
      'group/card rounded-md shadow-md',
      'border border-lm-border dark:border-dm-border bg-lm-primary dark:bg-dm-primary',
      className)}
    {...props}
  />
);

export const Card = Object.assign(BaseCard, { Body, Header, Footer });
