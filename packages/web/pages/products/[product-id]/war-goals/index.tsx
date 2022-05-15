import { NextPage } from 'next';
import WarGoalsQuery from '../../../../graphql/queries/war-goals/war-goals-query.graphql';
import React from 'react';
import { Column, useTable } from 'react-table';
import useAppQuery from '../../../../use-app-query';

const Ideas: NextPage<any> = () => {
  const { data } = useAppQuery(WarGoalsQuery);

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
        Header: 'Generate Base Cost',
        accessor: 'node.generateBaseCost',
      },
      {
        Header: 'Generate Per State Cost',
        accessor: 'node.generatePerStateCost',
      },
      {
        Header: 'Take States Cost',
        accessor: 'node.takeStatesCost',
      },
      {
        Header: 'Take States Limit',
        accessor: 'node.takeStatesLimit',
      },
      {
        Header: 'Threat',
        accessor: 'node.threat',
      },
      {
        Header: 'Expire',
        accessor: 'node.expire',
      },
    ],
    [],
  );
  const tableInstance = useTable({
    columns,
    data: data?.warGoals.edges ?? [],
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
      <h1 className="bp4-heading">War Goals</h1>
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
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Ideas;
