import { faCircleNotch as preloader } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import type { FC, PropsWithChildren } from 'react';
import { SimpleCard } from '../surfaces';

export type MessageProps = PropsWithChildren<{
  className?: string;
  loading?: boolean;
  variant?: 'default' | 'error';
}>;

/**
 * Component used to display a card with general information, about current page status, loading, etc.
 */
export const Message: FC<MessageProps> = ({ className, children, loading = false, variant = 'default' }) => {
  return (
    <SimpleCard className={clsx({ 'tw:[&]:border-danger': variant === 'error' }, className)}>
      <h3 className={clsx('tw:text-center', {
        'tw:text-gray-500 tw:dark:text-gray-400': variant === 'default',
        'tw:text-danger': variant === 'error',
      })}>
        {loading && (
          <>
            <FontAwesomeIcon icon={preloader} spin />
            <span className="tw:ml-2">{children ?? 'Loading...'}</span>
          </>
        )}
        {!loading && children}
      </h3>
    </SimpleCard>
  );
};
