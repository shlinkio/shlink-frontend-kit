import type { FC, PropsWithChildren } from 'react';
import { Children, isValidElement } from 'react';
import { NavLink as RouterNavLink } from 'react-router';
import { Card, Nav, NavItem, NavLink } from 'reactstrap';
import './NavPills.scss';

type NavPillsProps = PropsWithChildren<{
  fill?: boolean;
  className?: string;
}>;

type NavPillItemProps = PropsWithChildren<{
  to: string;
  replace?: boolean;
}>;

/** @deprecated */
export const NavPillItem: FC<NavPillItemProps> = ({ children, ...rest }) => (
  <NavItem>
    <NavLink className="nav-pills__nav-link" tag={RouterNavLink} {...rest}>
      {children}
    </NavLink>
  </NavItem>
);

/** @deprecated */
export const NavPills: FC<NavPillsProps> = ({ children, fill = false, className = '' }) => (
  <Card className={`nav-pills__nav p-0 overflow-hidden ${className}`} body>
    <Nav pills fill={fill}>
      {Children.map(children, (child) => {
        if (!isValidElement(child) || child.type !== NavPillItem) {
          throw new Error('Only NavPillItem children are allowed inside NavPills.');
        }

        return child;
      })}
    </Nav>
  </Card>
);
