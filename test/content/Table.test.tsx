import { render } from '@testing-library/react';
import type { TableProps } from '../../src';
import { Table } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';

describe('<Table />', () => {
  const setUp = (props: Omit<Partial<TableProps>, 'children'> = {}) => render(
    <Table
      header={
        <Table.Row>
          <Table.Cell>Foo</Table.Cell>
          <Table.Cell>Bar</Table.Cell>
          <Table.Cell>Baz</Table.Cell>
        </Table.Row>
      }
      {...props}
    >
      <Table.Row>
        <Table.Cell columnName="Foo">Foo</Table.Cell>
        <Table.Cell columnName="Bar">Bar</Table.Cell>
        <Table.Cell columnName="Baz">Baz</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell columnName="Foo">Foo</Table.Cell>
        <Table.Cell columnName="Bar">Bar</Table.Cell>
        <Table.Cell columnName="Baz">Baz</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Foo</Table.Cell>
        <Table.Cell>Bar</Table.Cell>
        <Table.Cell>Baz</Table.Cell>
      </Table.Row>
    </Table>,
  );

  it('passes a11y checks', () => checkAccessibility(setUp()));

  it.each([
    { responsive: false },
    {
      footer: (
        <Table.Row>
          <Table.Cell type="td">Foo footer</Table.Cell>
          <Table.Cell type="td">Bar footer</Table.Cell>
          <Table.Cell type="td">Baz footer</Table.Cell>
        </Table.Row>
      ),
    },
    { size: 'sm' as const },
    { size: 'lg' as const },
  ])('renders as expected based on provided props', (props) => {
    const { container } = setUp(props);
    expect(container).toMatchSnapshot();
  });
});
