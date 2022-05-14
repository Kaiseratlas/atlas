import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import IdeasQuery from '../../../../graphql/queries/ideas/ideas-query.graphql';
import React from 'react';
import { Column, useTable } from 'react-table';

const Ideas: NextPage<any> = () => {
  const { data } = useQuery(IdeasQuery, {
    context: {
      headers: {
        'X-Product-Name': 'kaiserreich',
        'X-Product-Version': '0.20.1',
      },
    },
  });

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
        Header: 'Cost',
        accessor: 'node.cost',
      },
    ],
    [],
  );
  const tableInstance = useTable({
    columns,
    data: data?.ideas.edges ?? [],
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
      <h1 className="bp4-heading">Ideas</h1>
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
