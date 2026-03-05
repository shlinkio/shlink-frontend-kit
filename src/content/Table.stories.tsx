import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { nonEditableReactNode } from '../../.storybook/utils/storybook';
import { SearchInput } from '../form';
import { SimpleCard } from '../surfaces';
import { Table } from './Table';

const meta = {
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    children: nonEditableReactNode,
    header: nonEditableReactNode,
    footer: nonEditableReactNode,
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

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

export const Responsive: Story = {
  args: {
    header: (
      <Table.Row>
        <Table.Cell>Name</Table.Cell>
        <Table.Cell>Surname</Table.Cell>
        <Table.Cell>Role</Table.Cell>
      </Table.Row>
    ),
    children: users.map((u) => (
      <Table.Row key={u.id}>
        <Table.Cell columnName="Name:">{u.name}</Table.Cell>
        <Table.Cell columnName="Surname:">{u.surname}</Table.Cell>
        <Table.Cell columnName="Role:">{u.role}</Table.Cell>
      </Table.Row>
    )),
  },
};

export const NonResponsiveInCard: Story = {
  args: {
    responsive: false,
    header: [],
  },
  render: (args) => {
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
          {...args}
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
  },
};

export const WithFooter: Story = {
  args: {
    header: (
      <Table.Row>
        <Table.Cell>Name</Table.Cell>
        <Table.Cell>Surname</Table.Cell>
        <Table.Cell>Role</Table.Cell>
      </Table.Row>
    ),
    footer: (
      <Table.Row>
        <Table.Cell colSpan={3} className="text-center" type="td">- Students -</Table.Cell>
      </Table.Row>
    ),
    children: users.slice(0, 2).map((u) => (
      <Table.Row key={u.id}>
        <Table.Cell columnName="Name:">{u.name}</Table.Cell>
        <Table.Cell columnName="Surname:">{u.surname}</Table.Cell>
        <Table.Cell columnName="Role:">{u.role}</Table.Cell>
      </Table.Row>
    )),
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    header: (
      <Table.Row>
        <Table.Cell>Small</Table.Cell>
        <Table.Cell>Small</Table.Cell>
        <Table.Cell>Small</Table.Cell>
      </Table.Row>
    ),
    children: users.slice(0, 2).map((u) => (
      <Table.Row key={u.id}>
        <Table.Cell columnName="Name:">{u.name}</Table.Cell>
        <Table.Cell columnName="Surname:">{u.surname}</Table.Cell>
        <Table.Cell columnName="Role:">{u.role}</Table.Cell>
      </Table.Row>
    )),
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    header: (
      <Table.Row>
        <Table.Cell>Large</Table.Cell>
        <Table.Cell>Large</Table.Cell>
        <Table.Cell>Large</Table.Cell>
      </Table.Row>
    ),
    children: users.slice(0, 2).map((u) => (
      <Table.Row key={u.id}>
        <Table.Cell columnName="Name:">{u.name}</Table.Cell>
        <Table.Cell columnName="Surname:">{u.surname}</Table.Cell>
        <Table.Cell columnName="Role:">{u.role}</Table.Cell>
      </Table.Row>
    )),
  },
};
