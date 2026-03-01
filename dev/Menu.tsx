import type { FC } from 'react';
import { useLocation } from 'react-router';
import { Dropdown } from '../src';

const routes: Record<string, string> = {
  '/surfaces/cards': 'Cards',
  '/navigation/paginator': 'Paginator',
  '/navigation/nav-bar': 'NavBar',
  '/navigation/nav-pills': 'NavPills',
  '/navigation/menu': 'Menu',
  '/navigation/dropdown': 'Dropdown',
  '/utils': 'Utils',
} as const;
const routeEntries = Object.entries(routes);

export const Menu: FC = () => {
  const { pathname } = useLocation();
  const key = Object.keys(routes).find((path) => pathname.startsWith(path));
  const text = key && routes[key] || 'Home';
  console.log({ pathname });

  return (
    <Dropdown buttonContent={text} containerClassName="w-full" buttonClassName="w-full">
      <Dropdown.Item to="/" selected={pathname === '/'}>Home</Dropdown.Item>
      <Dropdown.Separator />
      {routeEntries.map(([path, name]) => (
        <Dropdown.Item to={path} key={path} selected={pathname.startsWith(path)}>{name}</Dropdown.Item>
      ))}
    </Dropdown>
  );
};
