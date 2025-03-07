import { useCallback, useState } from 'react';

export type OrderDir = 'ASC' | 'DESC' | undefined;

export type Order<Fields> = {
  field?: Fields;
  dir?: OrderDir;
};

export type OrderDirChange<Fields extends string = string> = {
  currentField: Fields,
  newField?: Fields,
  currentOrderDir?: OrderDir,
};

export function determineOrderDir<Fields extends string = string>(orderDirChange: OrderDirChange<Fields>): OrderDir;
export function determineOrderDir<Fields extends string = string>(
  currentField: Fields,
  newField?: Fields,
  currentOrderDir?: OrderDir,
): OrderDir;
/**
 * Generate an Order dir for the new order field, based on previous order field and direction.
 */
export function determineOrderDir<Fields extends string = string>(
  firstArg: Fields | OrderDirChange<Fields>,
  newField?: Fields,
  currentOrderDir?: OrderDir,
): OrderDir {
  if (typeof firstArg === 'object') {
    return determineOrderDir(firstArg.currentField, firstArg.newField, firstArg.currentOrderDir);
  }

  if (firstArg !== newField) {
    return 'ASC';
  }

  const newOrderMap: Record<'ASC' | 'DESC', OrderDir> = {
    ASC: 'DESC',
    DESC: undefined,
  };

  return currentOrderDir ? newOrderMap[currentOrderDir] : 'ASC';
}

export function determineOrder<Fields extends string = string>(orderDirChange: OrderDirChange<Fields>): Order<Fields>;
export function determineOrder<Fields extends string = string>(
  currentField: Fields,
  newField?: Fields,
  currentOrderDir?: OrderDir,
): Order<Fields>;
/**
 * Generate an Order object for the new order field, based on previous order field and direction.
 */
export function determineOrder<Fields extends string = string>(
  firstArg: Fields | OrderDirChange<Fields>,
  newField?: Fields,
  currentOrderDir?: OrderDir,
): Order<Fields> {
  if (typeof firstArg === 'object') {
    return determineOrder(firstArg.currentField, firstArg.newField, firstArg.currentOrderDir);
  }

  return {
    field: newField,
    dir: determineOrderDir(firstArg, newField, currentOrderDir),
  };
}

export const sortList = <List>(list: List[], { field, dir }: Order<keyof List>) => (
  !field || !dir ? list : list.sort((a, b) => {
    const greaterThan = dir === 'ASC' ? 1 : -1;
    const smallerThan = dir === 'ASC' ? -1 : 1;

    return a[field] > b[field] ? greaterThan : smallerThan;
  })
);

/**
 * Convert provided order object to string, with the pattern `${order.field}-${order.di}`.
 * @return - A `string` if the `dir` prop is set, `undefined` otherwise.
 */
export const orderToString = <T>(order: Order<T>): string | undefined => (
  order.dir ? `${order.field}-${order.dir}` : undefined
);

export const stringToOrder = <T>(order: string): Order<T> => {
  const [field, dir] = order.split('-') as [T | undefined, OrderDir | undefined];
  return { field, dir };
};

export const useOrder = <T>(initialOrder: Order<T>): [Order<T>, (orderField?: T, orderDir?: OrderDir) => void] => {
  const [order, setOrder] = useState<Order<T>>(initialOrder);
  const onChange = useCallback((field?: T, dir?: OrderDir) => setOrder({ field, dir }), []);

  return [order, onChange];
};
