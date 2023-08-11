import type { FC } from 'react';
import { OrderingDropdown, useOrder } from '../../src';

const items = {
  foo: 'Foo',
  bar: 'Bar',
  baz: 'Baz',
};

export const OrderingDropdownPage: FC = () => {
  const [order, onChange] = useOrder<keyof typeof items>({});
  const [orderLink, onChangeLink] = useOrder<keyof typeof items>({});

  return (
    <>
      <div className="mb-3">
        <OrderingDropdown items={items} order={order} onChange={onChange} />
        <div>Current order is: {(order.field && items[order.field]) || '??'} - {order.dir ?? '??'}</div>
      </div>
      <div>
        <OrderingDropdown items={items} order={orderLink} onChange={onChangeLink} isButton={false} />
        <div>Current order is: {(orderLink.field && items[orderLink.field]) || '??'} - {orderLink.dir ?? '??'}</div>
      </div>
    </>
  );
};
