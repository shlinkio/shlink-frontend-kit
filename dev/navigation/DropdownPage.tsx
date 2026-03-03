import type { FC } from 'react';
import { useState } from 'react';
import type { Order } from '../../src';
import { OrderingDropdown } from '../../src';

const items = {
  foo: 'Foo',
  bar: 'Bar',
  baz: 'Baz',
};

export const DropdownPage: FC = () => {
  const [order, onChange] = useState<Order<keyof typeof items>>({});
  const [orderLink, onChangeLink] = useState<Order<keyof typeof items>>({});

  return (
    <div className="flex flex-col gap-y-2">
      <h2>OrderingDropdown</h2>
      <div className="flex gap-3 flex-wrap items-center">
        <OrderingDropdown items={items} order={order} onChange={onChange} />
        <OrderingDropdown items={items} order={orderLink} onChange={onChangeLink} buttonVariant="link" />
      </div>
    </div>
  );
};
