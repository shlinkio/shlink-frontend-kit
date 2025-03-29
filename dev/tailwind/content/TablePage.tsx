import type { FC } from 'react';
import { useMemo , useState } from 'react';
import { SearchInput, SimpleCard, Table } from '../../../src/tailwind';

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

export const TablePage: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>();
  const filteredUsers = useMemo(
    () => users.filter(
      ({ name, surname, role }) => !searchTerm || `${name} ${surname} ${role}`.match(new RegExp(searchTerm, 'i')),
    ),
    [searchTerm],
  );

  return (
    <div className="tw:flex tw:flex-col tw:gap-y-4">
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Responsive table</h2>
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
      </div>
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Non-responsive table inside Card</h2>
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
                  <Table.Cell colSpan={3} className="tw:[&]:p-0">
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
      </div>
      <div className="tw:flex tw:flex-col tw:gap-y-2">
        <h2>Table with footer</h2>
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
              <Table.Cell colSpan={3} className="tw:text-center" type="td">- Students -</Table.Cell>
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
      </div>
    </div>
  );
};
