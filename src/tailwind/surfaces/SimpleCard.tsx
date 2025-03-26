import type { FC, ReactNode } from 'react';
import type { Size } from '../types';
import type { CardProps } from './Card';
import { Card } from './Card';

type TitleProps = {
  title: ReactNode;
  titleSize?: Size;
};

type NoTitleProps = {
  title?: never;
  titleSize?: never;
};

export type SimpleCardProps = Omit<CardProps, 'title' | 'size'> & {
  bodyClassName?: string;
} & (TitleProps | NoTitleProps);

export const SimpleCard: FC<SimpleCardProps> = ({ bodyClassName, children, ...rest }) => {
  const { title, titleSize = 'md', ...cardProps } = 'title' in rest ? rest : {
    ...rest,
    title: undefined,
    titleSize: undefined,
  };

  return (
    <Card {...cardProps}>
      {title && (
        <Card.Header>
          {titleSize === 'lg' && <h4>{title}</h4>}
          {titleSize === 'md' && <h5>{title}</h5>}
          {titleSize === 'sm' && <h6>{title}</h6>}
        </Card.Header>
      )}
      <Card.Body className={bodyClassName}>
        {children}
      </Card.Body>
    </Card>
  );
};
