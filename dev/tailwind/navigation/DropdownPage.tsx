import type { FC } from 'react';
import { useCallback , useState } from 'react';
import { Dropdown, LabelledInput } from '../../../src/tailwind';

export const DropdownPage: FC = () => {
  const [selected, setSelected] = useState<string>();
  const toggleSelected = useCallback((value: string) => setSelected((prev) => prev === value ? undefined : value), []);

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
            <Dropdown.Item className="tw:whitespace-nowrap">Foo with a very long text</Dropdown.Item>
            <Dropdown.Item className="tw:whitespace-nowrap">Bar with a very long text</Dropdown.Item>
            <Dropdown.Item className="tw:whitespace-nowrap">Baz with a very long text</Dropdown.Item>
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
    </div>
  );
};
