import type { TableProps } from '../../src';
import { Table } from '../../src';
import { checkAccessibility } from '../__helpers__/accessibility';
import { render } from '../__helpers__/setUpTest';

describe('<Table />', () => {
  const setUp = (props: Omit<Partial<TableProps>, 'children'> = {}, headerCellsScope?: string) =>
    render(
      <Table
        header={
          <Table.Row>
            <Table.Cell scope={headerCellsScope}>Foo</Table.Cell>
            <Table.Cell scope={headerCellsScope}>Bar</Table.Cell>
            <Table.Cell scope={headerCellsScope}>Baz</Table.Cell>
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
  ])('renders as expected based on provided props', async (props) => {
    const { container } = await setUp(props);
    expect(container).toMatchSnapshot();
  });

  it.each([
    { providedScope: undefined, expectedScope: 'col' },
    { providedScope: 'col', expectedScope: 'col' },
    { providedScope: 'row', expectedScope: 'row' },
    { providedScope: 'rowgroup', expectedScope: 'rowgroup' },
    { providedScope: 'colgroup', expectedScope: 'colgroup' },
  ])('sets expected scope in header cells', async ({ providedScope, expectedScope }) => {
    const { container } = await setUp({}, providedScope);
    const headerCells = [...container.querySelectorAll('th')];

    expect(headerCells).toHaveLength(3);
    await Promise.all(headerCells.map((cell) => expect.element(cell).toHaveAttribute('scope', expectedScope)));
  });
});
