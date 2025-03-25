import type { FC, ReactNode } from 'react';
import type { Size } from '../types';
import type { CardProps } from './Card';
import { Card } from './Card';

type TitleProps = {
  title: ReactNode;
  size?: Size;
};

type NoTitleProps = {
  title?: never;
  size?: never;
};

export type SimpleCardProps = Omit<CardProps, 'title' | 'size'> & {
  bodyClassName?: string;
} & (TitleProps | NoTitleProps);

export const SimpleCard: FC<SimpleCardProps> = ({ bodyClassName, children, ...rest }) => {
  const { title, size = 'md', ...cardProps } = 'title' in rest ? rest : { ...rest, title: undefined, size: undefined };
  return (
    <Card {...cardProps}>
      {title && (
        <Card.Header>
          {size === 'lg' && <h4>{title}</h4>}
          {size === 'md' && <h5>{title}</h5>}
          {size === 'sm' && <h6>{title}</h6>}
        </Card.Header>
      )}
      <Card.Body className={bodyClassName}>
        {children}
      </Card.Body>
    </Card>
  );
};
