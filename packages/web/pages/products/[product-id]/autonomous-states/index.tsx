import { NextPage } from 'next';
import React from 'react';
import AutonomousStatesQuery from '../../../../graphql/queries/autonomous-states/autonomous-states-query.graphql';
import useAppQuery from '../../../../use-app-query';
import { Column, useTable } from 'react-table';
import { Checkbox } from '@blueprintjs/core';

const AutonomousStates: NextPage<any> = () => {
  const { data, error } = useAppQuery(AutonomousStatesQuery);
  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'node.id',
      },
      {
        Header: 'Name',
        accessor: 'node.name',
      },
      {
        Header: 'Is Default?',
        accessor: 'node.isDefault',
        Cell: ({ value }) => (
          <span style={{ textAlign: 'center' }}>
            <Checkbox checked={value} readOnly style={{ margin: 0 }} />
          </span>
        ),
      },
      {
        Header: 'Is Puppet?',
        accessor: 'node.isPuppet',
        Cell: ({ value }) => (
          <span style={{ textAlign: 'center' }}>
            <Checkbox checked={value} readOnly style={{ margin: 0 }} />
          </span>
        ),
      },
      {
        Header: 'Manpower Influence',
        accessor: 'node.manpowerInfluence',
      },
      {
        Header: 'Min Freedom Level',
        accessor: 'node.minFreedomLevel',
      },
      {
        Header: 'Peace Conference Initial Freedom',
        accessor: 'node.peaceConferenceInitialFreedom',
      },
      {
        Header: 'Use Overlord Color',
        accessor: 'node.useOverlordColor',
        Cell: ({ value }) => (
          <span style={{ textAlign: 'center' }}>
            <Checkbox checked={value} readOnly style={{ margin: 0 }} />
          </span>
        ),
      },
    ],
    [],
  );
  const tableInstance = useTable({
    columns,
    data: data?.autonomousStates.edges ?? [],
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  console.log('data', data, error);
  return (
    <>
      <h1 className="bp4-heading">Autonomous States</h1>
      <table
        className="bp4-html-table bp4-html-table-bordered bp4-html-table-striped bp4-interactive"
        {...getTableProps()}
        style={{ width: '100%' }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                // onClick={(event) =>
                //   router.push(`/continents/${row.values['node.id']}`)
                // }
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default AutonomousStates;
