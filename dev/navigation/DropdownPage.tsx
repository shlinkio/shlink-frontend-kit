import type { FC } from 'react';
import { useCallback , useState } from 'react';
import type { Order } from '../../src';
import { Dropdown, LabelledInput, OrderingDropdown, RowDropdown } from '../../src';

const items = {
  foo: 'Foo',
  bar: 'Bar',
  baz: 'Baz',
};

export const DropdownPage: FC = () => {
  const [selected, setSelected] = useState<string>();
  const toggleSelected = useCallback((value: string) => setSelected((prev) => prev === value ? undefined : value), []);
  const [order, onChange] = useState<Order<keyof typeof items>>({});
  const [orderLink, onChangeLink] = useState<Order<keyof typeof items>>({});

  return (
    <div className="tw:flex tw:flex-col tw:gap-y-4">
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Dropdown</h2>
        <div>
          <Dropdown buttonContent={selected ?? <i>Click me</i>}>
            <Dropdown.Item selected={selected === 'Foo'} onClick={() => toggleSelected('Foo')}>Foo</Dropdown.Item>
            <Dropdown.Item selected={selected === 'Bar'} onClick={() => toggleSelected('Bar')}>Bar</Dropdown.Item>
            <Dropdown.Item selected={selected === 'Baz'} onClick={() => toggleSelected('Baz')}>Baz</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Title>More stuff</Dropdown.Title>
            <Dropdown.Misc>
              <div className="tw:flex tw:items-center tw:gap-3 tw:min-w-92">
                <div className="tw:w-1/2">
                  <LabelledInput label="Foo" />
                </div>
                <div className="tw:w-1/2">
                  <LabelledInput label="Bar" />
                </div>
              </div>
            </Dropdown.Misc>
          </Dropdown>
        </div>
      </div>

      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Menu at least as big as button</h2>
        <div>
          <Dropdown buttonContent="Select something from the menu">
            <Dropdown.Item>Foo</Dropdown.Item>
            <Dropdown.Item>Bar</Dropdown.Item>
            <Dropdown.Item>Baz</Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2 className="tw:text-right">Right-aligned Dropdown</h2>
        <div className="tw:flex tw:justify-end">
          <Dropdown buttonContent="Right menu" menuAlignment="right">
            <Dropdown.Item>Foo with a very long text</Dropdown.Item>
            <Dropdown.Item>Bar with a very long text</Dropdown.Item>
            <Dropdown.Item>Baz with a very long text</Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Toggle button sizes</h2>
        <div className="tw:flex tw:gap-3 tw:flex-wrap tw:items-center">
          <Dropdown buttonContent="Small" buttonSize="sm">
            <Dropdown.Item>Foo</Dropdown.Item>
            <Dropdown.Item>Bar</Dropdown.Item>
            <Dropdown.Item>Baz</Dropdown.Item>
          </Dropdown>
          <Dropdown buttonContent="Medium (default)" buttonSize="md">
            <Dropdown.Item>Foo</Dropdown.Item>
            <Dropdown.Item>Bar</Dropdown.Item>
            <Dropdown.Item>Baz</Dropdown.Item>
          </Dropdown>
          <Dropdown buttonContent="Large" buttonSize="lg">
            <Dropdown.Item>Foo</Dropdown.Item>
            <Dropdown.Item>Bar</Dropdown.Item>
            <Dropdown.Item>Baz</Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Variants</h2>
        <div className="tw:flex tw:gap-3 tw:flex-wrap tw:items-center">
          <Dropdown buttonContent="Caretless" caretless>
            <Dropdown.Item>Foo</Dropdown.Item>
            <Dropdown.Item>Bar</Dropdown.Item>
            <Dropdown.Item>Baz</Dropdown.Item>
          </Dropdown>
          <Dropdown buttonContent="Link" buttonVariant="link">
            <Dropdown.Item>Foo</Dropdown.Item>
            <Dropdown.Item>Bar</Dropdown.Item>
            <Dropdown.Item>Baz</Dropdown.Item>
          </Dropdown>
          <Dropdown buttonContent="Text" buttonVariant="text">
            <Dropdown.Item>Foo</Dropdown.Item>
            <Dropdown.Item>Bar</Dropdown.Item>
            <Dropdown.Item>Baz</Dropdown.Item>
          </Dropdown>
          <Dropdown buttonContent="Disabled" buttonDisabled>
            <Dropdown.Item>Foo</Dropdown.Item>
            <Dropdown.Item>Bar</Dropdown.Item>
            <Dropdown.Item>Baz</Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>RowDropdown</h2>
        <div className="tw:flex tw:gap-3 tw:flex-wrap tw:items-center">
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

      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>OrderingDropdown</h2>
        <div className="tw:flex tw:gap-3 tw:flex-wrap tw:items-center">
          <OrderingDropdown items={items} order={order} onChange={onChange} />
          <OrderingDropdown items={items} order={orderLink} onChange={onChangeLink} buttonVariant="link" />
        </div>
      </div>
    </div>
  );
};
