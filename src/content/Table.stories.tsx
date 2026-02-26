import type { Meta } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { SearchInput } from '../form';
import { SimpleCard } from '../surfaces';
import { Table } from './Table';

export default {
  component: Table,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

const users = [
  {
    id: '1',
    name: 'John',
    surname: 'Doe',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Jane',
    surname: 'Smith',
    role: 'user',
  },
  {
    id: '3',
    name: 'Alice',
    surname: 'Johnson',
    role: 'moderator',
  },
  {
    id: '4',
    name: 'Bob',
    surname: 'Brown',
    role: 'user',
  },
  {
    id: '5',
    name: 'Charlie',
    surname: 'Davis',
    role: 'admin',
  },
  {
    id: '6',
    name: 'Diana',
    surname: 'Miller',
    role: 'user',
  },
  {
    id: '7',
    name: 'Eve',
    surname: 'Wilson',
    role: 'moderator',
  },
  {
    id: '8',
    name: 'Frank',
    surname: 'Moore',
    role: 'user',
  },
  {
    id: '9',
    name: 'Grace',
    surname: 'Taylor',
    role: 'admin',
  },
  {
    id: '10',
    name: 'Hank',
    surname: 'Anderson',
    role: 'user',
  },
];

export const ResponsiveTable = () => (
  <Table
    header={
      <Table.Row>
        <Table.Cell>Name</Table.Cell>
        <Table.Cell>Surname</Table.Cell>
        <Table.Cell>Role</Table.Cell>
      </Table.Row>
    }
  >
    {users.map((u) => (
      <Table.Row key={u.id}>
        <Table.Cell columnName="Name:">{u.name}</Table.Cell>
        <Table.Cell columnName="Surname:">{u.surname}</Table.Cell>
        <Table.Cell columnName="Role:">{u.role}</Table.Cell>
      </Table.Row>
    ))}
  </Table>
);

export const NonResponsiveTableInCard = () => {
  const [searchTerm, setSearchTerm] = useState<string>();
  const filteredUsers = useMemo(
    () => users.filter(
      ({ name, surname, role }) => !searchTerm || `${name} ${surname} ${role}`.match(new RegExp(searchTerm, 'i')),
    ),
    [searchTerm],
  );

  return (
    <SimpleCard>
      <Table
        responsive={false}
        header={
          <>
            <Table.Row>
              <Table.Cell>Name</Table.Cell>
              <Table.Cell>Surname</Table.Cell>
              <Table.Cell>Role</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell colSpan={3} className="[&]:p-0">
                <SearchInput onChange={setSearchTerm} borderless size="md" />
              </Table.Cell>
            </Table.Row>
          </>
        }
      >
        {filteredUsers.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={3}>
              No users matching search
            </Table.Cell>
          </Table.Row>
        )}
        {filteredUsers.map((u) => (
          <Table.Row key={u.id}>
            <Table.Cell>{u.name}</Table.Cell>
            <Table.Cell>{u.surname}</Table.Cell>
            <Table.Cell>{u.role}</Table.Cell>
          </Table.Row>
        ))}
      </Table>
    </SimpleCard>
  );
};

export const TableWithFooter = () => (
  <Table
    header={
      <Table.Row>
        <Table.Cell>Name</Table.Cell>
        <Table.Cell>Surname</Table.Cell>
        <Table.Cell>Role</Table.Cell>
      </Table.Row>
    }
    footer={
      <Table.Row>
        <Table.Cell colSpan={3} className="text-center" type="td">- Students -</Table.Cell>
      </Table.Row>
    }
  >
    {users.map((u) => (
      <Table.Row key={u.id}>
        <Table.Cell columnName="Name:">{u.name}</Table.Cell>
        <Table.Cell columnName="Surname:">{u.surname}</Table.Cell>
        <Table.Cell columnName="Role:">{u.role}</Table.Cell>
      </Table.Row>
    ))}
  </Table>
);

export const SmallTable = () => (
  <Table
    size="sm"
    header={
      <Table.Row>
        <Table.Cell>Small</Table.Cell>
        <Table.Cell>Small</Table.Cell>
        <Table.Cell>Small</Table.Cell>
      </Table.Row>
    }
  >
    {users.slice(0, 2).map((u) => (
      <Table.Row key={u.id}>
        <Table.Cell columnName="Name:">{u.name}</Table.Cell>
        <Table.Cell columnName="Surname:">{u.surname}</Table.Cell>
        <Table.Cell columnName="Role:">{u.role}</Table.Cell>
      </Table.Row>
    ))}
  </Table>
);

export const LargeTable = () => (
  <Table
    size="lg"
    header={
      <Table.Row>
        <Table.Cell>Large</Table.Cell>
        <Table.Cell>Large</Table.Cell>
        <Table.Cell>Large</Table.Cell>
      </Table.Row>
    }
  >
    {users.slice(0, 2).map((u) => (
      <Table.Row key={u.id}>
        <Table.Cell columnName="Name:">{u.name}</Table.Cell>
        <Table.Cell columnName="Surname:">{u.surname}</Table.Cell>
        <Table.Cell columnName="Role:">{u.role}</Table.Cell>
      </Table.Row>
    ))}
  </Table>
);
