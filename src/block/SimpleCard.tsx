import type { ReactNode } from 'react';
import type { CardProps } from 'reactstrap';
import { Card, CardBody, CardHeader } from 'reactstrap';

export type SimpleCardProps = Omit<CardProps, 'title'> & {
  title?: ReactNode;
  bodyClassName?: string;
};

/** @deprecated */
export const SimpleCard = ({ title, children, bodyClassName, ...rest }: SimpleCardProps) => (
  <Card {...rest}>
    {title && <CardHeader role="heading" aria-level={4}>{title}</CardHeader>}
    <CardBody className={bodyClassName}>{children}</CardBody>
  </Card>
);
