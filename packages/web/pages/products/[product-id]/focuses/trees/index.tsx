import React from 'react';
import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import FocusTreesQuery from '../../../../../graphql/queries/focuses/trees/focus-trees-query.graphql';
import { Column, useTable } from 'react-table';

const FocusTrees: NextPage<any> = () => {
  const { data } = useQuery(FocusTreesQuery, {
    context: {
      headers: {
        'X-Product-Name': 'kaiserreich',
        'X-Product-Version': '0.20.1',
      },
    },
  });

  console.log('data', data);

  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: 'ID',
        id: 'id',
        accessor: 'node.id',
      },
      {
        Header: 'Name',
        id: 'name',
        accessor: 'node.name',
      },
    ],
    [],
  );
  const tableInstance = useTable({
    columns,
    data: data?.focusTrees.edges ?? [],
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
      <h1 className="bp4-heading">Focus Trees</h1>
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

export default FocusTrees;
