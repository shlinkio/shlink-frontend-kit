import type { FC } from 'react';
import { useState } from 'react';
import type { Order } from '../../src';
import { OrderingDropdown, RowDropdown } from '../../src';

const items = {
  foo: 'Foo',
  bar: 'Bar',
  baz: 'Baz',
};

export const DropdownPage: FC = () => {
  const [order, onChange] = useState<Order<keyof typeof items>>({});
  const [orderLink, onChangeLink] = useState<Order<keyof typeof items>>({});

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-2">
        <h2>RowDropdown</h2>
        <div className="flex gap-3 flex-wrap items-center">
          <RowDropdown buttonSize="sm">
            <RowDropdown.Item>Foo</RowDropdown.Item>
            <RowDropdown.Item>Bar</RowDropdown.Item>
            <RowDropdown.Item>Baz</RowDropdown.Item>
          </RowDropdown>
          <RowDropdown>
            <RowDropdown.Item>Foo</RowDropdown.Item>
            <RowDropdown.Item>Bar</RowDropdown.Item>
            <RowDropdown.Item>Baz</RowDropdown.Item>
          </RowDropdown>
          <RowDropdown buttonSize="lg">
            <RowDropdown.Item>Foo</RowDropdown.Item>
            <RowDropdown.Item>Bar</RowDropdown.Item>
            <RowDropdown.Item>Baz</RowDropdown.Item>
          </RowDropdown>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <h2>OrderingDropdown</h2>
        <div className="flex gap-3 flex-wrap items-center">
          <OrderingDropdown items={items} order={order} onChange={onChange} />
          <OrderingDropdown items={items} order={orderLink} onChange={onChangeLink} buttonVariant="link" />
        </div>
      </div>
    </div>
  );
};
