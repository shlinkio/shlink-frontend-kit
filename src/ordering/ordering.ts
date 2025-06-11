import { useCallback, useState } from 'react';

export type OrderDir = 'ASC' | 'DESC' | undefined;

export type Order<Fields> = {
  field?: Fields;
  dir?: OrderDir;
};

export type OrderDirChange<Fields extends string = string> = {
  currentField?: Fields,
  newField?: Fields,
  currentOrderDir?: OrderDir,
};

export function determineOrderDir<Fields extends string = string>(orderDirChange: OrderDirChange<Fields>): OrderDir;
/** @deprecated */
export function determineOrderDir<Fields extends string = string>(
  currentField?: Fields,
  newField?: Fields,
  currentOrderDir?: OrderDir,
): OrderDir;
/**
 * Generate an Order dir for the new order field, based on previous order field and direction.
 */
export function determineOrderDir<Fields extends string = string>(
  firstArg?: Fields | OrderDirChange<Fields>,
  newField?: Fields,
  currentOrderDir?: OrderDir,
): OrderDir {
  if (!firstArg || typeof firstArg === 'string') {
    return determineOrderDir({ currentField: firstArg, newField, currentOrderDir });
  }

  const orderDirChange = firstArg;
  if (orderDirChange.currentField !== orderDirChange.newField) {
    return 'ASC';
  }

  const newOrderMap: Record<'ASC' | 'DESC', OrderDir> = {
    ASC: 'DESC',
    DESC: undefined,
  };

  return orderDirChange.currentOrderDir ? newOrderMap[orderDirChange.currentOrderDir] : 'ASC';
}

export function determineOrder<Fields extends string = string>(orderDirChange: OrderDirChange<Fields>): Order<Fields>;
/** @deprecated */
export function determineOrder<Fields extends string = string>(
  currentField?: Fields,
  newField?: Fields,
  currentOrderDir?: OrderDir,
): Order<Fields>;
/**
 * Generate an Order object for the new order field, based on previous order field and direction.
 */
export function determineOrder<Fields extends string = string>(
  firstArg?: Fields | OrderDirChange<Fields>,
  newField?: Fields,
  currentOrderDir?: OrderDir,
): Order<Fields> {
  if (!firstArg || typeof firstArg === 'string') {
    return determineOrder({ currentField: firstArg, newField, currentOrderDir });
  }

  const orderDirChange = firstArg;
  const newOrderDir = determineOrderDir(orderDirChange);
  return {
    field: newOrderDir ? orderDirChange.newField : undefined,
    dir: newOrderDir,
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

export type OrderSetter<T> = {
  (order: Order<T>): void;
  /** @deprecated Pass the order object as the only argument */
  (orderField?: T, orderDir?: OrderDir): void;
};

export const useOrder = <T>(initialOrder: Order<T>): [Order<T>, OrderSetter<T>] => {
  const [order, setOrder] = useState<Order<T>>(initialOrder);
  const onChange = useCallback(
    (fieldOrOrder: T | undefined | Order<T>, dir?: OrderDir) => setOrder(
      !!fieldOrOrder && typeof fieldOrOrder === 'object'
        ? fieldOrOrder
        : { field: fieldOrOrder, dir },
    ),
    [],
  );

  return [order, onChange];
};
