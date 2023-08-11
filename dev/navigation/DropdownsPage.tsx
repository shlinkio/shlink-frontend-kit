import type { FC } from 'react';
import { DropdownItem } from 'reactstrap';
import { DropdownBtn, RowDropdownBtn } from '../../src';

export const DropdownsPage: FC = () => (
  <>
    <DropdownBtn text="Simple dropdown with custom text">
      <DropdownItem>Foo</DropdownItem>
      <DropdownItem>Bar</DropdownItem>
      <DropdownItem divider />
      <DropdownItem>Baz</DropdownItem>
    </DropdownBtn>
    <RowDropdownBtn>
      <DropdownItem>Foo</DropdownItem>
      <DropdownItem>Bar</DropdownItem>
      <DropdownItem divider />
      <DropdownItem>Baz</DropdownItem>
    </RowDropdownBtn>
  </>
);
