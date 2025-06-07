import { clsx } from 'clsx';
import type { FC, PropsWithChildren } from 'react';
import { SimpleCard } from './SimpleCard';

export type ResultType = 'success' | 'error' | 'warning';

export type ResultProps = PropsWithChildren<{
  type: ResultType;
  className?: string;
  small?: boolean;
}>;

/** @deprecated */
export const Result: FC<ResultProps> = ({ children, type, className, small = false }) => (
  <SimpleCard
    role="document"
    className={clsx('text-center', {
      'w-75 mx-auto': !small,
      'w-100': small,
      'bg-main': type === 'success',
      'bg-danger': type === 'error',
      'bg-warning': type === 'warning',
      'text-white': type !== 'warning',
    }, className)}
    bodyClassName={clsx({ 'p-2': small })}
  >
    {children}
  </SimpleCard>
);
