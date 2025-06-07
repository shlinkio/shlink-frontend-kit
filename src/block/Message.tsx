import { faCircleNotch as preloader } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import type { FC, PropsWithChildren } from 'react';
import { Card } from 'reactstrap';

type MessageType = 'default' | 'error';

export type MessageProps = PropsWithChildren<{
  className?: string;
  loading?: boolean;
  fullWidth?: boolean;
  type?: MessageType;
}>;

/** @deprecated */
export const Message: FC<MessageProps> = (
  { className, children, loading = false, type = 'default', fullWidth = false },
) => (
  <Card
    body
    className={clsx(className, {
      'w-100': fullWidth,
      'w-75 mx-auto': !fullWidth,
      'border-danger': type === 'error',
    })}
  >
    <h3
      className={clsx('text-center mb-0', {
        'text-muted': type === 'default',
        'text-danger': type === 'error',
      })}
    >
      {loading && <FontAwesomeIcon icon={preloader} spin />}
      {loading && <span className="ms-2">{children ?? 'Loading...'}</span>}
      {!loading && children}
    </h3>
  </Card>
);
