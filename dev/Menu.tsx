import type { FC } from 'react';
import { useLocation } from 'react-router';
import { Dropdown } from '../src';

const routes: Record<string, string> = {
  '/form/inputs': 'Inputs',
  '/form/search-input': 'SearchInput',
  '/form/search-combobox': 'SearchCombobox',
  '/form/buttons': 'Buttons',
  '/surfaces/cards': 'Cards',
  '/content/tables': 'Tables',
  '/content/details': 'Details',
  '/navigation/paginator': 'Paginator',
  '/navigation/nav-bar': 'NavBar',
  '/navigation/nav-pills': 'NavPills',
  '/navigation/menu': 'Menu',
  '/navigation/dropdown': 'Dropdown',
  '/feedback/dialogs': 'Dialogs',
  '/feedback/tooltip': 'Tooltip',
  '/feedback/result': 'Result',
  '/feedback/message': 'Message',
  '/utils': 'Utils',
} as const;
const routeEntries = Object.entries(routes);

export const Menu: FC = () => {
  const { pathname } = useLocation();
  const text = routes[pathname] ?? 'Home';

  return (
    <Dropdown buttonContent={text} containerClassName="w-full" buttonClassName="w-full">
      <Dropdown.Item to="/" selected={pathname === '/'}>Home</Dropdown.Item>
      <Dropdown.Separator />
      {routeEntries.map(([path, name]) => (
        <Dropdown.Item to={path} key={path} selected={pathname === path}>{name}</Dropdown.Item>
      ))}
    </Dropdown>
  );
};
